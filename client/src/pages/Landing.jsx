import React from 'react'
import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <section className="p-12 bg-gradient-to-br from-black/60 via-gray-900/60 to-black/60 rounded-xl shadow-lg">
        <h1 className="text-5xl font-extrabold mb-4">Meet Emerson</h1>
        <p className="text-gray-300 mb-6">Your intelligent AI assistant built for conversations, creativity, learning, and productivity.</p>
        <div className="flex gap-4">
          <Link to="/chat" className="px-6 py-3 rounded bg-blue-600 hover:bg-blue-500">Start Chatting</Link>
          <a href="#features" className="px-6 py-3 rounded border border-gray-700">Learn More</a>
        </div>
      </section>
    </main>
  )
}
