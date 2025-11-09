import type { ReactNode } from 'react'
import { ListIconsContainer } from './styles'

interface ListIconsProps {
  children: ReactNode
}

export function ListIcons({ children }: ListIconsProps) {
  return <ListIconsContainer>{children}</ListIconsContainer>
}
