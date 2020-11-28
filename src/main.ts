#!/usr/bin/env node
import { warning } from '@actions/core'

import { GITHUB_TOKEN, GITHUB_EVENT_NAME, REPO_DIRECTORY } from './constants'
import commitFile from './commit-file'
import findFile from './find-file'
import getRepoProps from './repo-props'
import commentMarkdown from './comment-markdown'
import createComment from './create-comment'
import markdownToHastResource from './markdown'
import { readFileSync } from 'fs'
import createFilePath from './file-path'

if (!GITHUB_TOKEN) {
  console.log('You must enable the GITHUB_TOKEN secret')
  process.exit(1)
}

async function run() {
  // Bail out if the event that executed the action wasn’t a pull_request
  if (GITHUB_EVENT_NAME !== 'pull_request') {
    console.log('This action only runs for pushes to PRs')
    process.exit(78)
  }

  const repoProps = await getRepoProps()
  const markdownFiles = await findFile()

  if (!markdownFiles.length) {
    warning('No compatible files found')
  }

  markdownFiles.forEach(async (file) => {
    const filename = file.filename
    const repoDirectory = REPO_DIRECTORY as string
    const content = readFileSync(`${repoDirectory}/${filename}`, {
      encoding: 'utf-8',
    })
    const resource = markdownToHastResource(content)
    const filePath = createFilePath(file)

    commitFile(resource, repoProps, filePath)

    const markdown = commentMarkdown(filePath)
    await createComment(markdown)
  })
}

run()
