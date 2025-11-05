import { createContext } from 'use-context-selector'

export interface Profile {
  login: string
  id: number
  avatar_url: string
  name: string
  company: string | null
  bio: string
  followers: number
  html_url: string
}

interface GithubContextType {
  profile: Profile | null
  fetchProfile: (profile: Profile | null) => void
}

export const GithubContext = createContext({} as GithubContextType)
