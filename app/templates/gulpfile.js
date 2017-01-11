'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jade = require('gulp-jade'),
    stylus = require('gulp-stylus'),
    rename = require('gulp-rename'),
    parse = require('stratic-parse-header'),
    remark = require('gulp-remark'),
    remarkHtml = require('remark-html'),
    attachToTemplate = require('gulp-attach-to-template'),
    dateInPath = require('stratic-date-in-path'),
    postsToIndex = require('stratic-posts-to-index'),
    paginateIndexes = require('stratic-paginate-indexes'),
    indexesToRss = require('stratic-indexes-to-rss'),
    addsrc = require('gulp-add-src'),
    ghpages = require('gh-pages'),
    path = require('path');

gulp.task('build', ['build:html', 'build:css', 'build:js', 'build:blog']);
gulp.task('build:blog', ['build:blog:posts', 'build:blog:index', 'build:blog:rss']);

gulp.task('build:html', function() {
	return gulp.src('src/*.jade')
	           .pipe(jade({ pretty: true, basedir: __dirname }))
	           .pipe(rename({ extname: '.html' }))
	           .pipe(gulp.dest('dist'));
});

gulp.task('build:blog:posts', function() {
	return gulp.src('src/blog/*.md')
	           .pipe(parse())
	           .pipe(remark().use(remarkHtml))
	           .pipe(dateInPath())
	           .pipe(addsrc('src/blog/post.jade'))
	           .pipe(attachToTemplate('post.jade'))
	           .pipe(jade({ pretty: true, basedir: __dirname }))
	           .pipe(rename({ extname: '.html' }))
	           .pipe(gulp.dest('dist/blog'));
});

gulp.task('build:blog:index', function() {
	return gulp.src('src/blog/*.md')
	           .pipe(parse())
	           .pipe(remark().use(remarkHtml))
	           .pipe(dateInPath())
	           .pipe(addsrc('src/blog/index.jade'))
	           .pipe(postsToIndex('index.jade'))
	           .pipe(paginateIndexes())
	           .pipe(jade({ pretty: true, basedir: __dirname }))
	           .pipe(rename({ extname: '.html' }))
	           .pipe(gulp.dest('dist/blog'));
});

gulp.task('build:blog:rss', function() {
	return gulp.src('src/blog/*.md')
	           .pipe(parse())
	           .pipe(remark().use(remarkHtml))
	           .pipe(dateInPath())
	           .pipe(addsrc('src/blog/index.jade'))
	           .pipe(postsToIndex('index.jade'))
	           .pipe(indexesToRss({
		           title: 'Blag!',
		           copyright: '© Copyright 2017 Alice P. Hacker. All rights reserved.'
	           }, 'https://example.net/blog/'))
	           .pipe(rename({ extname: '.rss' }))
	           .pipe(gulp.dest('dist/blog'));
});

gulp.task('build:css', [''], function() {
	return gulp.src('src/styles/*.styl')
	           .pipe(stylus())
	           .pipe(rename({ extname: '.css' }))
	           .pipe(gulp.dest('dist/css'));
});

gulp.task('build:js', [''], function() {
	return gulp.src('js/*')
	           .pipe(gulp.dest('dist/js'));

});

gulp.task('lint', ['lint:html', 'lint:css', 'lint:js']);

gulp.task('lint:html', [''], function() {
	// TODO
});

gulp.task('lint:css', [''], function() {
	// TODO
});

gulp.task('lint:js', [''], function() {
	// TODO
});

gulp.task('deploy', ['build'], function(done) {
	ghpages.publish(path.join(__dirname, 'dist'), { logger: gutil.log, branch: 'master' }, done);
});

gulp.task('watch', ['build'], function() {
	gulp.watch('src/*.jade', ['build:html']);
	gulp.watch('src/styles/*.styl', ['build:css']);
	gulp.watch('src/scripts/*.js', ['build:js']);
	gulp.watch('src/blog/*.md', ['build:blog']);
	gulp.watch('src/blog/*.jade', ['build:blog:posts', 'build:blog:index']);
});
