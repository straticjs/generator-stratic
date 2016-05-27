'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var StraticGenerator = yeoman.generators.Base.extend({
	initializing: function () {
		this.pkg = require('../package.json');
	},

	prompting: function () {
		var done = this.async();

		// Have Yeoman greet the user.
		this.log(yosay(
			'Hi, I\'m the Stratic generator, and I\'ll be your server today.'
		));

		var prompts = [{
			   type: 'input',
			   name: 'projectName',
			message: 'What\'s the name of your project?',
			default: 'Stratic project'
		},
		{
			   type: 'list',
			   name: 'projectType',
			message: 'Is your project a website or a blog?',
			choices: ['It\'s a blog!', 'It\'s a website!']
		}];

		this.prompt(prompts, function (props) {
			this.someOption = props.someOption;

			done();
		}.bind(this));
	},

	writing: {
		app: function () {
			this.dest.mkdir('src');
			this.dest.mkdir('src/styles');
			this.dest.mkdir('src/scripts');

			this.src.copy('gulpfile.js', 'gulpfile.js');
			this.src.copy('src/index.jade', 'src/index.jade');
			this.src.copy('src/blog/post.jade', 'src/blog/post.jade');

			this.src.copy('_package.json', 'package.json');
			this.src.copy('_bower.json', 'bower.json');
		},

		projectfiles: function () {
			this.src.copy('editorconfig', '.editorconfig');
			this.src.copy('jshintrc', '.jshintrc');
		}
	},

	end: function () {
		this.installDependencies();
	}
});

module.exports = StraticGenerator;
