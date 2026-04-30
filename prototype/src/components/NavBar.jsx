import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useApp } from '../App'
import { cn } from '../lib/utils'

export default function NavBar() {
  const { user } = useApp()
  const navigate = useNavigate()

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/loan-details', label: 'My Loan' },
    { to: '/apply', label: 'Apply' },
  ]

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6 h-[64px] flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => navigate('/dashboard')}
          className="text-green-600 font-bold text-xl tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 rounded"
          aria-label="Groundwork — go to dashboard"
        >
          Groundwork
        </button>

        {/* Nav links */}
        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-1" role="list">
            {navLinks.map(link => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      'px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2',
                      isActive
                        ? 'text-green-600'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <span
                          className="absolute bottom-0 left-4 right-4 h-0.5 bg-green-600 rounded-full"
                          aria-hidden="true"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Profile avatar */}
        <button
          className="w-9 h-9 rounded-full bg-green-600 text-white text-sm font-semibold flex items-center justify-center hover:bg-green-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
          aria-label={`Profile menu for ${user.name}`}
        >
          {user.initials}
        </button>
      </div>
    </header>
  )
}
