import React from "react";
import { Routes, Route } from "react-router-dom";
import { RequireAuth } from "../components/RequireAuth";
import { PublicOnlyRoute } from "./PublicOnlyRoute";
import HomePage from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";

const PokemonDetailPage = React.lazy(() => import("pokemon_detail/PokemonDetailPage"));
const PokemonHistoryPage = React.lazy(() => import("pokemon_history/PokemonHistoryPage"));

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicOnlyRoute>
            <LoginPage />
          </PublicOnlyRoute>
        }
      />

      <Route
        path="/"
        element={
          <RequireAuth>
            <HomePage />
          </RequireAuth>
        }
      />

      <Route
        path="/pokemon/:name"
        element={
          <RequireAuth>
            <PokemonDetailPage />
          </RequireAuth>
        }
      />

      <Route
        path="/history"
        element={
          <RequireAuth>
            <PokemonHistoryPage />
          </RequireAuth>
        }
      />
    </Routes>
  );
}
