import { getInput } from '@actions/core'

/**
 * Get repository level property defaults.
 */
async function getRepoProps() {
  const commitMsg = getInput(`commitMsg`)
  return {
    commitMsg,
  }
}

export default getRepoProps
