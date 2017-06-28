'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
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
    postsToIndex = require('stratic-posts-to-index'),
    paginateIndexes = require('stratic-paginate-indexes'),
    indexesToRss = require('stratic-indexes-to-rss'),
    addsrc = require('gulp-add-src'),
    ecstatic = require('ecstatic'),
    ghpages = require('gh-pages'),
    path = require('path'),
    http = require('http'),
    through2 = require('through2'),
    isDist = process.argv.indexOf('serve') === -1;

gulp.task('build', ['build:html', 'build:css', 'build:js', 'build:blog']);
gulp.task('build:blog', ['build:blog:posts', 'build:blog:index', 'build:blog:rss']);

gulp.task('build:html', function() {
	return gulp.src('src/*.pug')
	           .pipe(isDist ? through2.obj() : plumber())
	           .pipe(pug({ pretty: true, basedir: __dirname }))
	           .pipe(rename({ extname: '.html' }))
	           .pipe(gulp.dest('dist'));
});

gulp.task('build:blog:posts', function() {
	return gulp.src('src/blog/*.md')
	           .pipe(isDist ? through2.obj() : plumber())
	           .pipe(frontMatter())
	           .pipe(filterDrafts())
	           .pipe(remark({quiet: true}).use(remarkHtml))
	           .pipe(dateInPath())
	           .pipe(addsrc('src/blog/post.pug'))
	           .pipe(attachToTemplate('post.pug'))
	           .pipe(pug({ pretty: true, basedir: __dirname }))
	           .pipe(rename({ extname: '.html' }))
	           .pipe(gulp.dest('dist/blog'));
});

gulp.task('build:blog:index', function() {
	return gulp.src('src/blog/*.md')
	           .pipe(isDist ? through2.obj() : plumber())
	           .pipe(frontMatter())
	           .pipe(filterDrafts())
	           .pipe(remark({quiet: true}).use(remarkHtml))
	           .pipe(dateInPath())
	           .pipe(addsrc('src/blog/index.pug'))
	           .pipe(postsToIndex('index.pug'))
	           .pipe(paginateIndexes())
	           .pipe(pug({ pretty: true, basedir: __dirname }))
	           .pipe(rename({ extname: '.html' }))
	           .pipe(gulp.dest('dist/blog'));
});

gulp.task('build:blog:rss', function() {
	return gulp.src('src/blog/*.md')
	           .pipe(frontMatter())
	           .pipe(filterDrafts())
	           .pipe(remark({quiet: true}).use(remarkHtml))
	           .pipe(dateInPath())
	           .pipe(addsrc('src/blog/index.pug'))
	           .pipe(postsToIndex('index.pug'))
	           .pipe(indexesToRss({
		           title: 'My personal blog'
	           }, '<%= projectUrl %>'))
	           .pipe(rename({ extname: '.rss' }))
	           .pipe(gulp.dest('dist/blog'));
});

gulp.task('build:css', function() {
	return gulp.src('src/styles/*.styl')
	           .pipe(isDist ? through2.obj() : plumber())
	           .pipe(stylus())
	           .pipe(rename({ extname: '.css' }))
	           .pipe(gulp.dest('dist/css'));
});

gulp.task('build:js', function() {
	return gulp.src('src/scripts/*.js')
	           .pipe(gulp.dest('dist/js'));

});

gulp.task('build:images', function() {
	return gulp.src('src/img/*')
	           .pipe(gulp.dest('dist/img'));

});

gulp.task('deploy', ['build'], function(done) {
	ghpages.publish(path.join(__dirname, 'dist'), { logger: gutil.log, branch: 'master' }, done);
});

gulp.task('serve', ['watch'], function() {
	http.createServer(
		ecstatic({ root: __dirname + '/dist' })
	).listen(process.env.PORT || 8080);
});

gulp.task('watch', ['build'], function() {
	gulp.watch(['src/*.pug', 'src/includes/*.pug'], ['build:html', 'build:blog:posts', 'build:blog:index']);
	gulp.watch('src/styles/*.styl', ['build:css']);
	gulp.watch('src/scripts/*.js', ['build:js']);
	gulp.watch('src/blog/*.md', ['build:blog']);
	gulp.watch('src/blog/*.pug', ['build:blog:posts', 'build:blog:index']);
});
