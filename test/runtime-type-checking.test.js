const { stringify } = require('jest-matcher-utils')
const { default: matcher } = require('../src/jest-change-matcher')
const jestExpect = require('expect')

jestExpect.extend(matcher)

describe('#toChange', () => {
  const notFunctions = [
    {},
    [],
    true,
    null,
    undefined,
    15,
    'notAFunction',
    Symbol()
  ]

  notFunctions.forEach(actual => {
    it(`fails for: ${stringify(actual)} (not a function) and function`, () => {
      let a = 0
      expect(() => {
        jestExpect(actual).toChange(() => a)
      }).toThrowErrorMatchingSnapshot()
    })
  })

  notFunctions.forEach(expected => {
    it(`fails for: function and ${stringify(
      expected
    )} (not a function)`, () => {
      let a = 0
      expect(() => {
        jestExpect(() => (a = a)).toChange(expected)
      }).toThrowErrorMatchingSnapshot()
    })
  })

  notFunctions.forEach(bothArgs => {
    it(`fails for: ${stringify(bothArgs)} and ${stringify(
      bothArgs
    )} (neither is a function)`, () => {
      let a = 0
      expect(() => {
        jestExpect(bothArgs).toChange(bothArgs)
      }).toThrowErrorMatchingSnapshot()
    })
  })
})
