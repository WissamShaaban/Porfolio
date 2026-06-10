import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from './context/AuthContext'
import { AppProvider } from './context/ProjectsContext'
import ProtectedRoute from './components/ProtectedRoute'
import PageTransition from './components/PageTransition'
import { GOOGLE_CLIENT_ID } from './services/googleAuth'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Login = lazy(() => import('./pages/Login'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const NotFound = lazy(() => import('./pages/NotFound'))
const AdminLayout = lazy(() => import('./layouts/AdminLayout'))
const AdminProjects = lazy(() => import('./pages/admin/AdminProjects'))
const AdminContacts = lazy(() => import('./pages/admin/AdminContacts'))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID ?? ''}>
      <AuthProvider>
        <AppProvider>
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <PageTransition>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/a-propos" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/projects/:id" element={<ProjectDetail />} />

                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute>
                        <AdminLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<Navigate to="/admin/projects" replace />} />
                    <Route path="projects" element={<AdminProjects />} />
                    <Route path="contacts" element={<AdminContacts />} />
                  </Route>

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </PageTransition>
            </Suspense>
          </BrowserRouter>
        </AppProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  )
}
