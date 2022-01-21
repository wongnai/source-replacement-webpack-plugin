# Define After Bundle Webpack Plugin

[![semantic-release](https://img.shields.io/badge/semantic-release-e10079.svg?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
![ts](https://badgen.net/badge/Built%20With/TypeScript/blue) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Webpack Plugin with the same concept as [DefinePlugin](https://webpack.js.org/plugins/define-plugin/), but apply after bundle.

## Installation

```
yarn add --dev define-after-bundle-webpack-plugin
```

### Usage

#### In your webpack config

```js
const DefineAfterBundleWebpackPlugin = require('define-after-bundle-webpack-plugin')

module.exports = {
    ...
    plugins: [
        ...,
        new DefineAfterBundleWebpackPlugin({
            '<Value to be replaced>': '<Value to replace>',
        })
    ]
}
```
