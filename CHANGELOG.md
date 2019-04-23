# Changelog

## [0.12.0](https://github.com/otariidae/github-markdown-toc/compare/v0.11.0...v0.12.0)

### Changed

- Use `Sass`
- Update the button position


## [0.11.0](https://github.com/otariidae/github-markdown-toc/compare/v0.10.0...v0.11.0)

### Changed

- Use `lit-html` instead of `svelte`\
  Svelte is great. But now I am intrested in lit-html.
- Do not uglify code\
  Chrome Web Store will no longer allows obfuscated code.\
  The previous versions of this extension was minified via `uglify-js` or `uglify-es`. This is not obfuscation but minification.\
  However, this extension is enough small without minification.

## [0.10.0](https://github.com/otariidae/github-markdown-toc/compare/v0.9.1...v0.10.0)

### Changed

- Exclude github.com/topics
- :sparkles::recycle: Big refactoring

## [0.9.1](https://github.com/otariidae/github-markdown-toc/compare/v0.9.0...v0.9.1)

### Changed

- Exclude github.com/styleguide

## [0.9.0](https://github.com/otariidae/github-markdown-toc/compare/v0.8.0...v0.9.0)

### Added

- Warning for JavaScript-disabled environment

### Changed

- Exclude github.com/apps

### Removed

- Support for JavaScript-disabled environment

## [0.8.0](https://github.com/otariidae/github-markdown-toc/compare/v0.7.1...v0.8.0)

### Added

- Loading Animation on the body

### Changed

- Background/border color: `Material Design` -> `Primer`

### Removed

- Loading Animation on the top-right button

## [0.7.1](https://github.com/otariidae/github-markdown-toc/compare/v0.7.0...v0.7.1)

### Added

- functional-util:
  - `curry1` function
- `prettier`
- Coverage via codecov.io

### Changed

- functional-util:
  - Curry some functions

## [0.7.0](https://github.com/otariidae/github-markdown-toc/compare/v0.6.0...v0.7.0)

### Changed

- More readable font
  - `font-size: 13px` -> `14px`
  - `line-height: 1.2` -> `1.25`
- Flat list -> nested list
  - Behave like HTML outline

### Removed

- `background-color` when list items were hovered

## [0.6.0](https://github.com/otariidae/github-markdown-toc/compare/v0.5.8...v0.6.0)

### Changed

- Functional programming

## [0.5.8](https://github.com/otariidae/github-markdown-toc/compare/v0.5.7...v0.5.8)

### Added

- `is-plain-object` module

## [0.5.7](https://github.com/otariidae/github-markdown-toc/compare/v0.5.6...v0.5.7)

### Changed

- functions -> `GitHubPage` class and its subclasses\
  `get-header-data.js` -> `page.js`
- `use strict` in entry points

## [0.5.6](https://github.com/otariidae/github-markdown-toc/compare/v0.5.5...v0.5.6)

### Changed

- functions -> `PageType` class\
  `check-page-type.js` -> `page-type.js`

## [0.5.5](https://github.com/otariidae/github-markdown-toc/compare/v0.5.4...v0.5.5)

### Added

- `store#removeChangeListener`

### Changed

- `eventemitter#off` returns boolean

## [0.5.4](https://github.com/otariidae/github-markdown-toc/compare/v0.5.3...v0.5.4)

### Added

- `EventEmitter` module

## [0.5.3](https://github.com/otariidae/github-markdown-toc/compare/v0.5.2...v0.5.3)

[inital changes only]

## [0.5.2](https://github.com/otariidae/github-markdown-toc/compare/v0.5.1...v0.5.2)

### Changed

- inline CSS sourcemaps -> `.map` files

## [0.5.1](https://github.com/otariidae/github-markdown-toc/compare/v0.5.0...v0.5.1)

[inital changes only]

## [0.5.0](https://github.com/otariidae/github-markdown-toc/compare/v0.4.4...v0.5.0)

### Changed

- Design

## [0.4.4](https://github.com/otariidae/github-markdown-toc/compare/v0.4.3...v0.4.4)

### Changed

- Exclude _login?\*_
- More strict _exclude_matches_

## [0.4.3](https://github.com/otariidae/github-markdown-toc/compare/v0.4.2...v0.4.3)

### Added

- JSDoc comments
- _author_ and _homepage_url_ in `package.json`
- _repository_ and _bugs_ in `manifest.json`

## [0.4.2](https://github.com/otariidae/github-markdown-toc/compare/v0.4.1...v0.4.2)

### Changed

- `browserify` -> `rollup`
- `Node.js Modules` -> `ES Modules`

## [0.4.1](https://github.com/otariidae/github-markdown-toc/compare/v0.4.0...v0.4.1)

### Added

- Flux module

## [0.4.0](https://github.com/otariidae/github-markdown-toc/compare/v0.3.1...v0.4.0)

### Added

- Loading animation

## [0.3.1](https://github.com/otariidae/github-markdown-toc/compare/v0.3.0...v0.3.1)

### Changed

- Constant string -> `Symbol` inside `check-page-type.js`

## [0.3.0](https://github.com/otariidae/github-markdown-toc/compare/v0.2.1...v0.3.0)

### Added

- `aria-*` inside HTML and CSS

## [0.2.1](https://github.com/otariidae/github-markdown-toc/compare/v0.2.0...v0.2.1)

### Added

- Non-object-like value support inside `deep-assign.js`

## [0.2.0](https://github.com/otariidae/github-markdown-toc/compare/v0.1.1...v0.2.0)

### Changed

- _material-flux_ -> an original flux

## [0.1.1](https://github.com/otariidae/github-markdown-toc/compare/v0.1.0...v0.1.1)

### Fixed

- Wrong `document.querySeector` on wiki pages

## [0.1.0](https://github.com/otariidae/github-markdown-toc/compare/v0.0.6...v0.1.0)

### Added

- Support for wiki pages

## [0.0.6](https://github.com/otariidae/github-markdown-toc/compare/v0.0.5...v0.0.6)

[inital changes only]

## [0.0.5](https://github.com/otariidae/github-markdown-toc/compare/v0.0.4...v0.0.5)

### Changed

- `padding-left: 4px` -> `8px`

## [0.0.4](https://github.com/otariidae/github-markdown-toc/compare/v0.0.3...v0.0.4)

[inital changes only]

## 0.0.3 - initial

_No record and memory before 0.0.3_
