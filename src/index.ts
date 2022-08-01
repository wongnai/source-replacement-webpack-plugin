import Webpack from 'webpack'
import { BundleMoreWebpackPlugin } from 'bundle-more-webpack-plugin'

const DEFAULT_ENTRY_NAME = 'client'
export class SourceReplacementPlugin {
	private readonly entryName: string

	constructor(entryName = DEFAULT_ENTRY_NAME) {
		this.entryName = entryName
	}

	apply(compiler: Webpack.Compiler) {
		const sourceReplacementEntry = [
			require.resolve('source-replacement'),
			require.resolve('source-replacement/build/code-blocker.js'),
		]

		new BundleMoreWebpackPlugin(sourceReplacementEntry, this.entryName).apply(compiler)
	}
}
