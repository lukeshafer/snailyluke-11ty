customElements.define(
	'snippet-list',
	class SnippetList extends HTMLElement {
		connectedCallback() {
			this.addEventListener('snippetclick', (e) => {
				const snippetPreview = this.querySelector('[data-preview-content]');
				if (!snippetPreview) throw new Error('Snippet Preview Container not found.');

				this.setAttribute('data-active', e.detail.key);
				snippetPreview.replaceChildren(e.detail.node);

				const copy_button = this.querySelector('copy-button');
				copy_button?.setAttribute('content', snippetPreview.textContent ?? '');

				const url = new URL(window.location.href);
				url.pathname = e.detail.href;
				window.history.replaceState({}, '', url.toString());
			});
		}
	}
);
