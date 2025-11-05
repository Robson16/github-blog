import { createContext } from 'use-context-selector'

export interface Profile {
  login: string
  id: number
  avatar_url: string
  name: string
  company?: string
  bio: string
  followers: number
  html_url: string
}

interface GithubProfileContextType {
  profile: Profile | null
  fetchProfile: (profile: Profile | null) => void
}

export const GithubProfileContext = createContext(
  {} as GithubProfileContextType,
)
