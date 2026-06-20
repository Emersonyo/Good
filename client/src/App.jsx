import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Chat from './pages/Chat'
import Settings from './pages/Settings'
import Navbar from './components/Navbar'
import KeyboardShortcuts from './components/KeyboardShortcuts'
import { ChatProvider } from './context/ChatContext'
import { ThemeProvider } from './context/ThemeContext'
import './index.css'

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ChatProvider>
          <div className="min-h-screen bg-gray-900 text-white">
            <Navbar />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
            <KeyboardShortcuts />
          </div>
        </ChatProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
