# generator-stratic

[![Build Status](https://travis-ci.org/straticjs/generator-stratic.svg?branch=master)](https://travis-ci.org/straticjs/generator-stratic) [![Greenkeeper badge](https://badges.greenkeeper.io/straticjs/generator-stratic.svg)](https://greenkeeper.io/)
[![Coverage Status](https://coveralls.io/repos/github/straticjs/generator-stratic/badge.svg?branch=master)](https://coveralls.io/github/straticjs/generator-stratic?branch=master)
[![Greenkeeper badge](https://badges.greenkeeper.io/straticjs/generator-stratic.svg)](https://greenkeeper.io/)

The streaming static site generator

> [Yeoman](http://yeoman.io) generator


## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```bash
npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-stratic from npm, run:

```bash
npm install -g generator-stratic
```

Finally, initiate the generator:

```bash
yo stratic
```

## Testing

`generator-stratic` tests can be run with `npm test`. If you want to run _all_ tests, including very expensive ones that take a lot of time, export `STRATIC_TEST_EXPENSIVE` to the environment with a value of `true`, like so:

    $ export STRATIC_TEST_EXPENSIVE=true
	$ npm test

Travis CI will run all expensive tests by default, so most of the time you can just run the inexpensive tests locally and let Travis run the expensive ones when you submit a Pull Request.

## License

Yeoman is licensed under the MIT license. generator-stratic is licensed under the LGPL 3.0 or later.

## Naming

Stratic stands for STReaming stATIC site generator.

I also considered Glug, which stands for GulpLog Universal Generator. GulpLog is supposed to sound similar to weblog and Glug is supposed to sound similar to Gulp. In the end, though, Stratic won out.
