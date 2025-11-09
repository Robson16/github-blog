import { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import { useParams } from 'react-router-dom'
import { useContextSelector } from 'use-context-selector'
import { GithubContext, type Issue } from '../../contexts/GithubContext'
import { IssueContainer, LoadingMessage } from './styles'

export function IssuePage() {
  const [issueData, setIssueData] = useState<Issue | null>(null)
  const { issueNumber } = useParams<{ issueNumber: string }>()

  const fetchIssue = useContextSelector(GithubContext, (context) => {
    return context.fetchIssue
  })

  useEffect(() => {
    async function loadIssueData() {
      const number = Number(issueNumber)

      if (isNaN(number)) {
        // TODO: Handle invalid issue number, e.g., send to 404 page.
        return
      }

      const data = await fetchIssue(number)
      setIssueData(data)
    }

    loadIssueData()
  }, [fetchIssue, issueNumber])

  if (!issueData) {
    return (
      <IssueContainer>
        <LoadingMessage>Carregando...</LoadingMessage>
      </IssueContainer>
    )
  }

  return (
    <IssueContainer>
      <h1>{issueData.title}</h1>
      <Markdown>{issueData.body}</Markdown>
    </IssueContainer>
  )
}
