import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useApp } from '../context/ProjectsContext'

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const { state } = useApp()
  const navigate = useNavigate()

  const project = state.projects.find(p => p.id === id)

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center flex-col gap-6">
          <p className="text-6xl font-bold text-gray-200">404</p>
          <p className="text-gray-500">Projet introuvable.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2.5 bg-yellow-400 text-gray-900 font-semibold rounded-full hover:bg-yellow-300 transition-colors"
          >
            Retour à l'accueil
          </button>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 px-10 lg:px-20 py-16">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Retour
        </button>

        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-5xl font-bold text-gray-900 mb-6">{project.title}</h1>

          {project.image && (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-96 object-cover rounded-3xl mb-10 shadow-sm"
            />
          )}

          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            {project.fullDescription ?? project.description}
          </p>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-full hover:bg-yellow-300 transition-colors"
            >
              Voir le projet
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
