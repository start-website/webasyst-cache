window.addEventListener('load', async () => {
    if (navigator.serviceWorker) {
        try {
            const url = window.location.href;
            const scope = new URL(url);
            const reg = await navigator.serviceWorker.register(scope.origin + '/webasystcache-sw.js', {scope: scope.origin})
            console.log(reg)

            function getCookie(name) {
                let matches = document.cookie.match(new RegExp(
                  "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
                ));
                return matches ? decodeURIComponent(matches[1]) : undefined;
            }

            async function delWebasystCacheSW() {
                const cacheNames = await caches.keys();
                cacheNames.forEach(cacheName => {
                    if (/webasystcache/gi.test(cacheName)) {
                        caches.delete(cacheName);
                    }
                })
            }
            
            if (getCookie('webasystcache') == 'delete') {
                delWebasystCacheSW();
                document.cookie = "webasystcache=actual";
            }
            
        } catch (err) {
            console.log(err)
        }
   } else {
       console.log('Enable Service Workers support in your browser')
   }
})


