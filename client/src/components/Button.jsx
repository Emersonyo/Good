import React from 'react'

export default function Button({ children, className = '', ...props }){
  return (
    <button className={`px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 disabled:opacity-50 ${className}`} {...props}>
      {children}
    </button>
  )
}
