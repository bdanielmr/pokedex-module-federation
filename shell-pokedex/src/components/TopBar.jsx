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

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
`;

const Logo = styled.b`
  font-size: 18px;
  letter-spacing: 2px;
  cursor: pointer;
  user-select: none;

  @media (max-width: 640px) {
    text-align: center;
  }
`;

const ActionsGroup = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: 640px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  background: ${(p) => p.theme.bg};
  border-radius: 10px;
  border: 1px solid ${(p) => p.theme.fg}14;
  flex-wrap: wrap;
  justify-content: flex-end;

  @media (max-width: 640px) {
    width: 100%;
    justify-content: center;
    gap: 10px;
  }
`;

const UserName = styled.span`
  opacity: 0.9;
  font-weight: 700;
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 640px) {
    max-width: 100%;
    text-align: center;
  }
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
  -webkit-tap-highlight-color: transparent;

  &:focus-visible {
    box-shadow:
      inset 0 0 0 1px rgba(0,0,0,0.06),
      0 0 0 3px rgba(100, 160, 255, 0.35);
  }

  @media (max-width: 640px) {
    --w: 66px;
    --h: 30px;
    --p: 4px;
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
            <UserName title={user.name}>{user.name}</UserName>
            <Button onClick={() => nav("/history")}>Historial</Button>
            <Button onClick={handleLogout}>Cerrar sesión</Button>
          </UserInfo>
        )}
      </ActionsGroup>
    </TopBarContainer>
  );
}
