import styled from 'styled-components'

export const PaginationContainer = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.25rem;
`

export const PaginationButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.75rem 1.2rem;
  gap: 0.5rem;
  border-radius: 6px;
  border: 0;
  background-color: ${(props) => props.theme.colors['base-post']};
  color: ${(props) => props.theme.colors['base-text']};
  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    transition: background-color 0.2s;
    background-color: ${(props) => props.theme.colors['base-label']};
  }
`
