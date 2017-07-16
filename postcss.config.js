module.exports = {
  map: {
    inline: false,
    annotation: true
  },
  plugins: [
    require('postcss-nested')(),
    require('postcss-custom-properties')()
  ]
}
