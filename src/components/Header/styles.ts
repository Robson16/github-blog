import styled from 'styled-components'

export const HeaderContainer = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  min-height: 600px;
  padding: ${(props) => props.theme.container.padding};

  @media (min-width: 768px) {
    min-height: 300px;
  }
`

export const CoverContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;

  width: 100%;
  height: 100%;

  svg {
    width: 100%;
    height: 100%;
  }
`

export const LogoContainer = styled.div`
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (min-width: 768px) {
    top: 40%;
  }
`

export const HeaderContent = styled.div`
  position: absolute;
  top: 75%;
  transform: translateY(-50%);
  z-index: 1;

  display: flex;
  flex-direction: column;

  width: calc(100% - 2rem);
  max-width: ${(props) => props.theme.container.maxWidth};
  gap: 2rem;
  padding: 2rem 2.5rem;

  background-color: ${(props) => props.theme.colors['base-profile']};
  border-radius: 10px;
  box-shadow: 0px 2px 28px rgba(0, 0, 0, 0.8);

  @media (min-width: 768px) {
    top: 100%;
  }
`
