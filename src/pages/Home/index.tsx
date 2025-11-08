import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
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

  const [searchParams, setSearchParams] = useSearchParams()

  const pageFromUrl = Number(searchParams.get('page'))
  const currentPage = pageFromUrl && pageFromUrl > 0 ? pageFromUrl : 1

  function handlePageChange(page: number) {
    setSearchParams((state) => {
      state.set('page', String(page))
      return state
    })
  }

  useEffect(() => {
    fetchIssues(currentPage)
  }, [currentPage, fetchIssues])

  // If the total number of pages has loaded and we are on an invalid page, correct the URL.
  useEffect(() => {
    if (issuesTotalPages > 0 && currentPage > issuesTotalPages) {
      setSearchParams(
        (state) => {
          state.set('page', String(issuesTotalPages))
          return state
        },
        { replace: true },
      ) // replace: true to avoid cluttering the history
    }
  }, [currentPage, issuesTotalPages, setSearchParams])

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
        onPageChange={handlePageChange}
      />
    </HomeContainer>
  )
}
