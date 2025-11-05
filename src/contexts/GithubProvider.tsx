import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { api } from '../services/github/api'
import { GithubContext, type Profile } from './GithubContext'

const PROFILE_USERNAME = import.meta.env.VITE_GITHUB_USERNAME

interface GithubProviderProps {
  children: ReactNode
}

export function GithubProvider({ children }: GithubProviderProps) {
  const [profile, setProfile] = useState<Profile | null>(null)

  const fetchProfile = useCallback(async () => {
    const response = await api.get(`users/${PROFILE_USERNAME}`)
    setProfile(response.data)
  }, [])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  return (
    <GithubContext.Provider value={{ profile, fetchProfile }}>
      {children}
    </GithubContext.Provider>
  )
}
