const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { SourceReplacementPlugin } = require('../build')

module.exports = {
	entry: path.resolve(__dirname, 'index.js'),
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'build'),
	},
	plugins: [new HTMLWebpackPlugin(), new SourceReplacementPlugin('main')],
	target: 'node',
	mode: 'development',
	devtool: false,
}
