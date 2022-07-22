# Source Replacement Webpack Plugin

[![semantic-release](https://img.shields.io/badge/semantic-release-e10079.svg?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
![ts](https://badgen.net/badge/Built%20With/TypeScript/blue) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Webpack Plugin to bundle [source-replacement](https://github.com/wongnai/source-replacement) script to your app.

**_ Beware yourself, don't use this in production build _**

## Installation

```
yarn add --dev source-replacement-webpack-plugin
```

### Usage

#### In your webpack config

```js
const { SourceReplacementPlugin } = require('source-replacement-webpack-plugin')

module.exports = {
    ...
    plugins: [
        ...,
        new SourceReplacementPlugin()
    ]
}
```

custom entry name

```js
const { SourceReplacementPlugin } = require('source-replacement-webpack-plugin')

module.exports = {
    ...
    plugins: [
        ...,
        new SourceReplacementPlugin('main') // default is 'client'
    ]
}
```

#### On your browser

Enter page with the following example

```
https://example.com/#replacementTarget=https://your-target-js-source-url
```
