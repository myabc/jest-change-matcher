declare module 'jest-diff' {
  type DiffOptions = {
    aAnnotation?: string
    bAnnotation?: string
    expand?: boolean
    contextLines?: number
  }

  function diff(a: any, b: any, options?: DiffOptions): string

  export = diff
}

declare module 'jest-matcher-utils' {
  function ensureActualIsNumber(actual: any, matcherName?: string): void
  function ensureExpectedIsNumber(actual: any, matcherName?: string): void
  function ensureNoExpected(actual: any, matcherName?: string): void
  function ensureNumbers(actual: any, expected: any, matcherName?: string): void
  /**
   * get the type of a value with handling of edge cases like `typeof []` and `typeof null`
   */
  function getType(value: any): string
  function matcherHint(
    matcherName: string,
    received?: string,
    expected?: string,
    options?: { secondArgument?: string; isDirectExpectCall?: boolean }
  ): string
  function pluralize(word: string, count: number): string
  function printExpected(value: any): string
  function printReceived(value: any): string
  function printWithType(
    name: string,
    received: any,
    print: (value: any) => string
  ): string
  function stringify(object: {}, maxDepth?: number): string
}
