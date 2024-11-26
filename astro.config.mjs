import { defineConfig } from 'astro/config';

// https://astro.build/config
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  vite: {
    plugins: [
      VitePWA({
        registerType: 'autoUpdate',
        manifest: {
          name: "TPM PORTAL",
          short_name: "TPMPORTAL",
          start_url: "/",
          display: "standalone",
          background_color: "#13151a",
          theme_color: "#000000",
          icons: [
            {
              src: "/icons/pwa-192x192.png",
              sizes: "192x192",
              type: "image/png"
            },
            {
              src: "/icons/pwa-512x512.png",
              sizes: "512x512",
              type: "image/png"
            }
          ]
        }
      })
    ]
  }
});
