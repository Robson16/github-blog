import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useContextSelector } from 'use-context-selector'
import { Header } from '../../components/Header'
import { Pagination } from '../../components/Pagination'
import { Profile } from '../../components/Profile'
import { SearchForm } from '../../components/SearchForm'
import { GithubContext } from '../../contexts/GithubContext'
import { HomeContainer, IssueItem, IssueList } from './styles'

export function Home() {
  const issues = useContextSelector(GithubContext, (context) => {
    return context.issues
  })

  const issuesTotal = useContextSelector(GithubContext, (context) => {
    return context.issuesTotal
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

  const queryFromUrl = searchParams.get('q') || ''

  function handlePageChange(page: number) {
    setSearchParams((state) => {
      state.set('page', String(page))
      return state
    })
  }

  useEffect(() => {
    fetchIssues(queryFromUrl, currentPage)
  }, [currentPage, queryFromUrl, fetchIssues])

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
    <>
      <Header>
        <Profile />
      </Header>

      <HomeContainer>
        <header>
          <h1>Issues</h1>
          <span>{issuesTotal} issues</span>
        </header>

        <SearchForm />

        <IssueList>
          {issues.map((issue) => {
            return (
              <IssueItem key={issue.id} to={`/issue/${issue.number}`}>
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
    </>
  )
}
