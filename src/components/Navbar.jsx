import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

export default function Navbar() {
  const { dispatch } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
    navigate('/login')
  }

  const tabs = [
    {
      path: '/dashboard',
      label: 'Home',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      path: '/tasks',
      label: 'Tasks',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
        </svg>
      ),
    },
    {
      path: '/profile',
      label: 'Profile',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
  ]

  return (
    <>
      {/* Top bar */}
      <nav className="navbar">
        <div className="nav-logo">Ayonima</div>
        <div className="nav-links">
          {tabs.map((t) => (
            <NavLink
              key={t.path}
              to={t.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {t.label === 'Home' ? 'Dashboard' : t.label}
            </NavLink>
          ))}
          <button className="nav-link logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Mobile bottom tab bar */}
      <div className="bottom-nav">
        <div className="bottom-nav-inner">
          {tabs.map((t) => (
            <NavLink
              key={t.path}
              to={t.path}
              className={({ isActive }) => `bottom-tab ${isActive ? 'active' : ''}`}
            >
              {t.icon}
              {t.label}
            </NavLink>
          ))}
          <button className="bottom-tab-logout" onClick={handleLogout}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </>
  )
}
