import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { api } from '../services/github/api'
import { GithubProfileContext, type Profile } from './GithubProfileContext'

const PROFILE_USERNAME = import.meta.env.VITE_GITHUB_USERNAME

interface GithubProfileProviderProps {
  children: ReactNode
}

export function GithubProfileProvider({
  children,
}: GithubProfileProviderProps) {
  const [profile, setProfile] = useState<Profile | null>(null)

  const fetchProfile = useCallback(async () => {
    const response = await api.get(`users/${PROFILE_USERNAME}`)
    setProfile(response.data)
  }, [])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  return (
    <GithubProfileContext.Provider value={{ profile, fetchProfile }}>
      {children}
    </GithubProfileContext.Provider>
  )
}
