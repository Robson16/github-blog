import { useContextSelector } from 'use-context-selector'
import { HomeContainer } from './styles'
import { GithubContext } from '../../contexts/GithubContext'

export function Home() {
  const profile = useContextSelector(GithubContext, (context) => {
    return context.profile
  })

  return (
    <HomeContainer>
      <h1>Hello GitHub Blog</h1>
      <pre>{profile && JSON.stringify(profile, null, 2)}</pre>
    </HomeContainer>
  )
}
