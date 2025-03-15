import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path, { resolve } from "path";
import { VitePWA } from "vite-plugin-pwa";
import prerender from "@prerenderer/rollup-plugin";
import viteCompression from "vite-plugin-compression";
import mkcert from "vite-plugin-mkcert";
import fs from "fs";
import type { ServerOptions } from "vite";

const keyPath = path.resolve(__dirname, "localhost-key.pem");
const certPath = path.resolve(__dirname, "localhost.pem");

const httpsConfig: false | ServerOptions =
  fs.existsSync(keyPath) && fs.existsSync(certPath)
    ? { key: fs.readFileSync(keyPath), cert: fs.readFileSync(certPath) }
    : false;

export default defineConfig({
  server: {
    https: httpsConfig,
  },
  plugins: [
    react(),
    svgr(),
    mkcert(),
    prerender({
      routes: ["/home", "/ranking", "/info"],
      renderer: "@prerenderer/renderer-puppeteer",
      rendererOptions: {
        maxConcurrentRoutes: 1,
        renderAfterTime: 500,
      },
      postProcess(route) {
        route.html = route.html.replace(
          /<script type="module" src="\/src\.[a-z0-9]+\.js"><\/script>/,
          "",
        );
      },
    }),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
      manifest: {
        name: "Victory-fairy",
        short_name: "Victory-fairy",
        theme_color: "#ffffff",
        id: "com.sngyo.Victoryfairy",
        icons: [
          {
            src: "pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
    viteCompression({ algorithm: "gzip" }),
    viteCompression({ algorithm: "brotliCompress", ext: ".br" }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
