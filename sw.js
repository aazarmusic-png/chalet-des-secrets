// Toujours récupérer la dernière version de l'app (pas de vieille page en mémoire)
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET')return;
  const u=new URL(r.url);
  const isApp=u.origin===self.location.origin&&(r.mode==='navigate'||/\.(html|js|json)$/.test(u.pathname)||u.pathname.endsWith('/'));
  if(isApp)e.respondWith(fetch(r,{cache:'no-store'}).catch(()=>fetch(r)));
});
