import { describe, it as test } from 'kocha'
import { strict as t } from 'assert'
import { curry1, prop, pipe, always, has, or } from './index.js'

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
    const h = pipe(
      f,
      g
    )

    t.equal(typeof h, 'function')
    t.equal(h(2, 3), 25)
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

  describe('has', () => {
    test('basic', () => {
      t.ok(has('a', { a: 'b' }))
      t.ok(!has('a', { b: 'c' }))
    })
    test('curry', () => {
      t.ok(has('a')({ a: 'b' }))
    })
    test('symbol', () => {
      const a = Symbol('a')
      t.ok(has(a, { [a]: 'b' }))
    })
    test('class', () => {
      const instance = new class {
        constructor() {
          this.instanceProp = 'foo'
        }
        get prototypeProp() {
          return 'bar'
        }
      }()

      t.ok(has('instanceProp', instance))
      t.ok(has('prototypeProp', instance))
    })
  })

  test('or', () => {
    const f = always(false)
    const g = always(true)
    const h = always('foo')

    t.ok(or(f, g)())
    t.ok(!or(f, f)())
    t.strictEqual(or(f, h)(), 'foo')
    t.strictEqual(or(g, h)(), true)
    t.strictEqual(or(h, g)(), 'foo')
  })
})
