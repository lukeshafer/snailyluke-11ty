const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

// @ts-check
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./content/**/*.{html,js,webc,md}',
		'./_includes/**/*.{html,js,webc,md}',
		'./_data/**/*.{html,js,webc,md}',
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Poppins', ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [
		//plugin(({ matchUtilities }) => {
			//matchUtilities({
				//'view-id': (value) => ({
					//viewTransitionName: value,
				//}),
			//});
		//}),
		require('tailwind-scrollbar'),
		require('@tailwindcss/typography'),
	],
};
