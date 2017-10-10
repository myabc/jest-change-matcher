// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"

/// <reference types="jest" />

import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils'
import diff from 'jest-diff'

function toChange(received: Function, expected: Function) {
  const beforeValue = expected()
  received()
  const newValue = expected()

  const pass = beforeValue !== expected()

  const message = pass
    ? () =>
        matcherHint('.not.toChange') +
        '\n\n' +
        `Expected resolved value not to change:\n` +
        `  ${printExpected(beforeValue)}\n` +
        `Received:\n` +
        `  ${printReceived(newValue)}`
    : () => {
        const diffString = diff(newValue, beforeValue)
        return (
          matcherHint('.toChange') +
          '\n\n' +
          `Expected resolved value to change (using ===):\n` +
          `  ${printExpected(beforeValue)}\n` +
          `Received:\n` +
          `  ${printReceived(newValue)}` +
          (diffString ? `\n\nDifference:\n\n${diffString}` : '')
        )
      }

  return { message, pass }
}

export default { toChange }
