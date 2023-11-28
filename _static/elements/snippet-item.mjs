customElements.define(
  'snippet-item',
  class SnippetItem extends HTMLElement {
    connectedCallback() {
      const anchor = this.querySelector('a');
      const codeTemplate = this.querySelector('template[data-name="code-template"]');

      if (!(codeTemplate instanceof HTMLTemplateElement)) return;

      anchor?.addEventListener('click', (e) => {
        e.preventDefault();

        const href = anchor.getAttribute('href') || '';
        this.dispatchEvent(
          new CustomEvent('snippetclick', {
            detail: {
              label: this.getAttribute('label'),
              key: this.getAttribute('key') || '',
              href: href.replaceAll('?no-router', ''),
              node: codeTemplate.content.cloneNode(true),
            },
            bubbles: true,
          })
        );
      });
    }
  }
);
