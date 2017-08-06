module.exports = {
  map: {
    inline: false,
    annotation: true
  },
  plugins: [
    require('postcss-nested')(),
    require('postcss-url')({
      url: 'inline',
      encodeType: 'base64',
    })
  ]
}
