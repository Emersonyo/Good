import React from 'react'
import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  return (
    <header className="h-16 border-b border-gray-800 flex items-center px-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full" />
        <Link to="/" className="text-xl font-semibold">Emerson</Link>
      </div>
      <nav className="ml-auto flex items-center gap-4">
        <Link to="/chat" className="px-3 py-1 rounded bg-gray-800">Chat</Link>
        <Link to="/settings" className="px-3 py-1 rounded bg-gray-800">Settings</Link>
        <ThemeToggle />
      </nav>
    </header>
  )
}
