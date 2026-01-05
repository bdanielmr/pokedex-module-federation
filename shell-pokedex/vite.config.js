import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "shell_pokedex",
      remotes: {
        pokemon_detail: "http://localhost:3001/assets/remoteEntry.js",
        pokemon_history: "http://localhost:3002/assets/remoteEntry.js",
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
