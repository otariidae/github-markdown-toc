# GitHub Markdown Tabele of Contents
[![CircleCI](https://img.shields.io/circleci/project/github/otariidae/github-markdown-toc.svg?style=flat-square)](https://circleci.com/gh/otariidae/github-markdown-toc)
[![Codecov](https://img.shields.io/codecov/c/github/otariidae/github-markdown-toc.svg?style=flat-square)](https://codecov.io/gh/otariidae/github-markdown-toc)
[![GitHub tag](https://img.shields.io/github/tag/otariidae/github-markdown-toc.svg?style=flat-square)](https://github.com/otariidae/github-markdown-toc/releases)
[![CC0-1.0](https://img.shields.io/badge/license-CC0-blue.svg?style=flat-square)](http://creativecommons.org/publicdomain/zero/1.0/)
[![JavaScript Standard Style](https://img.shields.io/badge/code_style-standard-yellow.svg?style=flat-square)](https://standardjs.com/)

Chrome extension to show a table of contents on GitHub.  
No more scrolling to read long long long documents.

![this app on GitHub](doc/screenshot.png)  
*An example of a long readme with this extension -- AVA: a nice test runner for Node.js*

Works with:
- README on the top pages
- Markdown files
- Wikis
- Commented tags in release pages

## Install
You can install the latest version manually.

1. Download *github-markdown-toc.zip* from [the release page](https://github.com/otariidae/github-markdown-toc/releases) and unzip it.
2. Visit chrome://extensions.
3. Click to check *Developer mode*.
4. Click *Load unpacked extension...*.
5. Select the unzipped directory.

For more info, see [Chrome Extension Get Started](https://developer.chrome.com/extensions/getstarted#unpacked) or [Google Chrome FAQ](https://developer.chrome.com/extensions/faq#faq-dev-01).

## Usage
Click the button on the top right-hand corner to show or hide the table of contents.

## Permissions
```json
"permissions": [
  "https://github.com/*",
  "contentSettings",
  "tabs"
]
```
- `https://github.com/*` is used to run scripts on GitHub.
- `contentSettings` and `tabs` are used to know whether JavaScript is enabled in the tab or not.

## Recommended environment
- the latest stable version of Google Chrome

## License
CC0  
[![CC0](https://licensebuttons.net/p/zero/1.0/88x31.png "CC0")](http://creativecommons.org/publicdomain/zero/1.0/)
