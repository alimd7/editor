const V="editor-v20";
const FILES=["./","index.html","obsidian.html","manifest.webmanifest","manifest-obsidian.webmanifest","icon-192.png","icon-512.png","icon-obsidian-192.png","icon-obsidian-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)));self.skipWaiting();});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener("fetch",e=>{
  const r=e.request; if(r.method!=="GET"||new URL(r.url).origin!==location.origin) return;
  e.respondWith(fetch(r).then(x=>{const c=x.clone();caches.open(V).then(ch=>ch.put(r,c));return x;}).catch(()=>caches.match(r)));
});
