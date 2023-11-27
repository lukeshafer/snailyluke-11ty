---
name: prettier.config.cjs
layout: snippet-layout
tags: snippets
---

```js
/** @type {import("@types/prettier").Config} */
module.exports = {
	pluginSearchDirs: false,
	useTabs: true,
	singleQuote: true,
	trailingComma: 'es5',
	tabWidth: 4,
	printWidth: 100,
	bracketSameLine: true,
};
```
