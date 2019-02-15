const github = "https://github.com"

export default ({ version, repository }) => ({
  manifest_version: 2,
  name: "GitHub Markdown Table of Contents",
  description: "Show a table of contents of markdown on GitHub",
  version: version,
  author: "otariidae",
  homepage_url: `${github}/${repository}`,
  content_scripts: [
    {
      matches: [`${github}/*`],
      exclude_matches: [
        "login",
        "join",
        "sessions",
        "blog",
        "about",
        "features",
        "business",
        "personal",
        "open-source",
        "pricing",
        "contact",
        "explore",
        "settings",
        "notifications",
        "watching",
        "pulls",
        "issues",
        "integrations",
        "showcases",
        "trending",
        "marketplace",
        "apps",
        "styleguide",
        "topics"
      ]
        .map(url => [`${github}/${url}/*`, `${github}/${url}?*`])
        .reduce((a, b) => a.concat(b)),
      css: ["index.css"],
      js: ["index.js"]
    }
  ],
  permissions: [`${github}/*`]
})
