import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import FantasyRouteLoader from './components/FantasyRouteLoader'

const AdminLayout = lazy(() => import('./layouts/AdminLayout'))
const AdminPage = lazy(() => import('./pages/AdminPage'))

/**
 * Rutas públicas bajo MainLayout. Admin con code-splitting (chunk separado).
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route
          path="/admin-15-alicia"
          element={
            <Suspense fallback={<FantasyRouteLoader />}>
              <AdminLayout />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<FantasyRouteLoader />}>
                <AdminPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
