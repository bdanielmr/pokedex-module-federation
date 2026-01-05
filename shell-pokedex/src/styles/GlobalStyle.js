import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: system-ui, -apple-system, Arial, sans-serif;
    background: ${(p) => p.theme.bg};
    color: ${(p) => p.theme.fg};
    transition: background 0.2s ease, color 0.2s ease;
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }
  
  * {
    box-sizing: border-box;
  }
`;