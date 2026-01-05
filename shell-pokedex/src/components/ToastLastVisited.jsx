import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppStore } from "../shared/store";

const ToastContainer = styled.div`
  position: fixed;
  bottom: 16px;
  right: 16px;
  padding: 12px 16px;
  border-radius: 12px;
  background: #000;
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  max-width: 320px;
  animation: slideIn 0.3s ease;

  @keyframes slideIn {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const ToastMessage = styled.div`
  margin-bottom: 8px;
  font-size: 14px;
`;

const ToastActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ToastButton = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  background: #fff;
  color: #000;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;

  &:hover {
    background: #eee;
  }
`;

export function ToastLastVisited() {
  const user = useAppStore((s) => s.user);
  const lastVisited = useAppStore((s) => s.lastVisited);
  const toastDismissedFor = useAppStore((s) => s.toastDismissedFor);
  const dismissToast = useAppStore((s) => s.dismissToast);
  
  const nav = useNavigate();

  const shouldShow = user && lastVisited && toastDismissedFor !== lastVisited.name;

  if (!shouldShow) return null;

  const handleViewDetail = () => {
    nav(`/pokemon/${lastVisited.name}`);
  };

  return (
    <ToastContainer>
      <ToastMessage>
        Último Pokémon visitado: <b>{lastVisited.name}</b>
      </ToastMessage>
      <ToastActions>
        <ToastButton onClick={handleViewDetail}>Ver detalle</ToastButton>
        <ToastButton onClick={dismissToast}>Cerrar</ToastButton>
      </ToastActions>
    </ToastContainer>
  );
}