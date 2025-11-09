import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
  type Ref,
} from 'react'
import {
  IoArrowBack,
  IoCalendarOutline,
  IoChatbubbleEllipsesOutline,
  IoLogoGithub,
  IoOpenOutline,
} from 'react-icons/io5'
import Markdown from 'react-markdown'
import { Link, useParams } from 'react-router-dom'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'
import { useContextSelector } from 'use-context-selector'
import { Header } from '../../components/Header'
import { ListIcons } from '../../components/ListIcons'
import { GithubContext, type Issue } from '../../contexts/GithubContext'
import { IssueContainer, IssueInfos, LoadingMessage } from './styles'

// This refers to the props that react-markdown passes to the 'code' function.
interface CodeProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  node?: any
  className?: string
  children?: ReactNode
  style?: CSSProperties
  ref?: Ref<HTMLElement>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export function IssuePage() {
  const [issue, setIssue] = useState<Issue | null>(null)
  const { issueNumber } = useParams<{ issueNumber: string }>()

  const fetchIssue = useContextSelector(GithubContext, (context) => {
    return context.fetchIssue
  })

  useEffect(() => {
    async function loadIssue() {
      const number = Number(issueNumber)

      if (isNaN(number)) {
        // TODO: Handle invalid issue number, e.g., send to 404 page.
        return
      }

      const data = await fetchIssue(number)
      setIssue(data)
    }

    loadIssue()
  }, [fetchIssue, issueNumber])

  if (!issue) {
    return (
      <IssueContainer>
        <LoadingMessage>Carregando...</LoadingMessage>
      </IssueContainer>
    )
  }

  return (
    <>
      <Header>
        <IssueInfos>
          <nav>
            <Link to={`/`}>
              <IoArrowBack size={20} />
              Voltar
            </Link>

            <a href={issue.html_url} target="_blank" rel="noopener noreferrer">
              Ver no GitHub
              <IoOpenOutline size={16} />
            </a>
          </nav>

          <h1>{issue.title}</h1>

          <ListIcons>
            <li>
              <IoLogoGithub size={20} />
              {issue.user.login}
            </li>

            <li>
              <IoCalendarOutline size={20} />
              {formatDistanceToNow(new Date(issue.created_at), {
                addSuffix: true,
                locale: ptBR,
              })}
            </li>

            <li>
              <IoChatbubbleEllipsesOutline size={20} />
              {issue.comments}
            </li>
          </ListIcons>
        </IssueInfos>
      </Header>

      <IssueContainer>
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ ref, style, className, children, ...props }: CodeProps) {
              const match = /language-(\w+)/.exec(className || '')

              return match ? (
                <SyntaxHighlighter
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  style={dracula as any}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} style={style} ref={ref} {...props}>
                  {children}
                </code>
              )
            },
          }}
        >
          {issue.body}
        </Markdown>
      </IssueContainer>
    </>
  )
}
