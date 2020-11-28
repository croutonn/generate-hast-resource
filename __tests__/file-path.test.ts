import createFilePath from '../src/file-path'

const testCases = [
  {
    input: {
      filename: 'foo/bar/file1.md',
    },
    expect: 'foo/bar/file1.json',
  },
  {
    input: {
      filename: 'file1.md',
    },
    expect: 'file1.json',
  },
]

describe('Create File Path', () => {
  it(`​should pass all test cases`, () => {
    testCases.forEach((testCase) => {
      expect(createFilePath(testCase.input)).toBe(testCase.expect)
    })
  })
})
