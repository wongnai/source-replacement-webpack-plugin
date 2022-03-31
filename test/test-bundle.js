const fs = require('fs')
const path = require('path')

const BUNDLE_FILE_NAME = 'bundle.js'

const SOURCE_REPLACEMENT_FILE_NAME = 'index.js'

const rootPath = process.cwd()
const testPath = path.join(rootPath, 'test')
const buildPath = path.join(testPath, 'build')

const htmlPath = path.join(testPath, 'build', 'index.html')
const htmlSource = fs.readFileSync(htmlPath, { encoding: 'utf8' })

function testBundlePreventExecuteSourceWithExistingSource() {
    const outputScriptPath = path.join(buildPath, BUNDLE_FILE_NAME)

    const outputText = fs.readFileSync(outputScriptPath, { encoding: 'utf8' })

    const SOURCE_CONTENT = './test/index.js'
    
    if (!outputText.includes(SOURCE_CONTENT)) {
        throw new Error('No input source found in build')
    }

    const PREVENT_RENDER_CONTENT = 'preventPerformExistingScriptDuringInjection()'
    
    if (!outputText.includes(PREVENT_RENDER_CONTENT)) {
        throw new Error('No prevent render source found in build')
    }

    if (outputText.indexOf(PREVENT_RENDER_CONTENT) > outputText.indexOf(SOURCE_CONTENT)) {
        throw new Error('Invalid source order')
    }

    if (!htmlSource.includes(BUNDLE_FILE_NAME)) {
        throw new Error('No bundle source found in output')
    }
}

function testInjectSourceReplacementScript() {
    const sourceReplacementPath = path.join(buildPath, SOURCE_REPLACEMENT_FILE_NAME)

    const originalFilePath = path.join(rootPath, 'node_modules', 'source-replacement', 'build', 'index.js')

    const sourceContent = fs.readFileSync(sourceReplacementPath, { encoding: 'utf8' })

    const sourceOrigin = fs.readFileSync(originalFilePath, { encoding: 'utf8' })

    if (!sourceContent.includes(sourceOrigin)) {
        throw new Error('Unmatched source replacement source')
    }

    if (!htmlSource.includes(`<script src="${SOURCE_REPLACEMENT_FILE_NAME}" type="module" async></script>`)) {
        throw new Error('No bundle source found in output')
    }
}

testBundlePreventExecuteSourceWithExistingSource()

testInjectSourceReplacementScript()

console.log('Test Passed')