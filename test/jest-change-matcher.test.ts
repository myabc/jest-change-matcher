import matcher from '../src/jest-change-matcher'
import jestExpect from 'expect'

jestExpect.extend(matcher)

describe('#toChange', () => {
  it('passes for resolved values that change', () => {
    let a = 0
    expect(() => {
      jestExpect(() => (a += 1)).toChange(() => a)
    }).not.toThrow()
  })

  it(`passes for resolved values that do not change with '.not'`, () => {
    let a = 0
    expect(() => {
      jestExpect(() => (a = a)).not.toChange(() => a)
    }).not.toThrow()
  })

  it('fails for resolved values that do not change', () => {
    let a = 0
    expect(() => {
      jestExpect(() => (a = a)).toChange(() => a)
    }).toThrowErrorMatchingSnapshot()
  })

  it(`fails for resolved values that change with '.not'`, () => {
    let a = 0
    expect(() => {
      jestExpect(() => (a += 1)).not.toChange(() => a)
    }).toThrowErrorMatchingSnapshot()
  })
})
