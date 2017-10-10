/// <reference types="jest" />

import {
  matcherHint,
  printExpected,
  printReceived,
  printWithType
} from 'jest-matcher-utils'
import diff from 'jest-diff'

import { ensureFunctions } from './utils'

function toChange(this: any, actual: () => void, expected: () => any) {
  ensureFunctions(actual, expected, '.toChange')

  const expectedValue = expected()
  actual() // side-effect
  const receivedValue = expected()

  const pass = expectedValue !== expected()

  const message = pass
    ? () => {
        const diffString = diff(receivedValue, expectedValue, {
          expand: this.expand
        })

        return (
          matcherHint('.not.toChange') +
          '\n\n' +
          `Expected resolved value not to change:\n` +
          `  ${printExpected(expectedValue)}\n` +
          `Received:\n` +
          `  ${printReceived(receivedValue)}` +
          (diffString ? `\n\nDifference:\n\n${diffString}` : '')
        )
      }
    : () => {
        return (
          matcherHint('.toChange') +
          '\n\n' +
          `Expected resolved value to change (using ===):\n` +
          `  ${printExpected(expectedValue)}\n` +
          `Received value did not change:\n` +
          `  ${printReceived(receivedValue)}`
        )
      }

  return { message, pass }
}

export default { toChange }
