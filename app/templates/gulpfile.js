'use strict';

var gulp = require('gulp');
var jade = require('gulp-jade');
var rename = require('gulp-rename');
var parse = require('stratic-parse-header');
var markdown = require('gulp-markdown');
var straticToJson = require('stratic-post-to-json-data');
var jadeTemplate = require('gulp-jade-template');

gulp.task('build', ['build:html', 'build:css', 'build:js'], function() {

});

gulp.task('build:html', function() {
	return gulp.src('src/*.jade')
	           .pipe(jade({ pretty: true }))
	           .pipe(rename({ extname: '.html' }))
	           .pipe(gulp.dest('dist'));
});

gulp.task('build:blog:posts', function() {
	return gulp.src('src/blog/*.md')
	           .pipe(parse())
	           .pipe(markdown())
	           .pipe(straticToJson())
	           .pipe(jadeTemplate('src/blog/post.jade'))
	           .pipe(rename({ extname: '.html' }))
	           .pipe(gulp.dest('dist/blog'));
});

gulp.task('build:blog:index', function() {
	// TODO
});

gulp.task('build:css', [''], function() {
	gulp.src('src/styles/*')
	    .pipe(gulp.dest('dist/css'));
});

gulp.task('build:js', [''], function() {
	return gulp.src('js/*')
	           .pipe(gulp.dest('dist/js'));

});

gulp.task('lint', ['lint:html', 'lint:css', 'lint:js'], function() {
	// TODO
});

gulp.task('lint:html', [''], function() {
	// TODO
});

gulp.task('lint:css', [''], function() {
	// TODO
});

gulp.task('lint:js', [''], function() {
	// TODO
});

gulp.task('watch', ['build'], function() {
	gulp.watch('src/index.jade', ['build:html']);
	gulp.watch('src/styles/*.styl', ['build:css']);
	gulp.watch('src/scripts/*.js', ['build:js']);
});
