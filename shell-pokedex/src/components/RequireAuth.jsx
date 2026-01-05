import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppStore } from "../shared/store";

export function RequireAuth({ children }) {
  const user = useAppStore((s) => s.user);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
