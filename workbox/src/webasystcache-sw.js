import { registerRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate, NetworkFirst} from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';

    var actualCacheNames = {
        cacheNamefontsStyle: 'webasystcache-fonts-webfonts',
        cacheNamefontsWeb: 'webasystcache-fonts-webfonts',
        cacheNameImages: 'webasystcache-images',
        cacheNameStyleJs: 'webasystcache-style-js',
        cacheNamePages: 'webasystcache-pages'
    }

    // Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
    registerRoute(
        ({ url }) => url.origin === 'https://fonts.googleapis.com',
        new StaleWhileRevalidate({
            cacheName: actualCacheNames.cacheNamefontsStyle,
        })
    );

    // Cache the underlying font files with a cache-first strategy for 1 year.
    registerRoute(
        ({ url }) => url.origin === 'https://fonts.gstatic.com',
        new CacheFirst({
            cacheName: actualCacheNames.cacheNamefontsWeb,
            plugins: [
                new CacheableResponsePlugin({
                    statuses: [200],
                }),
                new ExpirationPlugin({
                    maxAgeSeconds: 60 * 60 * 24 * 365,
                    maxEntries: 30,
                    purgeOnQuotaError: true, // Automatically cleanup if quota is exceeded.
                }),
            ],
        })
    );

    // Image 
    registerRoute(
        ({ request }) => request.destination === 'image',
        new CacheFirst({
            cacheName: actualCacheNames.cacheNameImages,
            plugins: [
                new CacheableResponsePlugin({
                    statuses: [200],
                }),
                new ExpirationPlugin({
                    maxEntries: 60,
                    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                    purgeOnQuotaError: true, // Automatically cleanup if quota is exceeded.
                }),
            ],
        })
    );

    // CSS and JS
    registerRoute(
        ({ request }) => request.destination === 'script' ||
            request.destination === 'style',
        new CacheFirst({
            cacheName: actualCacheNames.cacheNameStyleJs,
            plugins: [
                new CacheableResponsePlugin({
                    statuses: [200],
                }),
                new ExpirationPlugin({
                    maxEntries: 40,
                    maxAgeSeconds: 60 * 60 * 24 * 365,
                    purgeOnQuotaError: true, // Automatically cleanup if quota is exceeded.
                }),
            ],
        })
    );

    // Cache page navigations (html) with a cache First strategy
    registerRoute(
        // Check to see if the request is a navigation to a new page
        ({ request, url }) => request.mode === 'navigate' && !/(order|webasyst)\//.test(url.pathname),
        // Use a Network First caching strategy
        new NetworkFirst({
            // Put all cached files in a cache named 'pages'
            cacheName: actualCacheNames.cacheNamePages,
            fetchOptions: {
                credentials: 'include',
            },
            plugins: [
                // Ensure that only requests that result in a 200 status are cached
                new CacheableResponsePlugin({
                    statuses: [200],
                }),
                new ExpirationPlugin({
                    maxEntries: 500,
                    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                    purgeOnQuotaError: true, // Automatically cleanup if quota is exceeded.
                }),
            ],
        }),
    );


