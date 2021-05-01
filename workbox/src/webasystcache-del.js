async function delWebasystCacheSW() {
    const cacheNames = await caches.keys();
    cacheNames.forEach(cacheName => {
        if (/webasystcache/gi.test(cacheName)) {
            caches.delete(cacheName);
        }
    })
}

// Call delWebasystCacheSW whenever you'd like. E.g. to add to cache after a page load:
window.addEventListener('load', () => {
    // ...determine the list of related URLs for the current page...
    delWebasystCacheSW();
});