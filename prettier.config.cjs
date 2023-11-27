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
	useTabs: true,
	singleQuote: true,
	trailingComma: 'es5',
	tabWidth: 3,
	printWidth: 100,
	bracketSameLine: true,
	plugins: ['prettier-plugin-tailwindcss'],
};
