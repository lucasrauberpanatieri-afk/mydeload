// sw.js - Service Worker Básico
self.addEventListener('install', (event) => {
    console.log('Service Worker instalado!');
});

self.addEventListener('fetch', (event) => {
    // Aqui você poderia adicionar lógica de cache para funcionar offline
    event.respondWith(fetch(event.request));
});
