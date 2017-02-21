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
			'Hi, I\'m the Stratic generator, and I\'ll be your server today.\nWould you like a nice blog with a side of awesome?'
		));

		var prompts = [{
			   type: 'input',
			   name: 'projectName',
			message: 'What\'s the name of your project?',
			default: 'Stratic project'
		}
		/*
		{
			   type: 'list',
			   name: 'questionPreference',
			message: 'How many questions do you want to be asked?',
			choices: ['Gimme a blog, like, NOW.', 'I have time for a couple important ones.', 'Show ALL the advanced options!']
		}
		*/
		];

		this.prompt(prompts, function (props) {
			this.projectName = props.projectName;
			// TODO: this is a hack because questions aren't written yet; remove later
			props.questionPreference = 'Gimme a blog, like, NOW.';
			switch(props.questionPreference) {
			case 'Gimme a blog, like, NOW.':
				this.questionPreference = 'none';
				break;
			case 'I have time for a couple important ones.':
				this.questionPreference = 'some';
				break;
			case 'Show ALL the advanced options!':
				this.questionPreference = 'all';
				break;
			default:
				throw new Error('unexpected results from Inquirer');
			};

			done();
		}.bind(this));
	},

	writing: {
		gulpfile: function () {
			this.fs.copyTpl(
				this.templatePath('gulpfile.js'),
				this.destinationPath('gulpfile.js'),
				{
				}
			);
		},

		mainHTML: function () {
			this.fs.copyTpl(
				this.templatePath('src/index.jade'),
				this.destinationPath('src/index.jade'),
				{
					projectName: this.projectName
				}
			);
			this.fs.copy(
				this.templatePath('src/includes/layout.jade'),
				this.destinationPath('src/includes/layout.jade')
			);
		},

		styles: function () {
			this.fs.copy(
				this.templatePath('src/styles/main.styl'),
				this.destinationPath('src/styles/main.styl')
			);
		},

		scripts: function () {
			this.fs.copy(
				this.templatePath('src/scripts/main.js'),
				this.destinationPath('src/scripts/main.js')
			);
		},

		blogTemplates: function () {
			this.fs.copy(
				this.templatePath('src/includes/post.jade'),
				this.destinationPath('src/includes/post.jade')
			);
			this.fs.copyTpl(
				this.templatePath('src/blog/hello-world.md'),
				this.destinationPath('src/blog/hello-world.md')
			);
			this.fs.copyTpl(
				this.templatePath('src/blog/index.jade'),
				this.destinationPath('src/blog/index.jade'),
				{
					projectName: this.projectName
				}
			);
			this.fs.copyTpl(
				this.templatePath('src/blog/post.jade'),
				this.destinationPath('src/blog/post.jade'),
				{
					projectName: this.projectName
				}
			);
		},

		packageJSON: function () {
			this.fs.copyTpl(
				this.templatePath('_package.json'),
				this.destinationPath('package.json'),
				{
				}
			);
		},

		gitignore: function () {
			this.fs.copy(
				this.templatePath('gitignore'),
				this.destinationPath('.gitignore')
			);
		},

		editorConfig: function () {
			this.fs.copy(
				this.templatePath('editorconfig'),
				this.destinationPath('.editorconfig')
			);
		},

		jshint: function () {
			this.fs.copy(
				this.templatePath('jshintrc'),
				this.destinationPath('.jshintrc')
			);
		}
	},

	end: function () {
		this.installDependencies();
	}
});

module.exports = StraticGenerator;
