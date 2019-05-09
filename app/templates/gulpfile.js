'use strict';

var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    pug = require('gulp-pug'),
    stylus = require('gulp-stylus'),
    rename = require('gulp-rename'),
    remark = require('gulp-remark'),
    frontMatter = require('gulp-gray-matter'),
    remarkHtml = require('remark-html'),
    attachToTemplate = require('gulp-attach-to-template'),
    filterDrafts = require('stratic-filter-drafts'),
    dateInPath = require('stratic-date-in-path'),
    decorateFiles = require('stratic-decorate-files'),
    postsToIndex = require('stratic-posts-to-index'),
    paginateIndexes = require('stratic-paginate-indexes'),
    truncateIndexes = require('stratic-truncate-indexes'),
    indexesToRss = require('stratic-indexes-to-rss'),
    addsrc = require('gulp-add-src'),
    ecstatic = require('ecstatic'),
    log = require('fancy-log'),
    ghpages = require('gh-pages'),
    path = require('path'),
    http = require('http'),
    through2 = require('through2'),
    isDist = process.argv.indexOf('serve') === -1;

var buildHtml = exports['build:html'] = function buildHtml() {
	return gulp.src('src/*.pug')
	           .pipe(isDist ? through2.obj() : plumber())
	           .pipe(pug({ pretty: true, basedir: __dirname }))
	           .pipe(rename({ extname: '.html' }))
	           .pipe(gulp.dest('dist'));
};

var buildPosts = exports['build:blog:posts'] = function buildPosts() {
	return gulp.src('src/blog/*.md')
	           .pipe(isDist ? through2.obj() : plumber())
	           .pipe(frontMatter())
	           .pipe(filterDrafts())
	           .pipe(decorateFiles())
	           .pipe(remark({quiet: true}).use(remarkHtml))
	           .pipe(dateInPath())
	           .pipe(addsrc('src/blog/post.pug'))
	           .pipe(attachToTemplate('post.pug'))
	           .pipe(pug({ pretty: true, basedir: __dirname }))
	           .pipe(rename({ extname: '.html' }))
	           .pipe(gulp.dest('dist/blog'));
};

var buildIndexes = exports['build:blog:index'] = function buildIndexes() {
	return gulp.src('src/blog/*.md')
	           .pipe(isDist ? through2.obj() : plumber())
	           .pipe(frontMatter())
	           .pipe(filterDrafts())
	           .pipe(decorateFiles())
	           .pipe(remark({quiet: true}).use(remarkHtml))
	           .pipe(dateInPath())
	           .pipe(addsrc('src/blog/index.pug'))
	           .pipe(postsToIndex('index.pug'))
	           .pipe(paginateIndexes())
	           .pipe(pug({ pretty: true, basedir: __dirname }))
	           .pipe(rename({ extname: '.html' }))
	           .pipe(gulp.dest('dist/blog'));
};

var buildRss = exports['build:blog:rss'] = function buildRss() {
	return gulp.src('src/blog/*.md')
	           .pipe(frontMatter())
	           .pipe(filterDrafts())
	           .pipe(remark({quiet: true}).use(remarkHtml))
	           .pipe(dateInPath())
	           .pipe(addsrc('src/blog/index.pug'))
	           .pipe(postsToIndex('index.pug'))
	           .pipe(truncateIndexes())
	           .pipe(indexesToRss({
		           title: 'My personal blog'
	           }, '<%= projectUrl %>'))
	           .pipe(rename({ extname: '.rss' }))
	           .pipe(gulp.dest('dist/blog'));
};

var buildCss = exports['build:css'] = function buildCss() {
	return gulp.src('src/styles/*.styl')
	           .pipe(isDist ? through2.obj() : plumber())
	           .pipe(stylus())
	           .pipe(rename({ extname: '.css' }))
	           .pipe(gulp.dest('dist/css'));
};

var buildJs = exports['build:js'] = function buildJs() {
	return gulp.src('src/scripts/*.js')
	           .pipe(gulp.dest('dist/js'));

};

var buildImages = exports['build:images'] = function buildImages() {
	return gulp.src('src/img/*')
	           .pipe(gulp.dest('dist/img'));

};

var buildBlog = exports['build:blog'] = gulp.parallel(buildPosts, buildIndexes, buildRss);
var build = exports.build = gulp.parallel(buildHtml, buildCss, buildJs, buildBlog);

exports.deploy = gulp.series(build, function deploy(done) {
	ghpages.publish(path.join(__dirname, 'dist'), { logger: log, branch: 'master' }, done);
});

var watch = exports.watch = gulp.parallel(build, function watch() {
	gulp.watch(['src/*.pug', 'src/includes/*.pug'], buildHtml, buildPosts, buildIndexes);
	gulp.watch('src/styles/*.styl', buildCss);
	gulp.watch('src/scripts/*.js', buildJs);
	gulp.watch('src/blog/*.md', buildBlog);
	gulp.watch('src/blog/*.pug', buildPosts, buildIndexes);
});

exports.serve = gulp.parallel(watch, function listen() {
	http.createServer(
		ecstatic({ root: __dirname + '/dist' })
	).listen(process.env.PORT || 8080);
});

