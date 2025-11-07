import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useContextSelector } from 'use-context-selector'
import { Profile } from '../../components/Profile'
import { GithubContext } from '../../contexts/GithubContext'
import { HomeContainer, IssueItem, IssueList } from './styles'

export function Home() {
  const issues = useContextSelector(GithubContext, (context) => {
    return context.issues
  })

  const issuesTotalPages = useContextSelector(GithubContext, (context) => {
    return context.issuesTotalPages
  })

  return (
    <HomeContainer>
      <Profile />

      <IssueList>
        {issues.map((issue) => {
          return (
            <IssueItem key={issue.id}>
              <header>
                <h1>{issue.title.slice(0, 46) + '...'}</h1>
                <span>
                  {formatDistanceToNow(new Date(issue.created_at), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </span>
              </header>
              <p>{issue.body.slice(0, 150) + '...'}</p>
            </IssueItem>
          )
        })}
      </IssueList>

      <p>Total de páginas: {issuesTotalPages}</p>
    </HomeContainer>
  )
}
