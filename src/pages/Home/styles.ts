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
`

export const IssueList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2rem;
  width: 100%;
  margin: 3rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 0 1rem;
  }
`

export const IssueItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 2rem;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors['base-post']};

  header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    overflow-wrap: break-word;

    h1 {
      font-size: 1.25rem;
      color: ${(props) => props.theme.colors['base-title']};
    }

    span {
      font-size: 0.875rem;
      color: ${(props) => props.theme.colors['base-span']};
      white-space: nowrap;
    }
  }

  p {
    color: ${(props) => props.theme.colors['base-text']};
    overflow-wrap: break-word;
  }
`
