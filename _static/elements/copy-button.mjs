customElements.define(
	'copy-button',
	class CopyButton extends HTMLElement {
		connectedCallback() {
			const button = this.querySelector('button');
			/** @type {number | null} */
			let timeout = null;

			button?.addEventListener('click', () => {
				if (timeout) clearTimeout(timeout);

				const content = this.getAttribute('content');
				const orig_btn_text = button.textContent;
				if (!content) {
					button.textContent = 'Nothing to copy';
					button.classList.add('text-red-400');
					timeout = setTimeout(() => {
						button.textContent = orig_btn_text;
						button.classList.remove('text-red-400');
					}, 1000);
					return;
				}

				navigator.clipboard.writeText(content);
				button.classList.add('text-green-400');
				button.textContent = 'Copied';
				timeout = setTimeout(() => {
					button.classList.remove('text-green-400');
					button.textContent = orig_btn_text;
				}, 1000);
			});
		}
	}
);
