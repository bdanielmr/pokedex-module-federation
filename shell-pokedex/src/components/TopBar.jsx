import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppStore } from "../shared/store";
import { Button } from "../styles/commonStyles";

const TopBarContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: ${(p) => p.theme.card};
  border-bottom: 1px solid ${(p) => p.theme.fg}22;
`;

const Logo = styled.b`
  font-size: 18px;
  letter-spacing: 2px;
  cursor: pointer;
`;

const ActionsGroup = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 12px;
  background: ${(p) => p.theme.bg};
  border-radius: 6px;
`;

const Toggle = styled.button`
  --w: 76px;
  --h: 34px;
  --p: 4px;

  width: var(--w);
  height: var(--h);
  border: 0;
  border-radius: 999px;
  padding: 0;
  cursor: pointer;
  position: relative;

  background: ${(p) => (p.$checked ? "#E6E6E6" : "#232323")};
  box-shadow:
    inset 0 0 0 1px rgba(0,0,0,0.06),
    0 1px 2px rgba(0,0,0,0.12);

  transition: background 180ms ease;
  outline: none;

  &:focus-visible {
    box-shadow:
      inset 0 0 0 1px rgba(0,0,0,0.06),
      0 0 0 3px rgba(100, 160, 255, 0.35);
  }
`;

const Knob = styled.span`
  width: calc(var(--h) - (var(--p) * 2));
  height: calc(var(--h) - (var(--p) * 2));
  border-radius: 999px;

  position: absolute;
  top: var(--p);
  left: var(--p);

  transform: translateX(${(p) => (p.$checked ? "calc(var(--w) - var(--h))" : "0")});
  transition: transform 180ms ease;

  background: ${(p) => (p.$checked ? "#1F1F1F" : "#FFFFFF")};
  box-shadow:
    0 2px 6px rgba(0,0,0,0.18),
    inset 0 0 0 1px rgba(0,0,0,0.06);
`;

export function ThemeToggle({ checked, onChange, label = "Cambiar tema" }) {
  return (
    <Toggle
      type="button"
      $checked={checked}
      onClick={() => onChange(!checked)}
      role="switch"
      aria-checked={checked}
      aria-label={label}
    >
      <Knob $checked={checked} />
    </Toggle>
  );
}

export function TopBar() {
  const theme = useAppStore((s) => s.theme);
  const toggleTheme = useAppStore((s) => s.toggleTheme);
  const user = useAppStore((s) => s.user);
  const logout = useAppStore((s) => s.logout);
  
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav("/login");
  };

  return (
    <TopBarContainer>
      <Logo onClick={() => nav("/")}>POKÉDEX</Logo>
      <ActionsGroup>
        <ThemeToggle checked={theme === "light"} onChange={toggleTheme} />
        
        {user && (
          <UserInfo>
            <span>{user.name}</span>
            <Button onClick={() => nav("/history")}>Historial</Button>
            <Button onClick={handleLogout}>Cerrar sesión</Button>
          </UserInfo>
        )}
      </ActionsGroup>
    </TopBarContainer>
  );
}
