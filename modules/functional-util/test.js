import { describe, it as test } from 'kocha'
import t from 'assert'
import { curry1, prop, map, filter, pipe, apply, always } from './index.js'

describe('functional-util', () => {
  describe('curry1', () => {
    const f = curry1((a, b, c) => a + b + c)

    test('is function', () => {
      t.equal(typeof f, 'function')
    })
    test('single', () => {
      const g = f(1)
      t.equal(typeof g, 'function')
      t.equal(g(2, 3), 6)
    })
    test('2', () => {
      const g = f(2, 4)
      t.equal(typeof g, 'function')
      t.equal(g(8), 14)
    })
    test('all', () => {
      t.equal(f(42, 42, 42), 126)
    })
  })

  describe('prop', () => {
    const obj = {
      number: 42
    }
    test('basic', () => {
      t.equal(prop('number', obj), 42)
    })
    test('curry', () => {
      const number = prop('number')
      t.equal(typeof number, 'function')
      t.equal(number(obj), 42)
    })
  })

  test('pipe', () => {
    const f = (a, b) => a + b
    const g = a => a * a
    const h = pipe(f, g)

    t.equal(typeof h, 'function')
    t.equal(h(2, 3), 25)
  })

  describe('map', () => {
    const f = a => a * a
    const arr = [2, 3, 4]

    test('basic', () => {
      t.deepStrictEqual(map(f, arr), [4, 9, 16])
    })
    test('curry', () => {
      const g = map(f)
      t.equal(typeof g, 'function')
      t.deepStrictEqual(g(arr), [4, 9, 16])
    })
  })

  describe('filter', () => {
    const f = a => a % 2 === 0
    const arr = [1, 2, 3, 4, 5]

    test('basic', () => {
      t.deepStrictEqual(filter(f, arr), [2, 4])
    })
    test('curry', () => {
      const g = filter(f)
      t.equal(typeof g, 'function')
      t.deepStrictEqual(g(arr), [2, 4])
    })
  })

  describe('apply', () => {
    test('basic', () => {
      t.equal(apply(Math.max, [-1, 2, -3, 42, -50]), 42)
    })
    test('curry', () => {
      const f = apply(Math.max)
      t.equal(typeof f, 'function')
      t.equal(f([-1, 2, -3, 42, -50]), 42)
    })
  })

  describe('always', () => {
    test('basic', () => {
      const f = always(42)
      t.equal(typeof f, 'function')
      t.equal(f(), 42)
    })
    test('no argument', () => {
      const g = always()
      t.equal(typeof g, 'function')
      t.equal(g(), undefined)
    })
  })
})
