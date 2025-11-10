import { Link } from 'react-router-dom'
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
  margin-top: 4.5rem;

  & > header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 4.5rem;
    margin-bottom: 1rem;

    h1 {
      font-size: 1.125rem;
      font-weight: 700;
      color: ${(props) => props.theme.colors['base-subtitle']};
    }

    span {
      font-size: 0.875rem;
      color: ${(props) => props.theme.colors['base-span']};
    }
  }
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

export const IssueItem = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 2rem;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors['base-post']};
  border: 2px solid transparent;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    transition: border-color 0.2s;
    border-color: ${(props) => props.theme.colors['base-border']};
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    overflow-wrap: break-word;

    h1 {
      font-size: 1.25rem;
      color: ${(props) => props.theme.colors['base-title']};
      overflow-wrap: anywhere;
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

export const ErrorMessage = styled.p`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 2rem 1rem;
  color: ${(props) => props.theme.colors['base-text']};
  font-size: 1.5rem;
  font-weight: 700;
`
