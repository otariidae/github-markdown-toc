import { describe, it as test } from 'kocha'
import t from 'assert'
import isPlainObj from './index.js'

describe('is-plain-object', () => {

  class Foo {
  }

  test('{}', () => {
    t.ok(isPlainObj({}))
  })
  test('Object.create(null)', () => {
    t.ok(isPlainObj(Object.create(null)))
  })
  test('proxy', () => {
    t.ok(isPlainObj(new Proxy({}, {})))
  })
  test('no argument', () => {
    t.ifError(isPlainObj())
  })
  test('string', () => {
    t.ifError(isPlainObj('string'))
    t.ifError(isPlainObj(new String('string')))
  })
  test('number', () => {
    t.ifError(isPlainObj(42))
    t.ifError(isPlainObj(new Number(42)))
    t.ifError(isPlainObj(NaN))
  })
  test('array', () => {
    t.ifError(isPlainObj([]))
  })
  test('regexp', () => {
    t.ifError(isPlainObj(/regexp/))
  })
  test('booelan', () => {
    t.ifError(isPlainObj(true))
    t.ifError(isPlainObj(false))
  })
  test('null', () => {
    t.ifError(isPlainObj(null))
  })
  test('undefined', () => {
    t.ifError(isPlainObj(undefined))
  })
  test('function', () => {
    t.ifError(isPlainObj(() => {}))
    t.ifError(isPlainObj(Foo))
  })
  test('class instance', () => {
    t.ifError(isPlainObj(new Foo()))
  })
  test('other build-in objects', () => {
    t.ifError(isPlainObj(new Error()))
    t.ifError(isPlainObj(new Date()))
  })
})
