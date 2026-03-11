/// <reference lib="webworker" />
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
import { NavigationRoute, registerRoute } from 'workbox-routing'
import { NetworkOnly } from 'workbox-strategies'

declare let self: ServiceWorkerGlobalScope

precacheAndRoute(self.__WB_MANIFEST)
cleanupOutdatedCaches()
const OFFLINE_URL = '/offline.html'

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('offline-html-cache').then((cache) => {
      return cache.add(OFFLINE_URL)
    })
  )
})
// Manejador para la navegación
const networkOnly = new NetworkOnly()

const navigationRoute = new NavigationRoute(async ({ event }) => {
  try {
    return await fetch(event.request)
  } catch (error) {
    const cache = await caches.open('offline-html-cache')
    const cachedResponse = await cache.match('/offline.html')

    return cachedResponse
  }
})

registerRoute(navigationRoute)
