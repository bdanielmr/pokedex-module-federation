import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "pokemon_detail",
      filename: "remoteEntry.js",
      exposes: {
        "./PokemonDetailPage": "./src/PokemonDetailPage.jsx",
      },
      remotes: {
        shell_pokedex: "http://localhost:3000/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom", "styled-components", "zustand", "react-router-dom"],
    }),
  ],
  build: { target: "esnext" },
  server: { port: 3001 },
});
