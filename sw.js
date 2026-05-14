// sw.js - Service Worker com Gestão de Cache
const CACHE_NAME = 'mydeload-v3'; // Mude o número toda vez que atualizar o app
const ASSETS = [
  '/',
  '/index.html',
  // Adicione aqui outros arquivos locais como 'icon.png' ou 'manifest.json'
];

// Instalação e Cache inicial
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting(); // Força o novo SW a assumir o controle imediatamente
});

// Limpeza de caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Estratégia: Tenta rede primeiro, se falhar (offline), usa o cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
