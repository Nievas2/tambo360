/// <reference lib="webworker" />
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
import { NavigationRoute, registerRoute } from 'workbox-routing'
import { NetworkOnly } from 'workbox-strategies'

declare let self: ServiceWorkerGlobalScope

precacheAndRoute(self.__WB_MANIFEST)
cleanupOutdatedCaches()

// Manejador para la navegación
const networkOnly = new NetworkOnly()

const navigationRoute = new NavigationRoute(async (params) => {
  try {
    // Intentamos ir a la red
    return await networkOnly.handle(params)
  } catch (error) {
    // Si falla (estamos offline), devolvemos el archivo físico offline.html
    // Esto evita que React Router se ejecute.
    const cache = await caches.open('offline-html-cache') // O el nombre de tu cache de precache
    const cachedResponse = await caches.match('/offline.html')

    return cachedResponse || Response.error()
  }
})

registerRoute(navigationRoute)
