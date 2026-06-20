import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import * as api from '../utils/api'

export default function KeyboardShortcuts(){
  const navigate = useNavigate()
  const { toggle } = useTheme()

  useEffect(()=>{
    function handler(e){
      const mod = e.ctrlKey || e.metaKey
      if (!mod) return

      // Ctrl/Cmd+N -> New Chat
      if (e.key.toLowerCase() === 'n'){
        e.preventDefault()
        ;(async ()=>{
          try{
            const convo = await api.createConversation({ title: 'New Conversation' })
            navigate(`/chat?c=${convo._id}`)
          }catch(err){ console.error('New chat shortcut failed', err) }
        })()
      }

      // Ctrl/Cmd+K -> Focus chat input
      if (e.key.toLowerCase() === 'k'){
        e.preventDefault()
        const el = document.getElementById('chat-input')
        if (el) el.focus()
      }

      // Ctrl/Cmd+T -> Toggle theme
      if (e.key.toLowerCase() === 't'){
        e.preventDefault()
        toggle()
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [navigate, toggle])

  return null
}
