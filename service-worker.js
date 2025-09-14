// اسم ذاكرة التخزين المؤقت. قم بتغييره عند تحديث الملفات.
const CACHE_NAME = 'dr-chama-elmanjra-v1';

// قائمة الملفات الأساسية التي يجب تخزينها مؤقتًا.
const urlsToCache = [
  '/',
  '/index.html',
  '/js/script.js',
  '/resources/researches/researches.html',
  '/assets/images/Dr-Chama-Elmanjra-Gastro-entérologue-&-Hépatologue-à-Marrakech-logo.webp',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap'
];

// حدث التثبيت: يتم تشغيله عند تثبيت عامل الخدمة لأول مرة.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// حدث الجلب: يتم تشغيله عند كل طلب يقوم به التطبيق (مثل طلب صفحة أو صورة).
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // إذا وجدنا الملف في ذاكرة التخزين المؤقت، نعيده مباشرة.
        if (response) {
          return response;
        }
        // إذا لم يكن موجودًا، نطلبه من الشبكة.
        return fetch(event.request);
      }
    )
  );
});
