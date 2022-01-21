const path = require('path')
const DefineAfterBundleWebpackPlugin = require('../build')

module.exports = {
    entry: path.resolve(__dirname, 'index.js'),
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'build')
    },
    plugins: [
        new DefineAfterBundleWebpackPlugin({
            'process.env.TEST': JSON.stringify('New Value'),
        }),
    ],
    target: 'node',
    mode: 'development',
    devtool: false,
}
