/* ==========================================================================
   Service worker — faz o tour abrir instantâneo e funcionar offline.
   - shell (páginas, ícones, poster) : precache na instalação
   - folhas de quadros e CDN         : cache-first sob demanda
   Para publicar uma versão nova, troque VERSION.
   ========================================================================== */
const VERSION = "v1";
const SHELL   = `shell-${VERSION}`;
const ASSETS  = `assets-${VERSION}`;

const SHELL_FILES = [
  "./",
  "./index.html",
  "./maquete/",
  "./maquete/index.html",
  "./poster.webp",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png",
];

self.addEventListener("install", e => {
  e.waitUntil((async () => {
    const c = await caches.open(SHELL);
    // addAll falha inteiro se um item falhar; adiciona um a um para ser tolerante
    await Promise.all(SHELL_FILES.map(u => c.add(u).catch(()=>{})));
    self.skipWaiting();
  })());
});

self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== SHELL && k !== ASSETS).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

const isAsset = (url) =>
  url.pathname.includes("/sheets/") ||
  url.pathname.includes("/icons/")  ||
  url.hostname === "cdnjs.cloudflare.com" ||
  url.hostname === "fonts.googleapis.com" ||
  url.hostname === "fonts.gstatic.com";

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // navegação: rede primeiro (pega atualização), cache como rede de segurança
  if (req.mode === "navigate") {
    e.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        const c = await caches.open(SHELL);
        c.put(req, fresh.clone());
        return fresh;
      } catch {
        return (await caches.match(req)) || (await caches.match("./index.html"));
      }
    })());
    return;
  }

  // folhas de quadros, ícones e CDN: cache primeiro
  if (isAsset(url)) {
    e.respondWith((async () => {
      const hit = await caches.match(req);
      if (hit) return hit;
      try {
        const res = await fetch(req, url.origin === location.origin ? {} : { mode: "no-cors" });
        const c = await caches.open(ASSETS);
        c.put(req, res.clone());
        return res;
      } catch {
        return hit || Response.error();
      }
    })());
  }
});
