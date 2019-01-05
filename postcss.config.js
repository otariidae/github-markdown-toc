const { resolve } = require('path')

module.exports = {
  map: {
    inline: false,
    annotation: true
  },
  plugins: [
    require('postcss-url')({
      url: 'inline',
      basePath: resolve(__dirname, './src/css'),
      encodeType: 'base64',
    })
  ]
}
