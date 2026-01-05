import styled from "styled-components";

export const Shell = styled.div`
  padding: 16px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Button = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  border: 1px solid ${(p) => p.theme.fg}33;
  background: ${(p) => p.theme.card};
  color: ${(p) => p.theme.fg};
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    background: ${(p) => p.theme.fg}11;
  }

  &:active {
    transform: scale(0.98);
  }
`;