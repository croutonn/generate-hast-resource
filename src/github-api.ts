import { GitHub, getOctokitOptions } from '@actions/github/lib/utils'
import { retry } from '@octokit/plugin-retry'
import { GITHUB_TOKEN } from './constants'

const Octokit = GitHub.plugin(retry)
const octokit = new Octokit(getOctokitOptions(GITHUB_TOKEN as string))

export default octokit
