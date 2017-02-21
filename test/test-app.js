/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var os = require('os');

var files = ['package.json',
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
             '.jshintrc'];

describe('stratic:app', function () {
	beforeEach(function () {
		return helpers.run(path.join(__dirname, '../app'))
		              .inDir(path.join(os.tmpdir(), './temp-test'))
		              .withOptions({ 'skip-install': true })
		              .withPrompts({
		              	projectName: 'Test project'
		              });
	});

	it('creates files', function () {
		assert.file(files);
	});

	it('templates files properly', function () {
		assert.noFileContent(files.map(function (filename) {
			return [filename, '<%'];
		}));
	});
});
