// @ts-check

function enableViewTransitionRouter() {
  if (!window.navigation) return;

  window.navigation?.addEventListener('navigate', (event) => {
    // Exit early if this navigation shouldn't be intercepted,
    // e.g. if the navigation is cross-origin, or a download request
    if (shouldNotIntercept(event)) return;
    cacheMap.set(window.location.href, document.body.innerHTML);

    const url = new URL(event.destination.url);
    const parser = new DOMParser();

    event.intercept({
      async handler() {
        const cache = cacheMap.get(event.destination.url);
        event.signal.throwIfAborted();
        event.signal.addEventListener('abort', () => {
          console.log('aborted');
        });
        if (cache) transitionToView(cache);
        fetch(url)
          .then((res) => res.text())
          .then((html) => {
            const new_document = parser.parseFromString(html, 'text/html');
            const new_html = new_document.body.innerHTML;
            if (cache !== new_html) {
              cacheMap.set(event.destination.url, new_html);
              transitionToView(new_document.body.innerHTML);
            }
          });
      },
    });
  });
}

/** @param {NavigateEvent} navigationEvent */
function shouldNotIntercept(navigationEvent) {
  return (
    !navigationEvent.canIntercept ||
    // If this is just a hashChange,
    // just let the browser handle scrolling to the content.
    navigationEvent.hashChange ||
    // If this is a download,
    // let the browser perform the download.
    navigationEvent.downloadRequest ||
    // If this is a form submission,
    // let that go to the server.
    navigationEvent.formData ||
    (navigationEvent.navigationType === 'replace' && !navigationEvent.userInitiated)
  );
}

/** @param {() => void} cb */
function startViewTransition(cb) {
  if (!document.startViewTransition) {
    return cb();
  }

  return document.startViewTransition(cb);
}

/** @param {string} new_html */
function transitionToView(new_html) {
  if (document.body.innerHTML === new_html) return;
  startViewTransition(() => {
    document.body.innerHTML = new_html;
  });
}

/** @type {Map<string, string>} */
const cacheMap = new Map();

window.addEventListener('load', () => {
  enableViewTransitionRouter();
});
