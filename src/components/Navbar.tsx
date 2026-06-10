import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface NavbarProps {
  transparent?: boolean
}

export default function Navbar({ transparent = false }: NavbarProps) {
  const { state, logout } = useAuth()

  return (
    <nav className={`flex items-center justify-between px-10 py-6 ${transparent ? 'absolute top-0 left-0 right-0 z-50' : 'border-b border-gray-100'}`}>
      <NavLink to="/" className="text-xl font-semibold tracking-tight text-gray-900">
        Madelyn Torff
      </NavLink>
      <ul className="flex items-center gap-8 list-none">
        <li>
          <NavLink
            to="/a-propos"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${isActive ? 'text-yellow-500' : 'text-gray-700 hover:text-gray-900'}`
            }
          >
            About
          </NavLink>
        </li>
        <li>
          <a href="/#projets" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
            Projects
          </a>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${isActive ? 'text-yellow-500' : 'text-gray-700 hover:text-gray-900'}`
            }
          >
            Contact
          </NavLink>
        </li>
        {state.isAuthenticated && (
          <>
            <li>
              <NavLink
                to="/admin/projects"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${isActive ? 'text-yellow-500' : 'text-gray-700 hover:text-gray-900'}`
                }
              >
                Admin
              </NavLink>
            </li>
            <li>
              <button
                onClick={logout}
                className="text-sm font-medium text-gray-500 hover:text-red-500 transition-colors"
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}
