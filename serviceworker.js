// Service worker for Offline Web IDE
const VERSION = 'v10';

const CACHED_RESOURCES = [
  'blockly/blockly.html',
  'blockly/blockly_ble.js',
  'blockly/ru.js',
  'blockly/en.js',
  'blockly/blockly_robot.js',
  'blockly/blocks_compressed.js',
  'blockly/field_textarea.js',
  'blockly/javascript_compressed.js',
  'blockly/blockly_amperka_motorshield.js',
  'blockly/blockly_compressed.js',
  'blockly/blockly_espruino.js',
  'blockly/media/handclosed.cur',
  'blockly/media/tree.png',
  'blockly/media/trashlid.png',
  'blockly/media/1x1.gif',
  'blockly/media/delete.mp3',
  'blockly/media/trashbody.png',
  'blockly/media/delete.ogg',
  'blockly/media/anon.jpeg',
  'blockly/media/sprites.png',
  'blockly/media/handopen.cur',
  'blockly/media/quote1.png',
  'blockly/media/click.wav',
  'blockly/media/progress.gif',
  'blockly/media/quote0.png',
  'blockly/media/click.ogg',
  'blockly/media/delete.wav',
  'blockly/media/click.mp3',
  'data/espruino.json',
  'data/app/openTestingLog.js',
  'data/app/openTestingLog.html',
  'data/testing_initial.html',
  'data/terminal_initial.html',
  'data/sounds/doorbell2.wav',
  'data/sounds/car_horn_x.wav',
  'data/sounds/sirens_x.wav',
  'data/sounds/honk2_x.wav',
  'data/sounds/toot2_x.wav',
  'data/sounds/boxing_bell.wav',
  'data/sounds/truck_horn.wav',
  'data/sounds/phone_ring_old.wav',
  'data/sounds/trolley2.wav',
  'data/sounds/warning_horn.wav',
  'data/sounds/chime_up.wav',
  'data/settings_flasher.html',
  'data/tours/projectSnippet.json',
  'data/tours/project.json',
  'data/tours/testingExt.json',
  'data/tours/testing.json',
  'data/tours/watchExpr.json',
  'data/tutorials/1.js',
  'data/testing_form.html',
  'data/settings_about.html',
  'data/testing_image.html',
  'css/ui-lightness/images/ui-bg_gloss-wave_35_f6a828_500x100.png',
  'css/ui-lightness/images/ui-bg_flat_10_000000_40x100.png',
  'css/ui-lightness/images/ui-bg_highlight-soft_100_eeeeee_1x100.png',
  'css/ui-lightness/images/ui-bg_diagonals-thick_20_666666_40x40.png',
  'css/ui-lightness/images/ui-bg_glass_100_fdf5ce_1x400.png',
  'css/ui-lightness/images/ui-icons_228ef1_256x240.png',
  'css/ui-lightness/images/ui-bg_diagonals-thick_18_b81900_40x40.png',
  'css/ui-lightness/images/animated-overlay.gif',
  'css/ui-lightness/images/ui-bg_highlight-soft_75_ffe45c_1x100.png',
  'css/ui-lightness/images/ui-icons_ffffff_256x240.png',
  'css/ui-lightness/images/ui-bg_glass_100_f6f6f6_1x400.png',
  'css/ui-lightness/images/ui-icons_ffd27a_256x240.png',
  'css/ui-lightness/images/ui-icons_ef8c08_256x240.png',
  'css/ui-lightness/images/ui-icons_222222_256x240.png',
  'css/ui-lightness/images/ui-bg_glass_65_ffffff_1x400.png',
  'css/images/treeview-black-line.gif',
  'css/images/treeview-red.gif',
  'css/images/file.gif',
  'css/images/treeview-red-line.gif',
  'css/images/treeview-default-line.gif',
  'css/images/plus.gif',
  'css/images/treeview-gray-line.gif',
  'css/images/folder.gif',
  'css/images/treeview-famfamfam-line.gif',
  'css/images/minus.gif',
  'css/images/folder-closed.gif',
  'css/images/treeview-default.gif',
  'css/images/treeview-black.gif',
  'css/images/treeview-gray.gif',
  'css/images/treeview-famfamfam.gif',
  'img/icons.png',
  'img/icon_128.png',
  'favicon.ico',
  'manifest.json',
  'index.js',  // auto-generated file of squished JS
  'index.css', // auto-generated file of squished CSS
  'index.html',
  './'
];

const CACHE_PREFIX = 'espruino-web-ide-';
const CACHE_NAME = CACHE_PREFIX + VERSION;

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(CACHED_RESOURCES);
    })
  );
});

// Use the cache, fallback to network
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request, {ignoreSearch: true}).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

// Delete old caches when we change VERSION
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName.startsWith(CACHE_PREFIX) && CACHE_NAME !== cacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
