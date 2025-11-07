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

export interface IssueUser {
  login: string
}

export interface Issue {
  id: number
  title: string
  body: string
  created_at: string
  number: number
  html_url: string
  comments: number
  user: IssueUser
}

interface GithubContextType {
  profile: Profile | null
  fetchProfile: (profile: Profile | null) => void
  issues: Issue[]
  issuesTotalPages: number
  fetchIssues: (page?: number, perPage?: number) => void
}

export const GithubContext = createContext({} as GithubContextType)
