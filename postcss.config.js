module.exports = {
  map: {
    inline: false,
    annotation: true
  },
  plugins: [
    require('postcss-import')(),
    require('postcss-for')(),
    require('postcss-nested')(),
    require('postcss-custom-properties')()
 ]
}
