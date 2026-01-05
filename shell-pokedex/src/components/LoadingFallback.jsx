import React from "react";
import styled from "styled-components";

const LoadingContainer = styled.div`
  padding: 16px;
  text-align: center;
  color: ${(p) => p.theme.fg};
`;

export function LoadingFallback() {
  return <LoadingContainer>Cargando...</LoadingContainer>;
}
