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

export interface FetchIssueResponse {
  totalItems: number
  totalPages: number
  items: Issue[]
}

interface GithubContextType {
  fetchProfile: () => Promise<Profile | undefined>
  fetchIssues: (
    query?: string,
    page?: number,
    perPage?: number,
  ) => Promise<FetchIssueResponse>
  fetchIssue: (issueNumber: number) => Promise<Issue | undefined>
}

export const GithubContext = createContext({} as GithubContextType)
