import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

SyntaxHighlighter.registerLanguage('javascript', js)

export default function Message({ message }) {
  const isUser = message.role === 'user'
  return (
    <div className={`${isUser ? 'justify-end' : 'justify-start'} flex` }>
      <div className={`${isUser ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-100'} p-3 rounded-lg max-w-[70%]` }>
        <ReactMarkdown components={{
          code({node, inline, className, children, ...props}){
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter style={atomOneDark} language={match[1]} PreTag="div" {...props}>
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>{children}</code>
            )
          }
        }}>{message.content}</ReactMarkdown>
      </div>
    </div>
  )
}
