import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import cjs from 'rollup-plugin-commonjs'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'iife',
    sourcemap: true,
  },
  plugins: [
    resolve({
      jsnext: true,
      main: true
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    cjs(),
  ],
}

