import styled from 'styled-components'

export const ListIconsContainer = styled.ul`
  display: flex;
  gap: 1.5rem;
  list-style: none;
  margin-top: 1rem;

  li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: ${(props) => props.theme.colors['base-subtitle']};

    svg {
      color: ${(props) => props.theme.colors['base-label']};
    }
  }
`
