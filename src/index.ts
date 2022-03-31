import Webpack from 'webpack'
import AddAssetHtmlWebpackPlugin from 'add-asset-html-webpack-plugin'
import InjectPlugin, { ENTRY_ORDER } from 'webpack-inject-plugin'
import fs from 'fs'
import path from 'path'

const CODE_BLOCKER_SRC = path.resolve(
	process.cwd(),
	'node_modules',
	'source-replacement',
	'build',
	'code-blocker.js',
)

export class SourceReplacementPlugin {
	apply(complier: Webpack.Compiler) {
		new AddAssetHtmlWebpackPlugin({
			filepath: require.resolve('source-replacement'),
			attributes: {
				type: 'module',
				async: true,
			},
		}).apply(complier)

		new InjectPlugin(() => fs.readFileSync(CODE_BLOCKER_SRC, { encoding: 'utf8' }), {
			entryOrder: ENTRY_ORDER.First,
		}).apply(complier)
	}
}
