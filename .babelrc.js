const plugins = [
  [
    "transform-class-properties",
    { loose: true },
  ],
  process.env.NODE_ENV === "test" && [
    "transform-es2015-modules-commonjs",
    { loose: true }
  ],
].filter(Boolean)

module.exports = {
  plugins,
}
