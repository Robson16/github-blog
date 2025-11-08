import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import * as zod from 'zod'
import { SearchFormContainer } from './styles'
import { zodResolver } from '@hookform/resolvers/zod'

const searchFormSchema = zod.object({
  query: zod.string(),
})

type SearchFormInputs = zod.infer<typeof searchFormSchema>

export function SearchForm() {
  const [searchParams, setSearchParams] = useSearchParams()

  const queryFromUrl = searchParams.get('q') || ''

  const { register, handleSubmit } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      query: queryFromUrl,
    },
  })

  function handleSearchIssues(data: SearchFormInputs) {
    setSearchParams((state) => {
      state.set('q', data.query)
      state.set('page', '1')
      return state
    })
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchIssues)}>
      <input type="text" placeholder="Buscar conteúdo" {...register('query')} />
      <button type="submit">Buscar</button>
    </SearchFormContainer>
  )
}
