import test from 'tape'
import { prop, map, filter, pipe, apply, always } from '../modules/functional-util/index.js'

test('prop', t => {
  const obj = {
    number: 42
  }
  const number = prop('number')
  t.equal(typeof number, 'function')
  t.equal(number(obj), 42)
  t.end()
})

test('pipe', t => {
  const f = (a, b) => a + b
  const g = (a) => a * a
  const h = pipe(f, g)
  t.equal(typeof h, 'function')
  t.equal(h(2, 3), 25)
  t.end()
})

test('map', t => {
  const f = (a) => a * a
  const g = map(f)
  const arr = [2, 3, 4]
  t.equal(typeof g, 'function')
  t.deepEqual(g(arr), [4, 9, 16])
  t.end()
})

test('filter', t => {
  const f = (a) => a % 2 === 0
  const g = filter(f)
  t.equal(typeof g, 'function')
  t.deepEqual(g([1, 2, 3, 4, 5]), [2, 4])
  t.end()
})

test('apply', t => {
  t.equal(apply(Math.max)([-1, 2, -3, 42, -50]), 42)
  t.end()
})

test('always', t => {
  const f = always(42)
  const g = always()

  t.equal(typeof f, 'function')
  t.equal(typeof g, 'function')
  t.equal(f(), 42)
  t.equal(g(), undefined)
  t.end()
})
