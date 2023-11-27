/** @type {import("prettier").Config} */
module.exports = {
	overrides: [
		{
			files: '*.webc',
			options: {
				parser: 'html',
			},
		},
	],
	pluginSearchDirs: false,
	useTabs: true,
	singleQuote: true,
	trailingComma: 'es5',
	tabWidth: 4,
	printWidth: 100,
	bracketSameLine: true,
	plugins: ['prettier-plugin-tailwindcss'],
};
