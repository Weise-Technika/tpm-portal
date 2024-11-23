const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = {
    
  configureWebpack: {
    plugins: [
      new GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
          {
            urlPattern: /\.(?:html|css|js|png|jpg|jpeg|svg|gif)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'assets',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // เก็บข้อมูล 30 วัน
              },
            },
          },
        ],
      }),
    ],
  },
  pwa: {
    name: 'TPM Portal',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    manifestOptions: {
      background_color: '#ffffff',
    },
    workboxOptions: {
        swDest: '/service-worker.js',
    }
  },
};