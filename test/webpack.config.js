const path = require('path')
const { SourceReplacementPlugin } = require('../build')

module.exports = {
    entry: path.resolve(__dirname, 'index.js'),
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'build')
    },
    plugins: [
        new SourceReplacementPlugin(),
    ],
    target: 'node',
    mode: 'development',
    devtool: false,
}
