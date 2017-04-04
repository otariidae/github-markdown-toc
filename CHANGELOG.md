# Changelog

## 0.5.7
- Use `GitHubPage` class and its subclasses instead of functions  
  `get-header-data.js` -> `page.js`
- Add `use strict` to entry points

## 0.5.6
- Use `PageType` class instead of functions  
  `check-page-type.js` -> `page-type.js`

## 0.5.5
- `eventemitter#off` returns boolean
- Add `store#removeChangeListener`

## 0.5.4
- Use an original event emitter

## 0.5.3
- Add `_` to private variables
- Refactor
- Improve JSDoc

## 0.5.2
- Use `.map` file instead of inline CSS source map

## 0.5.1
- Change flux state API
- Rename a variable

## 0.5.0
- Design change
- Update dependeceis
- Refactor

## 0.4.4
- Add _login?*_ to *exclude_matches*
- Use `*` for all urls in *exclude_matches*

## 0.4.3
- Add JSDoc comments
- Use `reify` to run tests with `ES modules`
- Add *author* and *homepage_url* to `package.json`
- Add *repository* and *bugs* to `manifest.json`

## 0.4.2
- Use `rollup` instead of `browserify`
- Use `ES Modules` instead of `Node.js Modules`

## 0.4.1
- Code splitting
- Add some parant classes

## 0.4.0
- Add a loading animation between `pjax:start` and `pjax:end`.

## 0.3.1
- Use `Symbol` inside `check-page-type.js`

## 0.3.0
- Use `aria-*` inside HTML and CSS

## 0.2.1
- Allow non-object-like value inside `deep-assign.js`

## 0.2.0
- Split code
- Remove *material-flux* because it is fat for this small extension
- Use an original flux

## 0.1.1
- Fix wrong `document.querySeector` on wiki pages

## 0.1.0
- Add support for wiki pages

## 0.0.6
- Refactor action of flux

## 0.0.5
- Padding-left: 4px -> 8px

## 0.0.4
- Update *svelte* to 1.10.2
- Make the script tag top-level because *svelte* pass through non-top-level one.

## 0.0.3 (initial)
*No record and memory before 0.0.3*
