---
layout: null
---

`use strict`;

const
    version = '{{site.time}}',
    CACHE = '{{site.title}}' + "'s blog " + version,
    offlineURL = '/offline/index.html',
    // installFilesEssential = [],
    installFilesEssential = [
        '/',
        '/assets/css/about.css',
        '/assets/css/animate.css',
        '/assets/css/categories.css',
        '/assets/css/contact.css',
        '/assets/css/content.css',
        '/assets/css/index.css',
        '/assets/css/main.css',
        '/assets/css/morphext.css',
        '/assets/css/page.css',
        '/assets/css/post.css',
        '/assets/css/projects.css',
        '/assets/css/style.css',
        '/assets/css/syntax.css',
        '/assets/css/tags.css',
        '/assets/js/about.js',
        '/assets/js/main.js',
        '/assets/js/morphext.min.js',
        '/assets/js/post.js',
        '/assets/js/projects.js',
        '/assets/res/manifest.json',
        '/assets/res/user.png',
        '/assets/res/user-256x256.png',
        '/assets/res/favicon.ico',
        '/assets/res/logo.png'
    ].concat(offlineURL),
    installFilesDesirable = [];

// install static assets
function installStaticFiles() {
    return caches.open(CACHE)
        .then(cache => {
            // cache desirable files
            cache.addAll(installFilesDesirable);
            // cache essential files
            installFilesEssential.forEach(value => {
                try {
                    cache.add(value);
                } catch (e) {
                    console.log("cache error " + value);
                }
            });
            // return cache.addAll(installFilesEssential);
        });
}

// clear old caches
function clearOldCaches() {
    return caches.keys()
        .then(keylist => {
            return Promise.all(
                keylist
                    .filter(key => key !== CACHE)
                    .map(key => caches.delete(key))
            );
        });
}

// application installation
self.addEventListener('install', event => {
    console.log('service worker: install');
    // cache core files
    event.waitUntil(
        installStaticFiles()
            .then(() => self.skipWaiting())
    );
});

// application activated
self.addEventListener('activate', event => {
    console.log('service worker: activate');
    // delete old caches
    event.waitUntil(
        clearOldCaches()
            .then(() => self.clients.claim())
    );
});

// is image URL?
let iExt = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp'].map(f => '.' + f);

function isImage(url) {
    return iExt.reduce((ret, ext) => ret || url.endsWith(ext), false);
}

// return offline asset
function offlineAsset(url) {
    if (isImage(url)) {
        // return image
        return new Response(
            '<svg role="img" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><title>offline</title><path d="M0 0h400v300H0z" fill="#eee" /><text x="200" y="150" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-size="50" fill="#ccc">offline</text></svg>',
            {
                headers: {
                    'Content-Type': 'image/svg+xml',
                    'Cache-Control': 'no-store'
                }
            }
        );
    } else {
        // return page
        return caches.match(offlineURL);
    }

}

// application fetch network data
self.addEventListener('fetch', event => {
    // abandon non-GET requests
    if (event.request.method !== 'GET') return;
    let url = event.request.url;
    event.respondWith(
        caches.open(CACHE)
            .then(cache => {
                return cache.match(event.request)
                    .then(response => {
                        if (response) {
                            // return cached file
                            console.log('cache fetch: ' + url);
                            return response;
                        }
                        // make network request
                        return fetch(event.request)
                            .then(newreq => {
                                console.log('network fetch: ' + url);
                                if (newreq.ok) cache.put(event.request, newreq.clone());
                                return newreq;
                            })
                            // app is offline
                            .catch(() => offlineAsset(url));
                    });
            })
    );
});