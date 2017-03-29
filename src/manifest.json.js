export default ({ version, excludes }) => {
  return {
    manifest_version: 2,
    name: 'GitHub Markdown Table of Contents',
    description: 'Show a table of contents of markdown on GitHub',
    version: version,
    author: 'otariidae',
    homepage_url: 'https://github.com/otariidae/github-markdown-toc',
    content_scripts: [
      {
        matches: ['https://github.com/*'],
        exclude_matches: excludes
                           .map(item => {
                             return [
                               `https://github.com/${item}/*`,
                               `https://github.com/${item}?*`
                             ]
                           })
                           .reduce((a, b) => {
                             return a.concat(b)
                           }),
        css: ['index.css'],
        js: ['index.js']
      }
    ],
    background: {
      scripts: ['background.js'],
      persistent: false
    },
    permissions: [
      'https://github.com/*', 'contentSettings', 'tabs'
    ],
    web_accessible_resources: [
      'spinner.svg'
    ]
  }
}
