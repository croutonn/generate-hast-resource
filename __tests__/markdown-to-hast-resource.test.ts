import markdownToHastResource from '../src/markdown'
import { readFileSync } from 'fs'
import { resolve } from 'path'

describe('Markdown To Hast Resource', () => {
  const content = readFileSync(resolve(__dirname, '../demo/test-file.md'), {
    encoding: 'utf-8',
  })

  it(`should return a string`, () => {
    const result = markdownToHastResource(content)
    expect(typeof result).toBe('string')
  })

  it(`should return a JSON string`, () => {
    const result = markdownToHastResource(content)
    const json = JSON.parse(result)
    expect(typeof json.body).toBe('object')
  })
})
