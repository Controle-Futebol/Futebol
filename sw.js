// Service worker mínimo: só habilita "Instalar" no Chrome.
// NÃO guarda nada em cache: o painel sempre busca a versão nova e os dados da planilha direto da rede.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.mode !== 'navigate') return;            // dados da planilha, fontes etc.: o navegador cuida normalmente
  e.respondWith(fetch(r).catch(() => new Response(
    '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<body style="background:#0e0f13;color:#f4f4f6;font-family:system-ui;padding:40px 20px;text-align:center">' +
    '<div style="font-size:44px">⚽</div><h2>Sem internet</h2><p>Conecte-se e tente de novo.</p>' +
    '<button onclick="location.reload()" style="font-size:16px;padding:12px 22px;border-radius:12px;border:0">Tentar de novo</button></body>',
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } })));
});
