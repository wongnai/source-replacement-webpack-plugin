import InjectEntryPlugin from 'webpack-inject-entry-plugin'
import Webpack from 'webpack'
import AddAssetHtmlWebpackPlugin from 'add-asset-html-webpack-plugin'
import path from 'path'

const CODE_BLOCKER_SRC = path.resolve(
	process.cwd(),
	'node_modules',
	'source-replacement',
	'build',
	'code-blocker.js',
)

export class SourceReplacementPlugin {
	apply(compiler: Webpack.Compiler) {
		new AddAssetHtmlWebpackPlugin({
			filepath: require.resolve('source-replacement'),
			attributes: {
				type: 'module',
				async: true,
			},
		}).apply(compiler)

		new InjectEntryPlugin({ entry: 'main', filepath: CODE_BLOCKER_SRC }).apply(compiler)
	}
}
