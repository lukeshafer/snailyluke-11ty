customElements.define(
  'snippet-item',
  class SnippetItem extends HTMLElement {
    connectedCallback() {
      const anchor = this.querySelector('a');

      /** @type {HTMLTemplateElement | null} */
      const codeTemplate = this.querySelector('template[data-name="code-template"]');
      anchor?.addEventListener('click', (e) => {
        console.log('clicked');
        e.preventDefault();

        //e.stopPropagation();
        //this.dispatchEvent(
          //new CustomEvent('snippetclick', {
            //detail: {
              //label: this.getAttribute('label'),
              //href: anchor.getAttribute('href'),
              //node: codeTemplate?.content.cloneNode(true),
            //},
            //bubbles: true,
          //})
        //);
      });
    }
  }
);
