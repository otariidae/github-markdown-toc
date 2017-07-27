const github = 'https://github.com'

export default ({ version }) => ({
  manifest_version: 2,
  name: 'GitHub Markdown Table of Contents',
  description: 'Show a table of contents of markdown on GitHub',
  version: version,
  author: 'otariidae',
  homepage_url: `${github}/otariidae/github-markdown-toc`,
  content_scripts: [
    {
      matches: [`${github}/*`],
      exclude_matches: [
        'login',
        'join',
        'sessions',
        'blog',
        'about',
        'features',
        'business',
        'personal',
        'open-source',
        'pricing',
        'contact',
        'explore',
        'settings',
        'notifications',
        'watching',
        'pulls',
        'issues',
        'integrations',
        'showcases',
        'trending',
        'marketplace',
        'apps'
      ]
        .map(url => [`${github}/${url}/*`, `${github}/${url}?*`])
        .reduce((a, b) => a.concat(b)),
      css: ['index.css'],
      js: ['index.js']
    }
  ],
  background: {
    scripts: ['background.js'],
    persistent: false
  },
  permissions: [`${github}/*`, 'contentSettings', 'tabs'],
  web_accessible_resources: [
    'spinner.svg',
    'arrow-right.svg',
    'arrow-left.svg',
    'arrow-left-disabled.svg'
  ]
})
