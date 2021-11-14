const CACHE_STATIC = 'static-v1';
const CACHE_INMUTABLE = 'inmutable-v1';


self.addEventListener('install', async evt => {
    console.log("service worker instalado uwu");


    await caches.open(CACHE_STATIC)
        .then(cache => {
            cache.addAll([
                './',
                './index.html',
                './manifest.json',
                './images/user.png',
                './js/camera.js',
                './js/Photo.js',
                './js/app.js',
                './images/icons/android-launchericon-48-48.png',
                './images/icons/android-launchericon-72-72.png',
                './images/icons/android-launchericon-96-96.png',
                './images/icons/android-launchericon-144-144.png',
                './images/icons/android-launchericon-192-192.png',
                './images/icons/android-launchericon-512-512.png',
            ]);
        });

    await caches.open(CACHE_INMUTABLE)
        .then(cache => {
            cache.addAll([
              'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
              'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js'
            ]);
        });
});

self.addEventListener('fetch', evt => {
   evt.respondWith(caches.match(evt.request));
});
