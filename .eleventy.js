// @ts-check
const pluginWebc = require('@11ty/eleventy-plugin-webc');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports =
	/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
	function (eleventyConfig) {
		eleventyConfig.addPassthroughCopy('_static/**/*');
		eleventyConfig.addPlugin(pluginWebc, {
			components: '_includes/components/**/*.webc',
		});
		eleventyConfig.addPlugin(syntaxHighlight);
		return {
			dir: {
				input: 'content',
				output: '_site',
				includes: '../_includes',
				layouts: '../_includes/layouts',
				data: '../_data',
			},
		};
	};
