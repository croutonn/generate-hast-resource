import { PullsListFilesResponseData } from '@octokit/types'

type ICreateFilePathInput = Partial<
  Omit<PullsListFilesResponseData[number], 'filename' | 'contents_url'>
> &
  Required<
    Pick<PullsListFilesResponseData[number], 'filename' | 'contents_url'>
  >

const getDirPathFromContentUrl = (contentUrl: string): string => {
  /**
   * @example
   * https://api.github.com/repos/octocat/Hello-World/contents/foo/bar/file1.txt?ref=6dcb09b5b57875f334f61aebed695e2e4193db5e
   * => foo/bar/
   */
  const path = contentUrl.split('/').slice(7, -1).join('/')
  return path ? `${path}/` : ''
}

const createFilePath = (file: ICreateFilePathInput) => {
  const dirPath = getDirPathFromContentUrl(file.contents_url)
  const filename = file.filename.replace(/\.(md|markdown)$/iu, '.json')
  return `${dirPath}${filename}`
}

export default createFilePath
