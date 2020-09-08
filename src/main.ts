import * as core from '@actions/core'
import * as github from '@actions/github'

async function run(): Promise<void> {
  const octokit = github.getOctokit(core.getInput('github_token'))
  try {
    const {data: pullRequests} = await octokit.pulls.list({
      ...github.context.repo,
      state: 'open'
    })
    core.info(`pr num: ${pullRequests.length}`)
  } catch (error) {
    core.info('error')
  }
}

run()
