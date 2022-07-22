import path from 'path'
import { Compiler, EntryNormalized } from 'webpack'

const FAKE_LOADER_entryName = path.resolve(process.cwd(), 'src/webpack-inject-plugin.loader')

export type Loader = () => string

export const registry: {
	[key: string]: Loader
} = {}

let uniqueIDCounter = 0
function getUniqueID() {
	const id = (++uniqueIDCounter).toString(16)

	return `webpack-inject-module-${id}`
}

export enum ENTRY_ORDER {
	First = 1,
	Last,
	NotLast,
}

export interface IInjectOptions {
	entryName?: string
	entryOrder?: ENTRY_ORDER
	loaderID?: string
}

function injectToArray(
	originalEntry: string[],
	newEntry: string,
	entryOrder = ENTRY_ORDER.NotLast,
): string[] {
	if (entryOrder === ENTRY_ORDER.First) {
		return [newEntry, ...originalEntry]
	}

	if (entryOrder === ENTRY_ORDER.Last) {
		return [...originalEntry, newEntry]
	}

	return [
		...originalEntry.splice(0, originalEntry.length - 1),
		newEntry,
		...originalEntry.splice(originalEntry.length - 1),
	]
}

export function injectEntry(
	originalEntry: EntryNormalized | undefined,
	newEntry: string,
	options: IInjectOptions,
): EntryNormalized {
	const entry: any = originalEntry

	if (entry[options.entryName].import === undefined) {
		return {
			[options.entryName]: {
				import: [newEntry],
			},
		}
	}

	return {
		[options.entryName]: {
			import: injectToArray(entry[options.entryName].import, newEntry, options.entryOrder),
		},
	}
}

export default class WebpackInjectPlugin {
	private readonly options: IInjectOptions

	private readonly loader: Loader

	constructor(loader: Loader, options?: IInjectOptions) {
		this.loader = loader
		this.options = {
			entryName: (options && options.entryName) || 'main',
			entryOrder: (options && options.entryOrder) || ENTRY_ORDER.NotLast,
			loaderID: (options && options.loaderID) || getUniqueID(),
		}
	}

	apply(compiler: Compiler) {
		const id = this.options.loaderID!
		const newEntry = path.resolve(__dirname, `${FAKE_LOADER_entryName}?id=${id}!`)

		registry[id] = this.loader

		compiler.options.entry = injectEntry(compiler.options.entry, newEntry, this.options)
	}
}
