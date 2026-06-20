import React from 'react'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle(){
  const { theme, toggle } = useTheme()
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      title="Toggle theme"
      aria-pressed={theme === 'dark'}
      className="px-2 py-1 rounded bg-gray-800"
    >
      {theme === 'dark' ? 'Dark' : 'Light'}
    </button>
  )
}
