import React, { useEffect, useState } from 'react'
import ConversationList from './ConversationList'
import { createConversation as apiCreate } from '../utils/api'
import ThemeToggle from './ThemeToggle'

export default function Sidebar() {
  const [creating, setCreating] = useState(false)

  const onNew = async () => {
    setCreating(true)
    try{
      await apiCreate({ title: 'New Conversation' })
      // TODO: refresh list via context or prop (simple refresh via reload for now)
      window.location.reload()
    }catch(e){
      console.error(e)
    }finally{ setCreating(false) }
  }

  return (
    <nav className="flex flex-col gap-4 h-full" aria-label="Sidebar navigation">
      <div className="flex items-center gap-2">
        <button id="new-chat-btn" onClick={onNew} aria-keyshortcuts="Ctrl+N" aria-label="New chat (Ctrl+N)" className="px-3 py-2 rounded bg-blue-600">+ New Chat</button>
        <ThemeToggle />
      </div>
      <div className="flex-1 overflow-auto" role="region" aria-label="Conversations">
        <ConversationList />
      </div>
      <div className="text-xs text-gray-500">Settings · About</div>
    </nav>
  )
}
