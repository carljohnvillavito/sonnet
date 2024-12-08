'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useChat } from 'ai/react'

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
  })
  const [typingIndicator, setTypingIndicator] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  useEffect(() => {
    setTypingIndicator(isLoading)
  }, [isLoading])

  return (
    <div className="flex flex-col h-screen bg-blue-900 text-white">
      <header className="bg-red-600 p-4 text-center">
        <h1 className="text-3xl font-bold">Sonnet: The Superman AI</h1>
      </header>
      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className={`mb-4 ${
                message.role === 'user' ? 'text-right' : 'text-left'
              }`}
            >
              <div
                className={`inline-block p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-yellow-500'
                    : 'bg-blue-700'
                }`}
              >
                <p>{message.content}</p>
                <small className="text-xs opacity-50">
                  {new Date().toLocaleTimeString()}
                </small>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {typingIndicator && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="text-left mb-4"
          >
            <div className="inline-block p-3 rounded-lg bg-blue-700">
              <p>Sonnet is typing...</p>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="p-4 bg-gray-800">
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-1 p-2 rounded-l-lg text-black"
          />
          <button
            type="submit"
            className="bg-red-600 text-white p-2 rounded-r-lg hover:bg-red-700 transition-colors duration-300"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )
}

