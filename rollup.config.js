import resolve from 'rollup-plugin-node-resolve'
import svelte from 'rollup-plugin-svelte'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'iife',
    sourcemap: true,
  },
  plugins: [
    svelte(),
    resolve({
      jsnext: true,
      main: true
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    uglify(),
  ],
}

