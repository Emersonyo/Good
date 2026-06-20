import React, { createContext, useContext, useState } from 'react'
import * as api from '../utils/api'
import { useTheme } from './ThemeContext'

const ChatContext = createContext()

export function ChatProvider({ children }){
  const [messages, setMessages] = useState([])
  const [sending, setSending] = useState(false)
  const [conversationId, setConversationId] = useState(null)
  const { responseLength } = useTheme()

  const sendMessage = async (text) => {
    const userMsg = { role: 'user', content: text }
    setMessages(prev => [...prev, userMsg])
    setSending(true)
    try{
      const res = await api.sendMessage({ message: text, conversationId, responseLength })
      if (res && res.assistant) {
        setMessages(prev => [...prev, res.assistant])
        if (res.conversation && res.conversation._id) setConversationId(res.conversation._id)
      }
    }catch(err){
      console.error('sendMessage error', err)
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, something went wrong.' }])
    }finally{
      setSending(false)
    }
  }

  const loadConversation = async (id) => {
    if (!id) return
    try{
      const convo = await api.getConversation(id)
      setConversationId(convo._id)
      setMessages(convo.messages || [])
    }catch(err){ console.error('loadConversation', err) }
  }

  return (
    <ChatContext.Provider value={{ messages, sendMessage, sending, conversationId, loadConversation }}>
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => useContext(ChatContext)
export const useChatContext = useChat
