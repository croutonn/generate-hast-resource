import { PullsListFilesResponseData } from '@octokit/types'

type ICreateFilePathInput = Partial<
  Omit<PullsListFilesResponseData[number], 'filename'>
> &
  Required<Pick<PullsListFilesResponseData[number], 'filename'>>

const createFilePath = (file: ICreateFilePathInput) => {
  return file.filename.replace(/\.(md|markdown)$/iu, '.json')
}

export default createFilePath
