import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import svelte from 'rollup-plugin-svelte'
import babel from 'rollup-plugin-babel'

export default {
  entry: 'src/index.js',
  dest: 'dist/index.js',
  format: 'iife',
  sourceMap: true,
  plugins: [
    svelte(),
    resolve({
      jsnext: true,
      main: true
    }),
    commonjs(),
    babel({
      babelrc: false,
      presets: ['babili']
    })
  ]
}

