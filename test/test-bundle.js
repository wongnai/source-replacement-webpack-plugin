const fs = require('fs')
const path = require('path')

const rootPath = process.cwd()
const buildScriptPath = path.join('build', 'index.js')
const testPath = path.join(rootPath, 'test')
const outputScriptPath = path.join(testPath, buildScriptPath)

const outputText = fs.readFileSync(outputScriptPath).toString()

if (!outputText.includes('"New Value"')) {
    throw new Error('No replacement found in build')
}

console.log('This plugin is fine to be used.')
