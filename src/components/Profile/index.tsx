import { useEffect, useState } from 'react'
import {
  IoBusiness,
  IoLogoGithub,
  IoOpenOutline,
  IoPeopleSharp,
} from 'react-icons/io5'
import { useContextSelector } from 'use-context-selector'
import { GithubContext, type Profile } from '../../contexts/GithubContext'
import { ListIcons } from '../ListIcons'
import {
  ProfileAvatar,
  ProfileContainer,
  ProfileGithubLink,
  ProfileInfos,
  ProfileTitle,
} from './styles'

const PROFILE_USERNAME = import.meta.env.VITE_GITHUB_USERNAME

export function Profile() {
  const [profile, setProfile] = useState<Profile | null>(null)

  const fetchProfile = useContextSelector(GithubContext, (context) => {
    return context.fetchProfile
  })

  useEffect(() => {
    async function loadProfile() {
      const profile = await fetchProfile(PROFILE_USERNAME)
      setProfile(profile)
    }

    loadProfile()
  }, [fetchProfile])

  if (!profile) {
    return (
      <ProfileContainer>
        <p>Loading...</p>
      </ProfileContainer>
    )
  }

  return (
    profile && (
      <ProfileContainer>
        <ProfileAvatar
          src={profile.avatar_url}
          alt={`Avatar of ${profile.name}`}
        />

        <ProfileInfos>
          <ProfileTitle>{profile.name}</ProfileTitle>
          <ProfileGithubLink
            href={profile.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
            <IoOpenOutline size={16} />
          </ProfileGithubLink>

          <p>{profile.bio}</p>

          <ListIcons>
            <li>
              <IoLogoGithub size={20} />
              {profile.login}
            </li>

            {profile.company && (
              <li>
                <IoBusiness size={20} />
                {profile.company}
              </li>
            )}

            <li>
              <IoPeopleSharp size={20} />
              {profile.followers}
            </li>
          </ListIcons>
        </ProfileInfos>
      </ProfileContainer>
    )
  )
}
