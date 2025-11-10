import { AxiosError } from 'axios'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useContextSelector } from 'use-context-selector'
import { Header } from '../../components/Header'
import { Pagination } from '../../components/Pagination'
import { Profile } from '../../components/Profile'
import { SearchForm } from '../../components/SearchForm'
import { GithubContext, type Issue } from '../../contexts/GithubContext'
import { HomeContainer, IssueItem, IssueList, Message } from './styles'

export function Home() {
  const [issues, setIssues] = useState<Issue[]>([])
  const [issuesTotal, setIssuesTotal] = useState(0)
  const [issuesTotalPages, setIssuesTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [searchParams, setSearchParams] = useSearchParams()

  const fetchIssues = useContextSelector(GithubContext, (context) => {
    return context.fetchIssues
  })

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
    async function loadIssues() {
      try {
        setIsLoading(true)
        setError(null)

        const { items, totalItems, totalPages } = await fetchIssues(
          queryFromUrl,
          currentPage,
        )

        setIssues(items)
        setIssuesTotal(totalItems)
        setIssuesTotalPages(totalPages)
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 403) {
          setError(
            'GitHub API request limit reached. Please try again later or add an API token.',
          )
        } else {
          setError('An error occurred while retrieving the issues.')
        }
        console.error('Failed to fetch issues:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadIssues()
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

  if (error) {
    return (
      <>
        <Header>
          <Profile />
        </Header>
        <HomeContainer>
          <Message>{error}</Message>
        </HomeContainer>
      </>
    )
  }

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

        {isLoading ? (
          <Message>Loading...</Message>
        ) : issues.length > 0 ? (
          <>
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
          </>
        ) : (
          <Message>No Issues found.</Message>
        )}
      </HomeContainer>
    </>
  )
}
