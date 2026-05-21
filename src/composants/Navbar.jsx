import { NavLink } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-logo">
        Madelyn Torff
      </NavLink>
      <ul className="navbar-liens">
        <li>
          <NavLink to="/a-propos" className={({ isActive }) => isActive ? 'actif' : ''}>
            About
          </NavLink>
        </li>
        <li>
          <a href="/#projets">Projects</a>
        </li>
        <li>
          <a href="mailto:contact@example.com">Contacts</a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
