import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'

export default function ConversationItem({ convo }){
  return (
    <li role="listitem" className="p-2 rounded hover:bg-gray-800">
      <Link to={`/chat?c=${convo._id}`} aria-label={`Open conversation ${convo.title || 'Untitled'}`} className="flex items-center justify-between">
        <div>
          <div className="font-medium">{convo.title || 'Untitled'}</div>
          <div className="text-xs text-gray-500">{format(new Date(convo.createdAt), 'PP p')}</div>
        </div>
        <div className="text-xs text-gray-400">{convo.messages?.length || 0}</div>
      </Link>
    </li>
  )
}
