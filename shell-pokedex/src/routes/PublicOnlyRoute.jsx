import React from "react";
import { Navigate } from "react-router-dom";
import { useAppStore } from "../shared/store";

export function PublicOnlyRoute({ children }) {
  const user = useAppStore((s) => s.user);

  if (user) return <Navigate to="/" replace />;

  return children;
}
