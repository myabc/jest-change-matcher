// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"

/// <reference types="jest" />

import { matcherHint } from 'jest-matcher-utils'
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
        `  ${beforeValue}\n` +
        `Received:\n` +
        `  ${newValue}`
    : () => {
        const diffString = diff(newValue, beforeValue)
        return (
          matcherHint('.toChange') +
          '\n\n' +
          `Expected resolved value to change (using ===):\n` +
          `  ${beforeValue}\n` +
          `Received:\n` +
          `  ${newValue}` +
          (diffString ? `\n\nDifference:\n\n${diffString}` : '')
        )
      }

  return { message, pass }
}

export default { toChange }
