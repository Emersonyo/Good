import React from 'react'
import Sidebar from '../components/Sidebar'
import ChatWindow from '../components/ChatWindow'
import ChatInput from '../components/ChatInput'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useChat } from '../context/ChatContext'

export default function Chat() {
  const { loadConversation } = useChat()
  const { search } = useLocation()

  useEffect(()=>{
    const params = new URLSearchParams(search)
    const c = params.get('c')
    if (c) loadConversation(c)
  }, [search])

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <aside className="w-80 border-r border-gray-800 p-4">
        <Sidebar />
      </aside>
      <main className="flex-1 p-4 flex flex-col">
        <ChatWindow />
        <ChatInput />
      </main>
    </div>
  )
}
