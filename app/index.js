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
		},
		{
			   type: 'list',
			   name: 'questionPreference',
			message: 'How many questions do you want to be asked?',
			choices: ['Gimme a blog, like, NOW.', 'I have time for a couple important ones.', 'Show ALL the advanced options!']
		}];

		this.prompt(prompts, function (props) {
			this.projectName = props.projectName;
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
