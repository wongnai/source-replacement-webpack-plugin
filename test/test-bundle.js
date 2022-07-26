const fs = require('fs')
const path = require('path')

const BUNDLE_FILE_NAME = 'bundle.js'

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

	PREVENT_RENDER_CONTENT = 'preventPerformExistingScriptDuringInjection()'

	const REQUIRE_SOURCE_REPLACEMENT =
		'__webpack_require__("./node_modules/source-replacement/build/index.js")'

	const REQUIRE_CODE_BLOCKER =
		'__webpack_require__("./node_modules/source-replacement/build/code-blocker.js")'

	const REQUIRE_MAIN_SCRIPT = '__webpack_require__("./test/index.js")'

	if (!outputText.includes(PREVENT_RENDER_CONTENT)) {
		throw new Error('No prevent render source found in build')
	}

	if (
		outputText.indexOf(PREVENT_RENDER_CONTENT) > outputText.indexOf(SOURCE_CONTENT) &&
		outputText.indexOf(SOURCE_CONTENT) > outputText.indexOf(REQUIRE_MAIN_SCRIPT)
	) {
		throw new Error('Invalid source order')
	}

	if (!htmlSource.includes(BUNDLE_FILE_NAME)) {
		throw new Error('No bundle source found in output')
	}
}

function testInjectSourceReplacementScript() {
	const sourceReplacementPath = path.join(buildPath, BUNDLE_FILE_NAME)

	const sourceContent = fs.readFileSync(sourceReplacementPath, { encoding: 'utf8' })

	const FIRST_FUNCTION_REPLACEMENT_SCRIPT = 'getAugmentedNamespace(n)'

	if (!sourceContent.includes(FIRST_FUNCTION_REPLACEMENT_SCRIPT)) {
		throw new Error('Unmatched source replacement source')
	}
}

testBundlePreventExecuteSourceWithExistingSource()

testInjectSourceReplacementScript()

console.log('Test Passed')
