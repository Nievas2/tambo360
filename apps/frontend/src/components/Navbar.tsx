import { Button } from '@/src/components/common/Button'
import { useAuth } from '@/src/hooks/useAuth'
import React from 'react'

const Navbar: React.FC = () => {
  const { logout } = useAuth()

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-5 h-5 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
            />
          </svg>
        </div>
        <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
          NEXUS
        </span>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="outline" className="flex" onClick={logout}>
          Log Out
        </Button>
      </div>
    </nav>
  )
}
export default Navbar
