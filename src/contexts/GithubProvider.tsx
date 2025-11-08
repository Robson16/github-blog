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

  const fetchIssues = useCallback(
    async (query = '', page = 1, perPage = PER_PAGE) => {
      if (!PROFILE_USERNAME || !REPONAME) return

      try {
        const response = await api.get('search/issues', {
          params: {
            q: `repo:${PROFILE_USERNAME}/${REPONAME} is:issue state:open ${query}`,
            page,
            per_page: perPage,
            sort: 'created',
            direction: 'desc',
          },
        })

        const totalItems = response.data.total_count
        const totalPages = Math.ceil(totalItems / PER_PAGE)

        setIssues(response.data.items)
        setIssuesTotalPages(totalPages || 1)
      } catch (error) {
        console.error('Failed to fetch issues:', error)
      }
    },
    [],
  )

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

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
