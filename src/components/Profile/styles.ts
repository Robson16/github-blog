import styled from 'styled-components'

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  top: -350px;
  max-width: ${(props) => props.theme.container.maxWidth};
  margin: -160px auto 0;
  padding: 2rem 2.5rem;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors['base-profile']};
  z-index: 1;
  box-shadow: 0px 2px 28px rgba(0, 0, 0, 0.8);

  @media (min-width: 768px) {
    flex-direction: row;
  }
`

export const ProfileInfos = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`

export const ProfileAvatar = styled.img`
  width: 148px;
  height: 148px;
  border-radius: 8px;
`

export const ProfileTitle = styled.h1`
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 1.3;
  color: ${(props) => props.theme.colors['base-title']};
`

export const ProfileGithubLink = styled.a`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-bottom: 0.25rem;
  font-weight: 700;
  font-size: 0.75rem;
  line-height: 1;
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.primary};
  border-bottom: 1px solid transparent;
  text-decoration: none;

  &:hover {
    transition: border-color 350ms;
    border-bottom: 1px solid ${(props) => props.theme.colors.primary};
  }
`

export const ProfileListIcon = styled.ul`
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
