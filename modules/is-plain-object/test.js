import test from 'tape'
import isPlainObj from './index.js'

test('is-plain-object', t => {

  class Foo {
  }

  t.ok(isPlainObj({}))
  t.ok(isPlainObj(Object.create(null)))
  t.ok(isPlainObj(new Proxy({}, {})))

  t.notOk(isPlainObj())
  t.notOk(isPlainObj('string'))
  t.notOk(isPlainObj(new String('string')))
  t.notOk(isPlainObj(42))
  t.notOk(isPlainObj(NaN))
  t.notOk(isPlainObj(new Number(42)))
  t.notOk(isPlainObj([]))
  t.notOk(isPlainObj(/regexp/))
  t.notOk(isPlainObj(true))
  t.notOk(isPlainObj(false))
  t.notOk(isPlainObj(null))
  t.notOk(isPlainObj(undefined))
  t.notOk(isPlainObj(new Error()))
  t.notOk(isPlainObj(new Date()))
  t.notOk(isPlainObj(() => {}))
  t.notOk(isPlainObj(new Foo()))
  t.end()
})
