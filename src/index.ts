import Webpack from 'webpack'
import path from 'path'

const PLUGIN_NAME = 'SourceReplacementPlugin'

const MODULE_NAME = path.resolve(process.cwd(), 'node_modules', 'source-replacement', 'build', 'index.js') 

type Entry = string | string[]

class SourceReplacementPlugin {
    apply(compiler: Webpack.Compiler) {
        compiler.hooks.entryOption.tap({ name: PLUGIN_NAME }, this.entryModifierPlugins)
    }

    getEntryWithSourceReplacement = (entry: Entry | Record<string, Entry>) => {
        if (typeof entry === 'string') {
            return [MODULE_NAME, entry]
        } else if (Array.isArray(entry)) {
            entry.unshift(MODULE_NAME)
        } else if (typeof entry === 'object') {
            Object.keys(entry).forEach(key => {
                (entry as any)[key] = this.getEntryWithSourceReplacement(entry[key])
            })
        }

        return entry
    }

    entryModifierPlugins = (_: string, entry: Entry | Record<string, Entry>) => {
        entry = this.getEntryWithSourceReplacement(entry)
    }
}

module.exports = SourceReplacementPlugin
