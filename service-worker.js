const OFFLINE_VERSION = 3;
const CACHE_NAME = "offline";
// Personalize isso com um URL diferente, se necessário.
const OFFLINE_URL = "./offline.html";
self.addEventListener("install", (event) => {
    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            // Definir {cache: 'reload'} na nova solicitação garantirá que a
            // resposta não será preenchida do cache HTTP; ou seja, será da rede.
            await cache.add(new Request(OFFLINE_URL, { cache: "reload" }));
        })()
    );
    // Força o service worker em espera se tornar o service worker ativo.
    self.skipWaiting();
});
self.addEventListener("activate", (event) => {
    event.waitUntil(
        (async () => {
            // Ativa o pré-carregamento de navegação se for suportado.
            if ("navigationPreload" in self.registration) {
                await self.registration.navigationPreload.enable();
            }
        })()
    );
    // Diz ao service worker ativo para assumir o controle da página imediatamente.
    self.clients.claim();
});
self.addEventListener("fetch", (event) => {
    // Nós só queremos chamar event.respondWith() se for uma requisição de navegação
    // para uma página HTML.
    if (event.request.mode === "navigate") {
        event.respondWith(
            (async () => {
                try {
                    // Primeiro, tente usar a resposta de pré-carregamento de navegação se for compatível.
                    const preloadResponse = await event.preloadResponse;
                    if (preloadResponse) {
                        return preloadResponse;
                    }
                    // Sempre tente a rede primeiro.
                    const networkResponse = await fetch(event.request);
                    return networkResponse;
                } catch (error) {
                    // catch só é acionado se uma exceção for lançada, provavelmente
                    // devido a um erro de rede.
                    // Se fetch() retornar uma resposta HTTP válida com um código de resposta em
                    // o intervalo 4xx ou 5xx, o catch() NÃO será chamado.
                    console.log("Falha na busca; retornando a página off-line em vez disso.", error);
                    const cache = await caches.open(CACHE_NAME);
                    const cachedResponse = await cache.match(OFFLINE_URL);
                    return cachedResponse;
                }
            })()
        );
    }
    // Se nossa condição if() for falsa, esse manipulador de busca não interceptará a solicitação.
    // Se houver outros manipuladores de busca registrados, eles receberão uma
    // chance de chamar event.respondWith(). Se nenhum manipulador de busca chamar
    // event.respondWith(), a solicitação será tratada pelo navegador como se
    // não houvesse envolvimento do service worker.
});

