const cacheName = "shell-content-v10"
const filesToCache = [
    '/',
    '/style.css',
    '/logo192.png',
    '/script.js',
    '/index.html',
    '/offline.html'
];

//install service worker
self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open(cacheName)
                  .then( cache => {
                      console.log('Caching app shell')
                      return  cache.addAll(filesToCache)
                  })
    )
    console.log('service worker has been installed');
});

self.addEventListener('activate', evt => {
    console.log('the service worker was activated');
    evt.waitUntil(
         caches.keys( )
                   .then(cacheNames => {
                       console.log(cacheNames)
                       return Promise.all(
                           cacheNames.filter(oldCache => cacheName !== oldCache)
                                .map(cacheName => caches.delete(cacheName))
                       )
                   } )
    )
});

//cahe-first... 
self.addEventListener('fetch', evt => {
    evt.respondWith(caches.match(evt.request)
    .then( response => {
               return response ||  fetch(evt.request)
       })
       .catch((err) =>  caches.match('offline.html'))
    )
});