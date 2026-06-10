import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center gap-6 text-center px-10">
        <p className="text-8xl font-bold text-gray-100">404</p>
        <h1 className="text-3xl font-bold text-gray-900 -mt-8">Page introuvable</h1>
        <p className="text-gray-500 max-w-sm">
          La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-full hover:bg-yellow-300 transition-colors"
        >
          Retour à l'accueil
        </Link>
      </main>
    </div>
  )
}
