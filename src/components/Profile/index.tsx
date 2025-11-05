import { FaBuilding, FaUserGroup } from 'react-icons/fa6'
import { FiExternalLink } from 'react-icons/fi'
import { IoLogoGithub } from 'react-icons/io5'
import { useContextSelector } from 'use-context-selector'
import { GithubContext } from '../../contexts/GithubContext'
import {
  ProfileAvatar,
  ProfileContainer,
  ProfileGithubLink,
  ProfileInfos,
  ProfileListIcon,
  ProfileTitle,
} from './styles'

export function Profile() {
  const profile = useContextSelector(GithubContext, (context) => {
    return context.profile
  })

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
            <FiExternalLink size={16} />
          </ProfileGithubLink>
          <p>{profile.bio}</p>
          <ProfileListIcon>
            <li>
              <IoLogoGithub size={20} />
              {profile.login}
            </li>

            {profile.company && (
              <li>
                <FaBuilding size={20} />
                {profile.company}
              </li>
            )}

            <li>
              <FaUserGroup size={20} />
              {profile.followers}
            </li>
          </ProfileListIcon>
        </ProfileInfos>
      </ProfileContainer>
    )
  )
}
