/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('stratic:app', function () {
	before(function (done) {
		helpers.run(path.join(__dirname, '../app'))
			.inDir(path.join(os.tmpdir(), './temp-test'))
			.withOptions({ 'skip-install': true })
			.withPrompt({
				projectName: 'Test project'
			})
			.on('end', done);
	});

	it('creates files', function () {
		assert.file([
			'package.json',
			'.editorconfig',
			'package.json',
			'gulpfile.js',
			'.gitignore',
			'src/index.jade',
			'src/blog/post.jade',
			'src/blog/index.jade',
			'src/blog/hello-world.md',
			'src/includes/layout.jade',
			'src/includes/post.jade',
			'src/scripts/main.js',
			'src/styles/main.styl',
			'.jshintrc'
		]);
	});
});
