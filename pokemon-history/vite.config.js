import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "pokemon_history",
      filename: "remoteEntry.js",
      exposes: {
        "./PokemonHistoryPage": "./src/PokemonHistoryPage.jsx",
      },
      remotes: {
        shell_pokedex: "https://pokedex-module-federation.vercel.app/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom", "styled-components", "zustand", "react-router-dom"],
    }),
  ],
  build: { target: "esnext" },
  server: { port: 3002 },
});
