import React, { useEffect, useState } from 'react'
import { fetchConversations } from '../utils/api'
import ConversationItem from './ConversationItem'

export default function ConversationList(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    let mounted = true
    setLoading(true)
    fetchConversations().then(data=>{ if(mounted) setItems(data) }).catch(()=>{}).finally(()=>mounted && setLoading(false))
    return ()=> mounted = false
  }, [])

  if (loading) return <div className="text-gray-400">Loading...</div>
  if (items.length === 0) return <div className="text-gray-400">No conversations</div>

  return (
    <ul className="space-y-2" role="list" aria-label="Conversation list">
      {items.map(i => <ConversationItem key={i._id} convo={i} />)}
    </ul>
  )
}
