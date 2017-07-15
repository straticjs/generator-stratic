# `generator-stratic` changelog

`generator-stratic` follows [Semantic Versioning][1].

## 1.0.0 beta 5 - Future

### Changed

* Removed unneeded dependency

## 1.0.0 beta 4 - 2017-06-28

### Added

* Generated projects now have support for drafts and RSS feeds

### Changed

* Switch from Jade to Pug
* Small `package.json` cleanups

## 1.0.0 beta 3 - 2017-05-07

### Fixed

* Fix gulpfile looking for JS in the wrong directory

### Changed

* Upgrade deps
* Generate a directory for images
* Handler errors better in the gulpfile using gulp-plumber
* Minor cleanups

### Breaking

* Node 4+ is now required due to a dep upgrade (`yosay@2` requires ES2015)

## 1.0.0 beta 2 - 2017-02-20

### Fixed

* Fix CSS not working out-of-the-box
* Fix the gulpfile not properly watching for HTML changes

## 1.0.0 beta 1 - 2017-02-19

### Changed

* Switched from the now-deprecated custom Stratic header to YAML frontmatter

## 1.0.0 beta 0 - 2017-02-17

### Added

* Initial release

 [1]: http://semver.org/
