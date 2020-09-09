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

    const prNumber = pullRequests[0].number
    core.info(`prNumber: ${prNumber}`)

    const hoge = await octokit.graphql(
      `
      query($owner: String!, $name: String!, $number: Int!) {
        repository(owner: $owner, name: $name) {
          pullRequest(number: $number) {
            body
          }
        }
      }
      `,
      {
        owner: github.context.repo.owner,
        name: github.context.repo.repo,
        number: prNumber
      }
    )

    core.info(`${JSON.stringify(hoge)}`)
  } catch (error) {
    core.info(`${error}`)
  }
}

run()
