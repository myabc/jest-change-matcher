import matcher from '../src/jest-change-matcher'
import jestExpect from 'expect'

jestExpect.extend(matcher)

describe('#toChange', () => {
  it('fails for', () => {
    let a = 0
    expect(() =>
      jestExpect(() => {
        a = a
      }).toChange(() => a)
    ).toThrowErrorMatchingSnapshot()
  })

  it('ok for', () => {
    let a = 0
    expect(() =>
      jestExpect(() => {
        a += 1
      }).toChange(() => a)
    ).not.toThrow()
  })
})
