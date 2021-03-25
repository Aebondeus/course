import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    *,
    *::after,
    *::before {
      box-sizing: border-box;
    }

    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    min-height:100%;
    margin:0;
    
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;

    transition: all 0.25s linear;`
