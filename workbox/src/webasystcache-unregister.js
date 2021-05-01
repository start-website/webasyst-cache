window.addEventListener('load', async () => {
    if (window.navigator && navigator.serviceWorker) {
        const url = window.location.href;
        const scope = new URL(url);
        navigator.serviceWorker.getRegistrations(scope.origin)
            .then(function (registrations) {
                for (let registration of registrations) {
                    console.log(registration)
                    registration.unregister();
                }
            });
        
        async function delWebasystCacheSW() {
            const cacheNames = await caches.keys();
            cacheNames.forEach(cacheName => {
                if (/webasystcache/gi.test(cacheName)) {
                    caches.delete(cacheName);
                }
            })
        }
        delWebasystCacheSW();
    }
})



