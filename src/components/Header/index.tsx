import { NavLink } from 'react-router-dom'
import { useTheme } from 'styled-components'
import { Cover } from '../Cover'
import { Logo } from '../Logo'
import { HeaderContainer, LogoContainer } from './styles'

export function Header() {
  const { colors } = useTheme()
  return (
    <HeaderContainer>
      <Cover color={colors.primary} bgcolor={colors['base-background']} />
      <LogoContainer>
        <NavLink to="/" title="Github Blog">
          <Logo color={colors.primary} />
        </NavLink>
      </LogoContainer>
    </HeaderContainer>
  )
}
