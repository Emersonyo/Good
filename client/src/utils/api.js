import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'
const client = axios.create({ baseURL, timeout: 20000 })

export async function sendMessage(payload){
  const res = await client.post('/api/chat', payload)
  return res.data
}

export async function fetchConversations(){
  const res = await client.get('/api/conversations')
  return res.data
}

export async function getConversation(id){
  const res = await client.get(`/api/conversations/${id}`)
  return res.data
}

export async function createConversation(payload){
  const res = await client.post('/api/conversations', payload)
  return res.data
}

export async function renameConversation(id, payload){
  const res = await client.patch(`/api/conversations/${id}`, payload)
  return res.data
}

export async function deleteConversation(id){
  const res = await client.delete(`/api/conversations/${id}`)
  return res.data
}

export async function clearConversations(){
  const res = await client.delete(`/api/conversations`)
  return res.data
}
