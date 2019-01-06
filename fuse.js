const { FuseBox } = require('fuse-box')
const fuse = FuseBox.init({
  homeDir: '.',
  target: 'browser@es2017',
  output: 'dist/$name.js'
})
fuse.bundle('index')
  .instructions(' > src/index.ts')
fuse.run()
