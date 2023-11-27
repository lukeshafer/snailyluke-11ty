// @ts-check
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./content/**/*.{html,js,webc}',
		'./_includes/**/*.{html,js,webc}',
		'./_data/**/*.{html,js,webc}',
	],
	theme: {
		extend: {},
	},
	plugins: [require('tailwind-scrollbar'), require('@tailwindcss/typography')],
};
