import styled from 'styled-components'

export const SearchFormContainer = styled.form`
  display: flex;
  gap: 1rem;

  input {
    flex: 1;
    border-radius: 6px;
    border: 1px solid ${(props) => props.theme.colors['base-border']};
    background-color: ${(props) => props.theme.colors['base-input']};
    color: ${(props) => props.theme.colors['base-text']};
    padding: 1rem 0.75rem;

    &::placeholder {
      font-size: 1rem;
      color: ${(props) => props.theme.colors['base-label']};
    }
  }

  button[type='submit'] {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 1rem;
    border: 0;
    border-radius: 6px;
    background-color: ${(props) => props.theme.colors['base-post']};
    color: ${(props) => props.theme.colors['base-text']};
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s;

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      transition: background-color 0.2s;
      background-color: ${(props) => props.theme.colors['base-label']};
    }
  }
`
