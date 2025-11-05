import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { GithubProfileProvider } from './contexts/GithubProfileProvider'
import { Router } from './Router'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <GithubProfileProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </GithubProfileProvider>
    </ThemeProvider>
  )
}
