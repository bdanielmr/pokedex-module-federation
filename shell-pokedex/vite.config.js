import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "shell_pokedex",
      remotes: {
        pokemon_detail: "https://mf-pokemon-detail.vercel.app/assets/remoteEntry.js",
        pokemon_history: "https://mf-pokemon-history.vercel.app/assets/remoteEntry.js",
      },
      exposes: {
        "./store": "./src/shared/store.js",
      },
      shared: ["react", "react-dom", "styled-components", "zustand", "react-router-dom"],
    }),
  ],
  build: { target: "esnext" },
  server: { port: 3000 },
});
