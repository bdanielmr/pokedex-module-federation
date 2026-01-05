import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../shared/store";
import { Shell, Button } from "../styles/commonStyles";
import styled from "styled-components";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginContainer = styled(Shell)`
  max-width: 400px;
  margin: 80px auto;
  text-align: center;
  display: grid;
  gap: 20px;
`;

const Title = styled.h1`
  margin-bottom: 8px;
  color: ${(p) => p.theme.fg};
`;

const Input = styled.input`
  padding: 12px 14px;
  font-size: 15px;
  border-radius: 10px;
  border: 1px solid
    ${(p) => (p.$invalid ? "rgba(255, 80, 80, 0.8)" : "rgba(255, 255, 255, 0.15)")};
  background: rgba(255, 255, 255, 0.04);
  color: ${(p) => p.theme.fg};

  &:focus {
    outline: none;
    border-color: ${(p) =>
      p.$invalid ? "rgba(255, 80, 80, 0.9)" : p.theme.primary};
  }
`;

const ErrorText = styled.span`
  font-size: 13px;
  color: #ff6b6b;
`;

const LoginButton = styled(Button)`
  padding: 12px 32px;
  font-size: 16px;
  font-weight: 600;
`;

export function LoginPage() {
  const [email, setEmail] = useState("");
  const login = useAppStore((s) => s.login);
  const nav = useNavigate();

  const isValidEmail = useMemo(
    () => EMAIL_REGEX.test(email.trim()),
    [email]
  );

  const handleLogin = () => {
    if (!isValidEmail) return;
    login(email.trim());
    nav("/");
  };

  return (
    <LoginContainer>
      <Title>Iniciar sesión</Title>

      <Input
        type="email"
        placeholder="correo@ejemplo.com"
        value={email}
        $invalid={email.length > 0 && !isValidEmail}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        aria-invalid={email.length > 0 && !isValidEmail}
      />

      {email.length > 0 && !isValidEmail && (
        <ErrorText>Ingresa un correo válido</ErrorText>
      )}

      <LoginButton onClick={handleLogin} disabled={!isValidEmail}>
        Entrar
      </LoginButton>
    </LoginContainer>
  );
}
