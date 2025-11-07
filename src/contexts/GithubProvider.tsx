import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { api } from '../services/github/api'
import { GithubContext, type Issue, type Profile } from './GithubContext'

const PROFILE_USERNAME = import.meta.env.VITE_GITHUB_USERNAME
const REPONAME = import.meta.env.VITE_GITHUB_REPONAME
const PER_PAGE = 10

interface GithubProviderProps {
  children: ReactNode
}

export function GithubProvider({ children }: GithubProviderProps) {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [issues, setIssues] = useState<Issue[]>([])
  const [issuesTotalPages, setIssuesTotalPages] = useState(0)

  const fetchProfile = useCallback(async () => {
    const response = await api.get(`users/${PROFILE_USERNAME}`)
    setProfile(response.data)
  }, [])

  const fetchTotalIssuesCount = useCallback(async () => {
    if (!PROFILE_USERNAME || !REPONAME) return

    try {
      const response = await api.get('search/issues', {
        params: {
          q: `repo:${PROFILE_USERNAME}/${REPONAME} is:issue state:open`,
        },
      })

      const totalItems = response.data.total_count
      const totalPages = Math.ceil(totalItems / PER_PAGE)
      setIssuesTotalPages(totalPages || 1) // At least 1 page
    } catch (error) {
      console.error('Failed to fetch total issues count:', error)
      // Safe fallback if the search fails: leave it as 0 or 1 and use the "Next" button.
      setIssuesTotalPages(0)
    }
  }, [])

  const fetchIssues = useCallback(async (page = 1, perPage = PER_PAGE) => {
    const response = await api.get(
      `repos/${PROFILE_USERNAME}/${REPONAME}/issues`,
      {
        params: {
          page,
          per_page: perPage,
          state: 'open',
          sort: 'created',
          direction: 'desc',
        },
      },
    )

    setIssues(response.data)
  }, [])

  useEffect(() => {
    fetchProfile()
    fetchTotalIssuesCount()
  }, [fetchProfile, fetchTotalIssuesCount])

  useEffect(() => {
    fetchIssues()
  }, [fetchIssues])

  return (
    <GithubContext.Provider
      value={{ profile, fetchProfile, issues, issuesTotalPages, fetchIssues }}
    >
      {children}
    </GithubContext.Provider>
  )
}
