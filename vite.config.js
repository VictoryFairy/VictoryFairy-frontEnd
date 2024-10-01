import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { resolve } from "path";
import { VitePWA } from "vite-plugin-pwa";
import prerender from "@prerenderer/rollup-plugin";
// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react(), svgr()],
//   resolve: {
//     alias: {
//       "@": resolve(__dirname, "src"), // @를 /src 폴더로 매핑
//     },
//   },
// });
export default defineConfig({
    plugins: [
        react(),
        svgr(),
        prerender({
            routes: ["/home", "/ranking", "/info"],
            renderer: "@prerenderer/renderer-puppeteer",
            rendererOptions: {
                maxConcurrentRoutes: 1,
                renderAfterTime: 500,
            },
            postProcess: function (route) {
                route.html = route.html.replace(/<script type="module" src="\/src\.[a-z0-9]+\.js"><\/script>/, "");
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
    ],
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"), // @를 /src 폴더로 매핑
        },
    },
});
