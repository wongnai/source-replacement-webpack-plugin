import Webpack from 'webpack'
import AddAssetHtmlWebpackPlugin from 'add-asset-html-webpack-plugin'
import path from 'path'
import { Compiler } from 'webpack'

const CODE_BLOCKER_SRC = path.resolve(
	process.cwd(),
	'node_modules',
	'source-replacement',
	'build',
	'code-blocker.js',
)

const DEFAULT_ENTRY_NAME = 'client'

function injectEntry(
	options: Compiler['options'],
	entryName: string,
	injectFilepath: string,
): void {
	const entry: any =
		typeof options.entry === 'function' ? options.entry() : Promise.resolve(options.entry)

	options.entry = () =>
		entry.then((e: any) => {
			const injectEntry: typeof e[string] = e[entryName] || {}

			if (!injectEntry.import) {
				throw new Error(
					`Could not find an entry named '${entryName}'. See https://webpack.js.org/concepts/entry-points/ for an overview of webpack entries.`,
				)
			}

			if (!injectEntry.import.includes(injectFilepath)) {
				injectEntry.import.unshift(injectFilepath)
			}
			return e
		})
}

export class SourceReplacementPlugin {
	private readonly entryName: string

	constructor(entryName = DEFAULT_ENTRY_NAME) {
		this.entryName = entryName
	}

	apply(compiler: Webpack.Compiler) {
		new AddAssetHtmlWebpackPlugin({
			filepath: require.resolve('source-replacement'),
			attributes: {
				type: 'module',
				async: true,
			},
		}).apply(compiler)

		injectEntry(compiler.options, this.entryName, CODE_BLOCKER_SRC)
	}
}
