let CACHE_NAME = "Boveda3"

self.addEventListener('install', e => {

    const imagenes = caches.open(CACHE_NAME).then(cache => {
        cache.add('/'),
            cache.add('img/Cars.jpeg'),
            cache.add('img/default.jpeg'),
            cache.add('img/Elementos.jpeg'),
            cache.add('img/La monja 2.jpeg'),
            cache.add('img/La noche del demonio.jpeg'),
            cache.add('img/Rocky Balboa.jpeg'),
            cache.add('img/favicon.ico'),
            cache.add('img/camara.png'),
            cache.add('index.html'),
            cache.add('js/app.js'),
            cache.add('css/style.css'),
            cache.add('sw.js')
    })

    // const recursos = caches.open('Boveda Recursos').then(cache => {
    //     cache.add('/'),
    //         cache.add('index.html'),
    //         cache.add('js/app.js'),
    //         cache.add('css/style.css'),
    //         cache.add('sw.js')

    // })
    e.waitUntil(imagenes);
})

self.addEventListener('fetch', e => {
    //Estrategia 0 only net
    //Estrategia 1 only cache
    //Estrategia 2 first cache, then network

    // const respuesta = caches.match(e.request)
    //     .then(res => {
    //         if (res) return res;
    //         console.log('No existe el recurso de caché ->', e.request.url);
    //         return fetch(e.request).then(newResp => {
    //             caches.open("Boveda Imagenes")
    //                 .then(cache => {
    //                     cache.put(e.request, newResp)
    //                 });
    //         });
    //     });
    // e.respondWith(respuesta);

    //Estrategia 3 first network then cache
    const respuesta = fetch(e.request).then(newResp => {
        caches.open(CACHE_NAME)
            .then(cache => {
                cache.put(e.request, newResp)
            });

        return newResp.clone()
    }).catch(err => {
        return caches.match(e.request)
    })
    e.respondWith(respuesta);
})