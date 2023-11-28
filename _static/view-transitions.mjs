// @ts-check

function enableViewTransitionRouter() {
	if (!window.navigation) return;

	window.navigation?.addEventListener('navigate', (event) => {
		// Exit early if this navigation shouldn't be intercepted,
		// e.g. if the navigation is cross-origin, or a download request
		if (shouldNotIntercept(event)) return;
		cacheMap.set(window.location.href, { document });

		const url = new URL(event.destination.url);
		const parser = new DOMParser();

		event.intercept({
			async handler() {
				const cache = cacheMap.get(event.destination.url);
				event.signal.throwIfAborted();
				event.signal.addEventListener('abort', () => {
					console.log('aborted');
				});
				if (cache) transitionToPage(cache.document);
				fetch(url)
					.then((res) => res.text())
					.then((html) => {
						const new_document = parser.parseFromString(html, 'text/html');
						if (cache?.document.body.innerHTML !== new_document.body.innerHTML) {
							cacheMap.set(event.destination.url, { document: new_document });
							transitionToPage(new_document);
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

/** @param {Document} new_document */
function transitionToPage(new_document) {
  document.title = new_document.title
	if (new_document.body.innerHTML === document.body.innerHTML) return;
	startViewTransition(() => {
		document.body.replaceWith(new_document.body);
	});
}

/**
 * @typedef PageCache
 * @type {object}
 * @prop {Document} document
 */
/** @type {Map<string, PageCache>} */
const cacheMap = new Map();

window.addEventListener('load', () => {
	enableViewTransitionRouter();
});
