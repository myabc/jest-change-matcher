import getType from 'jest-get-type'
import {
  matcherHint,
  printExpected,
  printReceived,
  printWithType
} from 'jest-matcher-utils'

export const ensureActualIsFunction = (actual: any, matcherName: string) => {
  if (typeof actual !== 'function') {
    throw new Error(
      matcherHint(`[.not]${matcherName}`, 'function', getType(actual)) +
        '\n\n' +
        'Received value must be a function, but instead ' +
        `"${getType(actual)}" was found`
    )
  }
}

export const ensureExpectedIsFunction = (
  expected: any,
  matcherName: string
) => {
  if (typeof expected !== 'function') {
    throw new Error(
      matcherHint(`[.not]${matcherName}`, 'actual', 'function') +
        '\n\n' +
        'Expected value must be a function, but instead ' +
        `"${getType(expected)}" was found`
    )
  }
}

export function ensureFunctions(
  actual: any,
  expected: any,
  matcherName: string
) {
  ensureActualIsFunction(actual, matcherName)
  ensureExpectedIsFunction(expected, matcherName)
}
