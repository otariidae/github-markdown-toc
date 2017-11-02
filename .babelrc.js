const plugins = [
  [
    "@babel/proposal-class-properties",
    { loose: true },
  ],
  process.env.NODE_ENV === "test" && [
    "@babel/transform-modules-commonjs",
    { loose: true }
  ],
].filter(Boolean)

module.exports = {
  plugins,
}
