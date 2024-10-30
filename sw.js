let cacheName = 'cache-29-10-2024';
let siteURL = 'https://gocemitevski.github.io/bonton-za-planinari'
let resourcesToCache = [
    siteURL + '/',
    siteURL + '/index.html',
    siteURL + '/favicon.ico',
    siteURL + "/css/style.css",
    siteURL + "/fonts/Montserrat/montserrat-cyrillic-ext-wght-normal.woff2",
    siteURL + "/fonts/Montserrat/montserrat-cyrillic-wght-normal.woff2",
    siteURL + "/fonts/Montserrat/montserrat-latin-ext-wght-normal.woff2",
    siteURL + "/fonts/Montserrat/montserrat-latin-wght-normal.woff2",
    siteURL + "/fonts/bootstrap-icons.woff",
    siteURL + "/fonts/bootstrap-icons.woff2",
    siteURL + "/img/BontonZaPlaninari-Favicon.png",
    siteURL + "/img/BontonZaPlaninari-Gjubre.svg",
    siteURL + "/img/BontonZaPlaninari-Grupa.svg",
    siteURL + "/img/BontonZaPlaninari-Mileniche.svg",
    siteURL + "/img/BontonZaPlaninari-Nuzhda.svg",
    siteURL + "/img/BontonZaPlaninari-Pateka.svg",
    siteURL + "/img/BontonZaPlaninari-Pauza.svg",
    siteURL + "/img/BontonZaPlaninari-Prednost.svg",
    siteURL + "/img/BontonZaPlaninari-Priroda.svg",
    siteURL + "/img/BontonZaPlaninari-Promo.png",
    siteURL + "/img/BontonZaPlaninari-Suvenir.svg",
    siteURL + "/img/BontonZaPlaninari-Zhivotno.svg",
];

self.addEventListener('install', function (event) {
    console.log('Service Worker - Install event!');
    event.waitUntil(
        caches.open(cacheName)
            .then(function (cache) {
                return cache.addAll(resourcesToCache);
            })
    )
})

self.addEventListener('activate', function (event) {
    console.log('Service Worker - Activate event!');

    event.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (cacheName.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            })
            )
        })
    )
})

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Cache hit - return response
            if (response) {
                return response;
            }

            return fetch(event.request).then(
                function (response) {
                    // Check if we received a valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // IMPORTANT: Clone the response. A response is a stream
                    // and because we want the browser to consume the response
                    // as well as the cache consuming the response, we need
                    // to clone it so we have two streams.
                    var responseToCache = response.clone();

                    caches.open(cacheName)
                        .then(function (cache) {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                }
            );
        })
    );
});
