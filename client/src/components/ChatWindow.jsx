import React from 'react'
import { useChat } from '../context/ChatContext'
import Message from './Message'

export default function ChatWindow() {
  const { messages } = useChat()

  return (
    <div className="flex-1 overflow-auto p-4 space-y-4" id="chat-window">
      {messages.length === 0 && (
        <div className="text-gray-400">Start the conversation by typing below.</div>
      )}
      {messages.map((m, idx) => (
        <Message key={idx} message={m} />
      ))}
    </div>
  )
}
