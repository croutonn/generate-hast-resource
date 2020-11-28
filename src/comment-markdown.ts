import { USER_REPO, GITHUB_HEAD_REF } from './constants'

function commentMarkdown(path: string) {
  const [owner, repo] = USER_REPO

  return `Your hast resource is ready:
[${path}](https://github.com/${owner}/${repo}/raw/${GITHUB_HEAD_REF}/${path})
  `
}

export default commentMarkdown
