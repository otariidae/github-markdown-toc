import { describe, it as test } from 'kocha'
import t from 'assert'
import deepAssign from './index.js'

describe('deep-assign', () => {
  test('basic use', () => {
    const target = {
      hoge: 'fuga'
    }
    const source = {
      foo: 'bar',
      baz: {
        qux: 'quux'
      }
    }
    const expected = {
      hoge: 'fuga',
      foo: 'bar',
      baz: {
        qux: 'quux'
      }
    }
    const result = deepAssign(target, source)

    t.ok(Object.is(target, result))
    t.ifError(Object.is(result, expected))
    t.ifError(Object.is(source.baz, result.baz))
    t.deepStrictEqual(result, target)
    t.deepStrictEqual(expected, result)
  })

  test('Object.create(null)', () => {
    const nullProtoObj = Object.create(null)
    const obj = {
      foo: 'bar'
    }
    const result = deepAssign(nullProtoObj, obj)

    t.equal(Object.getPrototypeOf(result), null)
  })

  test('ignore null', () => {
    t.deepStrictEqual(deepAssign({}, null), {})
  })

  test('ignore undefined', () => {
    t.deepStrictEqual(deepAssign({}, undefined), {})
  })
})
