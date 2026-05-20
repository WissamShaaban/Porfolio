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
          <NavLink to="/#projets" className="">
            Projects
          </NavLink>
        </li>
        <li>
          <NavLink to="/contacts" className={({ isActive }) => isActive ? 'actif' : ''}>
            Contacts
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
