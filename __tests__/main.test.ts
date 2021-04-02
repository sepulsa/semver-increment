import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

const processEnv: NodeJS.ProcessEnv = {
  INPUT_VERSION: '0.1.0'
}
const np = process.execPath
const ip = path.join(__dirname, '..', 'lib', 'main.js')

function output(env: NodeJS.ProcessEnv): string {
  return cp.execFileSync(np, [ip], {env}).toString()
}

test('test runs no input', () => {
  expect(() => {
    output(processEnv)
  }).toThrow()
})

test('test runs major release', () => {
  processEnv.INPUT_RELEASE = 'major'
  expect(output(processEnv)).toContain('::set-output name=version::1.0.0')
})

test('test runs minor release', () => {
  processEnv.INPUT_RELEASE = 'minor'
  expect(output(processEnv)).toContain('::set-output name=version::0.2.0')
})

test('test runs patch release', () => {
  processEnv.INPUT_RELEASE = 'patch'
  expect(output(processEnv)).toContain('::set-output name=version::0.1.1')
})

test('test runs premajor', () => {
  processEnv.INPUT_RELEASE = 'premajor'
  processEnv.INPUT_IDENTIFIER = 'rc'
  expect(output(processEnv)).toContain('::set-output name=version::1.0.0-rc.0')
})

test('test runs preminor', () => {
  processEnv.INPUT_RELEASE = 'preminor'
  processEnv.INPUT_IDENTIFIER = 'rc'
  expect(output(processEnv)).toContain('::set-output name=version::0.2.0-rc.0')
})

test('test runs prepatch', () => {
  processEnv.INPUT_RELEASE = 'prepatch'
  processEnv.INPUT_IDENTIFIER = 'rc'
  expect(output(processEnv)).toContain('::set-output name=version::0.1.1-rc.0')
})

test('test runs prerelease', () => {
  processEnv.INPUT_VERSION = '0.1.1-rc.0'
  processEnv.INPUT_RELEASE = 'prerelease'
  processEnv.INPUT_IDENTIFIER = 'rc'
  expect(output(processEnv)).toContain('::set-output name=version::0.1.1-rc.1')
})
