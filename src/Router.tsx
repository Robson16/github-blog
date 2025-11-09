import { Route, Routes } from 'react-router-dom'
import { DefaultLayout } from './layouts/DefaultLayout'
import { Home } from './pages/Home'
import { lazy, Suspense } from 'react'

const IssuePage = lazy(() =>
  import('./pages/IssuePage').then((module) => ({ default: module.IssuePage })),
)

export function Router() {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/issue/:issueNumber" element={<IssuePage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
