const { FuseBox } = require('fuse-box')
const fuse = FuseBox.init({
  homeDir: '.',
  target: 'browser@es2018',
  output: 'dist/$name.js',
  debug: true
})
fuse.bundle('index')
  .instructions(' > src/index.ts')
fuse.run()
