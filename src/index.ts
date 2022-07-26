import Webpack from 'webpack'
import { Compiler } from 'webpack'

const DEFAULT_ENTRY_NAME = 'client'

function injectEntry(
	options: Compiler['options'],
	entryName: string,
	injectFilepath: string[],
): void {
	const entry: any =
		typeof options.entry === 'function' ? options.entry() : Promise.resolve(options.entry)

	options.entry = () =>
		entry.then((e: any) => {
			const injectEntry: typeof e[string] | undefined = e[entryName]

			if (!injectEntry?.import) {
				throw new Error(
					`Could not find an entry named '${entryName}'. See https://webpack.js.org/concepts/entry-points/ for an overview of webpack entries.`,
				)
			}

			injectEntry.import.unshift(...injectFilepath)

			return e
		})
}

export class SourceReplacementPlugin {
	private readonly entryName: string

	constructor(entryName = DEFAULT_ENTRY_NAME) {
		this.entryName = entryName
	}

	apply(compiler: Webpack.Compiler) {
		injectEntry(compiler.options, this.entryName, [
			require.resolve('source-replacement'),
			require.resolve('source-replacement/build/code-blocker.js'),
		])
	}
}
