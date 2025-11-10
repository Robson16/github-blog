import { useCallback, type ReactNode } from 'react'
import { api } from '../services/github/api'
import {
  GithubContext,
  type FetchIssueResponse,
  type Issue,
  type Profile,
} from './GithubContext'

const PROFILE_USERNAME = import.meta.env.VITE_GITHUB_USERNAME
const REPONAME = import.meta.env.VITE_GITHUB_REPONAME
const PER_PAGE = 10

interface GithubProviderProps {
  children: ReactNode
}

export function GithubProvider({ children }: GithubProviderProps) {
  const fetchProfile = useCallback(async (): Promise<Profile | undefined> => {
    if (!PROFILE_USERNAME) return

    const response = await api.get(`users/${PROFILE_USERNAME}`)
    return response.data
  }, [])

  const fetchIssues = useCallback(
    async (
      query = '',
      page = 1,
      perPage = PER_PAGE,
    ): Promise<FetchIssueResponse> => {
      if (!PROFILE_USERNAME || !REPONAME) {
        return { totalItems: 0, totalPages: 0, items: [] }
      }

      const response = await api.get('search/issues', {
        params: {
          q: `repo:${PROFILE_USERNAME}/${REPONAME} is:issue state:open ${query}`,
          page,
          per_page: perPage,
          sort: 'created',
          direction: 'desc',
        },
      })

      return {
        totalItems: response.data.total_count,
        totalPages: Math.ceil(response.data.total_count / perPage) || 1,
        items: response.data.items,
      }
    },
    [],
  )

  const fetchIssue = useCallback(
    async (issueNumber: number): Promise<Issue | undefined> => {
      if (!PROFILE_USERNAME || !REPONAME) return

      const response = await api.get(
        `repos/${PROFILE_USERNAME}/${REPONAME}/issues/${issueNumber}`,
      )

      return response.data
    },
    [],
  )

  return (
    <GithubContext.Provider
      value={{
        fetchProfile,
        fetchIssues,
        fetchIssue,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}
