import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { useTheme } from 'styled-components'
import { Cover } from '../Cover'
import { Logo } from '../Logo'
import {
  CoverContainer,
  HeaderContainer,
  HeaderContent,
  LogoContainer,
} from './styles'

interface HeaderProps {
  children: ReactNode
}

export function Header({ children }: HeaderProps) {
  const { colors } = useTheme()
  return (
    <HeaderContainer>
      <CoverContainer>
        <Cover
          color={colors.primary}
          bgcolor={colors['base-background']}
          preserveAspectRatio="xMidYMid slice"
          width="100%"
          height="100%"
        />
      </CoverContainer>

      <LogoContainer>
        <NavLink to="/" title="Github Blog">
          <Logo color={colors.primary} />
        </NavLink>
      </LogoContainer>

      <HeaderContent>{children}</HeaderContent>
    </HeaderContainer>
  )
}
