import React, { useState } from 'react'
import { useChat } from '../context/ChatContext'

export default function ChatInput(){
  const [text, setText] = useState('')
  const { sendMessage, sending } = useChat()

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  const onSend = async () => {
    if (!text.trim()) return
    await sendMessage(text.trim())
    setText('')
  }

  return (
    <div className="mt-4">
      <textarea
        id="chat-input"
        aria-label="Chat message input"
        value={text}
        onChange={e=>setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message... Shift+Enter for newline"
        className="w-full min-h-[80px] p-3 rounded bg-gray-800 resize-none"
      />
      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-gray-400">{text.length} chars</div>
        <div>
          <button onClick={onSend} disabled={sending} className="px-4 py-2 rounded bg-blue-600 disabled:opacity-50">Send</button>
        </div>
      </div>
    </div>
  )
}
