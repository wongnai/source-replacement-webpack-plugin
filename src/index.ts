import Webpack from 'webpack'
import { ConcatSource } from 'webpack-sources'

const PLUGIN_NAME = 'DefineAfterBundleWebpackPlugin'

class DefineAfterBundleWebpackPlugin {
	replaceMapper: Record<string, any>

	constructor(replaceMapper: Record<string, any>) {
		this.replaceMapper = replaceMapper
	}

	apply(compiler: Webpack.Compiler) {
		compiler.hooks.compilation.tap(PLUGIN_NAME, compilation => {
			compilation.hooks.afterOptimizeChunkAssets.tap(PLUGIN_NAME, chunks => {
				for (const chunk of chunks) {
					if (!chunk.files) {
						continue
					}

					for (const file of chunk.files) {
						compilation.updateAsset(file, old => {
							const source = new ConcatSource(old).source()

							return new ConcatSource(
								Object.keys(this.replaceMapper).reduce(
									(updatedSource, toBeReplacedValue) =>
										updatedSource.replace(
											new RegExp(toBeReplacedValue, 'g'),
											this.replaceMapper[toBeReplacedValue],
										),
									source,
								),
							)
						})
					}
				}
			})
		})
	}
}

module.exports = DefineAfterBundleWebpackPlugin
