import test from 'tape'
import { curry1, prop, map, filter, pipe, apply, always } from './index.js'

test('curry1', t => {
  const f = curry1((a, b, c) => (a + b + c))

  t.equal(typeof f, 'function')

  t.test('single', t => {
    const g = f(1)

    t.equal(typeof g, 'function')
    t.equal(g(2, 3), 6)
    t.end()
  })
  t.test('2', t => {
    const g = f(2, 4)

    t.equal(typeof g, 'function')
    t.equal(g(8), 14)
    t.end()
  })
  t.test('all', t => {
    t.equal(f(42, 42, 42), 126)
    t.end()
  })
  t.end()
})

test('prop', t => {
  const obj = {
    number: 42
  }
  const number = prop('number')

  t.equal(typeof number, 'function')
  t.equal(number(obj), 42)
  t.equal(prop('number', obj), 42)
  t.end()
})

test('pipe', t => {
  const f = (a, b) => a + b
  const g = a => a * a
  const h = pipe(f, g)

  t.equal(typeof h, 'function')
  t.equal(h(2, 3), 25)
  t.end()
})

test('map', t => {
  const f = a => a * a
  const g = map(f)
  const arr = [2, 3, 4]

  t.equal(typeof g, 'function')
  t.deepEqual(g(arr), [4, 9, 16])
  t.deepEqual(map(f, arr), [4, 9, 16])
  t.end()
})

test('filter', t => {
  const f = a => a % 2 === 0
  const g = filter(f)
  const arr = [1, 2, 3, 4, 5]

  t.equal(typeof g, 'function')
  t.deepEqual(g(arr), [2, 4])
  t.deepEqual(filter(f, arr), [2, 4])
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
