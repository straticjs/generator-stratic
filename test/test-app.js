/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var os = require('os');
var spawn = require('smart-spawn');

// Tests failing on your local machine? Try increasing this timeout.
var installTimeout = 40 * 1000;

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
	var tmpdir = path.join(os.tmpdir(), './temp-test');

	beforeEach(function () {
		return helpers.run(path.join(__dirname, '../app'))
		              .inDir(tmpdir)
		              .withOptions({ 'skip-install': true })
		              .withPrompts({
		              	projectName: 'Test project'
		              });
	});

	it('creates source files', function () {
		assert.file(files);
	});

	it('templates source files properly', function () {
		assert.noFileContent(files.map(function (filename) {
			return [filename, '<%'];
		}));
	});

	it('can run `gulp build`', function (done) {
		// TODO: only do this when requested
		this.timeout(installTimeout);
		spawn('npm', ['install'], tmpdir, function (err) {
			if (err) return done(err);

			return spawn('gulp', ['build'], tmpdir, done);
		});
	});
});
