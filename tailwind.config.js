const defaultTheme = require('tailwindcss/defaultTheme');

// @ts-check
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
    './_site/**/*.{html,js,webc,md}',
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
