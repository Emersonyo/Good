import React, { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ThemeContext = createContext()

export function ThemeProvider({ children }){
  const [theme, setTheme] = useLocalStorage('emerson:theme', 'dark')
  const [fontSize, setFontSize] = useLocalStorage('emerson:fontSize', '16')
  const [responseLength, setResponseLength] = useLocalStorage('emerson:responseLength', 'medium')

  const toggle = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))

  const wrapperStyle = { fontSize: `${Number(fontSize) || 16}px` }

  return (
    <ThemeContext.Provider value={{ theme, toggle, fontSize, setFontSize, responseLength, setResponseLength }}>
      <div data-theme={theme} style={wrapperStyle}>{children}</div>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
