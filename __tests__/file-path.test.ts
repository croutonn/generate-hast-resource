import createFilePath from '../src/file-path'

const testCases = [
  {
    input: {
      filename: 'file1.md',
      contents_url:
        'https://api.github.com/repos/octocat/Hello-World/contents/foo/bar/file1.md?ref=6dcb09b5b57875f334f61aebed695e2e4193db5e',
    },
    expect: 'foo/bar/file1.json',
  },
  {
    input: {
      filename: 'file1.md',
      contents_url:
        'https://api.github.com/repos/octocat/Hello-World/contents/file1.md?ref=6dcb09b5b57875f334f61aebed695e2e4193db5e',
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
