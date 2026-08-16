// AI DOGE Service Worker — offline caching for council transparency data
//
// The cache name is derived from the build stamp that index.html appends to
// this script's registration URL (sw.js?v=<stamp>). sw.js itself is byte-
// identical every deploy, so without that query param the browser never sees
// an update, this worker is never replaced, and the cache-first branch below
// keeps serving assets from whichever deploy first installed it. The stamp
// changes per deploy, which registers a new worker, which evicts the old cache
// in activate. See scripts/build_stamp.mjs.
const BUILD_STAMP = new URL(self.location.href).searchParams.get('v') || 'dev'
const CACHE_PREFIX = 'aidoge-'
const CACHE_NAME = CACHE_PREFIX + BUILD_STAMP
const STATIC_ASSETS = [
  './',
  './index.html',
]

// Network-first for HTML (prevents stale index.html referencing dead JS chunks after deploy)
// Stale-while-revalidate for hashed assets (JS/CSS — hash in filename guarantees freshness)
// Network-first for data files (JSON — always try fresh data first)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          // Only our own caches: CacheStorage is per-origin and all 68 councils
          // share aidoge.co.uk, so never delete a key we did not create.
          .filter((k) => k.startsWith(CACHE_PREFIX) && k !== CACHE_NAME)
          .map((k) => caches.delete(k))
      )
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)

  // Skip non-GET requests and cross-origin
  if (event.request.method !== 'GET') return
  if (url.origin !== self.location.origin) return

  // Data files: network-first (always try fresh data)
  if (url.pathname.includes('/data/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clone = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone))
          return response
        })
        .catch(() => caches.match(event.request))
    )
    return
  }

  // HTML pages (index.html, navigation requests): network-first
  // This prevents stale HTML from referencing JS chunks that no longer exist after deploy
  if (event.request.mode === 'navigate' || url.pathname.endsWith('.html') || url.pathname.endsWith('/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clone = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone))
          return response
        })
        .catch(() => caches.match(event.request))
    )
    return
  }

  // Hashed static assets (JS, CSS): cache-first (hash in filename = immutable).
  // Safe now that a new deploy lands in a new cache and the old one is evicted.
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached
      return fetch(event.request).then((response) => {
        const clone = response.clone()
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone))
        return response
      })
    })
  )
})
