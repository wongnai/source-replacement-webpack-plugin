import path from 'path'
import { BundleMoreWebpackPlugin } from 'bundle-more-webpack-plugin'

const MODULE_NAME = path.resolve(process.cwd(), 'node_modules', 'source-replacement', 'build', 'index.js') 
export class SourceReplacementPlugin extends BundleMoreWebpackPlugin {
    constructor() {
        super([
            MODULE_NAME,
        ])
    }
}
