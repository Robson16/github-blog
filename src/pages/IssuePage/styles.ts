import styled from 'styled-components'

export const IssueContainer = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${(props) => props.theme.container.maxWidth};
  padding: ${(props) => props.theme.container.padding};
  margin: ${(props) => props.theme.container.margin};
  margin-top: 9.5rem;
  margin-bottom: 4.5rem;
`

export const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

export const IssueInfos = styled.div`
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.25rem;

    a {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 700;
      font-size: 0.75rem;
      text-transform: uppercase;
      color: ${(props) => props.theme.colors.primary};
      border-bottom: 1px solid transparent;
      text-decoration: none;

      &:hover {
        transition: border-color 350ms;
        border-color: ${(props) => props.theme.colors.primary};
      }
    }
  }

  h1 {
    flex: 1;
    color: ${(props) => props.theme.colors['base-title']};
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1.3;
  }
`
