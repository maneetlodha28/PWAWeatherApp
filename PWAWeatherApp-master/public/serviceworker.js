const CACHE_NAME= 'version-1';
const urlsToCache = ['index.html', 'offline.html'];

//as self is resctriced keywod so need to assign to this, which refer to the service worker file
const self=this;

// event to install cache

self.addEventListener('install', (event)=>{

    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache)=>{
            console.log("cache open")

            return cache.addAll(urlsToCache)
        })
    )
})

self.addEventListener('fetch', (event)=>{
    event.respondWith(
        caches.match(event.request)
        .then(()=>{
            return fetch(event.request)
            .catch(()=>caches.match('offline.html'))
        })
    )
})

//activate the SW
self.addEventListener('activate',(event)=>{
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames)=>Promise.all(
            cacheNames.map((cacheName)=>{
            if(!cacheWhitelist.includes(cacheNames)){
                return caches.delete(cacheName)
            }
        })))
    )
})