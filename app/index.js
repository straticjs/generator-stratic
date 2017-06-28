'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var StraticGenerator = yeoman.extend({
	initializing () {
		this.pkg = require('../package.json');
	},

	prompting () {
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
		},
		/*
		{
			   type: 'list',
			   name: 'questionPreference',
			message: 'How many questions do you want to be asked?',
			choices: ['Gimme a blog, like, NOW.', 'I have time for a couple important ones.', 'Show ALL the advanced options!']
		}
		*/
		{
			   type: 'input',
			   name: 'projectUrl',
			message: 'What URL will your blog have? I need this for RSS support.',
			default: 'http://example.com/blog/'
		}
		];

		this.prompt(prompts).then(props => {
			this.projectName = props.projectName;
			this.projectUrl = props.projectUrl;
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
		});
	},

	writing: {
		gulpfile () {
			this.fs.copyTpl(
				this.templatePath('gulpfile.js'),
				this.destinationPath('gulpfile.js'),
				{
					projectUrl: this.projectUrl
				}
			);
		},

		mainHTML () {
			this.fs.copyTpl(
				this.templatePath('src/index.pug'),
				this.destinationPath('src/index.pug'),
				{
					projectName: this.projectName
				}
			);
			this.fs.copy(
				this.templatePath('src/includes/layout.pug'),
				this.destinationPath('src/includes/layout.pug')
			);
		},

		styles () {
			this.fs.copy(
				this.templatePath('src/styles/main.styl'),
				this.destinationPath('src/styles/main.styl')
			);
		},

		scripts () {
			this.fs.copy(
				this.templatePath('src/scripts/main.js'),
				this.destinationPath('src/scripts/main.js')
			);
		},

		images () {
			this.fs.write(this.destinationPath('src/images/.gitkeep'), '');
		},

		blogTemplates () {
			this.fs.copy(
				this.templatePath('src/includes/post.pug'),
				this.destinationPath('src/includes/post.pug')
			);
			this.fs.copyTpl(
				this.templatePath('src/blog/hello-world.md'),
				this.destinationPath('src/blog/hello-world.md')
			);
			this.fs.copyTpl(
				this.templatePath('src/blog/index.pug'),
				this.destinationPath('src/blog/index.pug'),
				{
					projectName: this.projectName
				}
			);
			this.fs.copyTpl(
				this.templatePath('src/blog/post.pug'),
				this.destinationPath('src/blog/post.pug'),
				{
					projectName: this.projectName
				}
			);
		},

		packageJSON () {
			this.fs.copyTpl(
				this.templatePath('_package.json'),
				this.destinationPath('package.json'),
				{
				}
			);
		},

		gitignore () {
			this.fs.copy(
				this.templatePath('gitignore'),
				this.destinationPath('.gitignore')
			);
		},

		editorConfig () {
			this.fs.copy(
				this.templatePath('editorconfig'),
				this.destinationPath('.editorconfig')
			);
		},

		jshint () {
			this.fs.copy(
				this.templatePath('jshintrc'),
				this.destinationPath('.jshintrc')
			);
		}
	},

	end () {
		this.installDependencies({ bower: false });
	}
});

module.exports = StraticGenerator;
