import styled from 'styled-components'

export const HomeContainer = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${(props) => props.theme.container.maxWidth};
  padding: ${(props) => props.theme.container.padding};
  margin: ${(props) => props.theme.container.margin};
  padding-top: 3.5rem;
  padding-bottom: 3.5rem;

  h1 {
    margin-bottom: 1.5rem;
  }
`
