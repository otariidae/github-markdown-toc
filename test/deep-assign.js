import test from 'tape'
import deepAssign from '../modules/deep-assign/index.js'

test('deep-assign', t => {
  t.test('', t => {
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
    t.notOk(Object.is(result, expected))
    t.notOk(Object.is(source.baz, result.baz))
    t.deepEqual(result, target)
    t.deepEqual(expected, result)
    t.end()
  })

  t.test('Object.create(null)', t => {
    const nullProtoObj = Object.create(null)
    const obj = {
      foo: 'bar'
    }
    const result = deepAssign(nullProtoObj, obj)

    t.equal(Object.getPrototypeOf(result), null)
    t.end()
  })

  t.test('ignore null', t => {
    t.deepEqual(deepAssign({}, null), {})
    t.end()
  })

  t.test('ignore undefined', t => {
    t.deepEqual(deepAssign({}, undefined), {})
    t.end()
  })

  t.end()
})
