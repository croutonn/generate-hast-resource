import { USER_REPO, FORMATS } from './constants'
import octokit from './github-api'
import getPrNumber from './get-pr-number'

/**
 * Find files with md and mdx extensions and extract information
 * @returns Front matter attributes as JSON
 */
async function findFile() {
  const [owner, repo] = USER_REPO
  const pullNumber = getPrNumber()

  const { data: filesList } = await octokit.pulls.listFiles({
    owner,
    repo,
    pull_number: pullNumber,
  })
  const markdownFiles = filesList.filter((file) => {
    return FORMATS.some((format) => file.filename.endsWith(format))
  })

  return markdownFiles
}
export default findFile
