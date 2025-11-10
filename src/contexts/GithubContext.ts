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
  issuesTotal: number
  issuesTotalPages: number
  fetchIssues: (
    query?: string,
    page?: number,
    perPage?: number,
  ) => Promise<void>
  fetchIssue: (issueNumber: number) => Promise<Issue | null>
  isLoading: boolean
  error: string | null
}

export const GithubContext = createContext({} as GithubContextType)
