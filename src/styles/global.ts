import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors['base-border']};
  }

  body {
    background-color: ${(props) => props.theme.colors['base-background']};
    color: ${(props) => props.theme.colors['base-text']};
    -webkit-font-smoothing: antialiased;    
    line-height: 160%;
  } 
  
  body, input, textarea, button {
    font-family: 'Nunito', sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-size: 1rem;   
  }
`
