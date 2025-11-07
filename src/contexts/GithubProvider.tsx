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

  const fetchIssues = useCallback(async () => {
    const response = await api.get(
      `repos/${PROFILE_USERNAME}/${REPONAME}/issues`,
      {
        params: {
          page: 1,
          per_page: PER_PAGE,
        },
      },
    )

    setIssues(response.data)

    // Check if there are more pages
    const linkHeader = response.headers.link
    try {
      // Search for total issues using the search API
      const countResponse = await api.get(
        `search/issues?q=repo:${PROFILE_USERNAME}/${REPONAME}+is:issue`,
      )
      const totalItems = countResponse.data.total_count
      const totalPages = Math.ceil(totalItems / PER_PAGE)
      setIssuesTotalPages(totalPages)
    } catch (error) {
      console.error('Error fetching total count:', error)
      // Fallback: If it says "next," it's at least 2 pages; otherwise, it's 1.
      const hasNextPage = linkHeader?.includes('rel="next"') ?? false
      setIssuesTotalPages(hasNextPage ? 2 : 1)
    }
  }, [])

  useEffect(() => {
    fetchProfile()
    fetchIssues()
  }, [fetchIssues, fetchProfile])

  return (
    <GithubContext.Provider
      value={{ issues, issuesTotalPages, profile, fetchProfile, fetchIssues }}
    >
      {children}
    </GithubContext.Provider>
  )
}
