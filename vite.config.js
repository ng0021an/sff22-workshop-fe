import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import react from "@vitejs/plugin-react";
import nodePolyfills from "rollup-plugin-polyfill-node";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const { APP_ID } = loadEnv(mode, process.cwd(), "");

  return {
    define: {
      __APP_ID__: JSON.stringify(APP_ID),
    },
    server: {
      port: APP_ID === "a" ? 4000 : 5000,
    },
    plugins: [react()],
    build: {
      outDir: APP_ID === "a" ? "dist-a" : "dist-b",
      rollupOptions: {
        plugins: [nodePolyfills()],
      },
    },
    optimizeDeps: {
      // Polyfill NodeJS APIs for development builds
      esbuildOptions: {
        define: {
          global: "globalThis",
        },
        plugins: [
          new NodeGlobalsPolyfillPlugin({
            process: true,
            buffer: true,
          }),
        ],
      },
    },
  };
});
