import * as core from '@actions/core'
import {ReleaseType, SemVer} from 'semver'

async function run(): Promise<void> {
  try {
    const semver = new SemVer(core.getInput('version', {required: true}))
    const release: ReleaseType = core.getInput('release', {
      required: true
    }) as ReleaseType

    let identifier: string | undefined = undefined

    switch (release) {
      case 'premajor':
      case 'preminor':
      case 'prepatch':
      case 'prerelease':
        identifier = core.getInput('identifier', {required: true})
        break
    }

    core.setOutput('version', semver.inc(release, identifier).version)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
