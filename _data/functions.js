module.exports = {
	/**
	 * Tagged template to get editor syntax highlighting on HTML strings in JS
	 * Does not perform any sort of escaping or sanitation
	 * @example const str = html`<h1>This is html</h1>`
	 * @param {TemplateStringsArray} strings
	 * @param {unknown[]} replacements
	 **/
	html(strings, ...replacements) {
		return String.raw(strings, ...replacements);
	},
};
