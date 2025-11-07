import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useEffect, useState } from 'react'
import { useContextSelector } from 'use-context-selector'
import { Pagination } from '../../components/Pagination'
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

  const fetchIssues = useContextSelector(GithubContext, (context) => {
    return context.fetchIssues
  })

  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetchIssues(currentPage)
  }, [currentPage, fetchIssues])

  useEffect(() => {
    if (issuesTotalPages > 0 && currentPage > issuesTotalPages) {
      setCurrentPage(issuesTotalPages)
    }
  }, [currentPage, issuesTotalPages])

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

      <Pagination
        currentPage={currentPage}
        totalPages={issuesTotalPages}
        onPageChange={setCurrentPage}
      />
    </HomeContainer>
  )
}
