const plugins = [
  "transform-class-properties",
  process.env.NODE_ENV === "test" && "transform-es2015-modules-commonjs",
].filter(Boolean)

module.exports = {
  plugins,
}
