import { useState, useEffect, useRef } from 'react'
import { ArrowLeft, Send, FileText, Loader2 } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { storage } from '../utils/storage'
import { generateAIResponse } from '../utils/aiResponse'
import { showToast } from '../components/ToastContainer'

interface Message {
  id: number
  user: 'user' | 'assistant'
  text: string
  time: string
}

export default function AIAssistantChat() {
  const { id } = useParams()
  const [assistant, setAssistant] = useState<any>(null)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (id) {
      const assistants = storage.get<any[]>('ai-assistants', [])
      const found = assistants.find((a) => a.id === id)
      setAssistant(found || { name: 'FAQ Genius', model: 'gpt-4o-mini' })
      
      // Load chat history
      const chatHistory = storage.get<Message[]>(`chat-${id}`, [])
      if (chatHistory.length > 0) {
        setMessages(chatHistory)
      }
    }
  }, [id])

  useEffect(() => {
    // Auto scroll to bottom when new message arrives
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!message.trim() || isLoading) return

    const userMessage = message.trim()
    const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

    // Add user message
    const newUserMessage: Message = {
      id: Date.now(),
      user: 'user',
      text: userMessage,
      time: currentTime
    }

    setMessages((prev) => [...prev, newUserMessage])
    setMessage('')
    setIsLoading(true)

    // Save user message
    const updatedMessages = [...messages, newUserMessage]
    if (id) {
      storage.set(`chat-${id}`, updatedMessages)
    }

    try {
      // Generate AI response
      const aiResponse = await generateAIResponse(userMessage, assistant)
      
      const assistantMessage: Message = {
        id: Date.now() + 1,
        user: 'assistant',
        text: aiResponse.text,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }

      setMessages((prev) => [...prev, assistantMessage])
      
      // Save assistant response
      const finalMessages = [...updatedMessages, assistantMessage]
      if (id) {
        storage.set(`chat-${id}`, finalMessages)
      }
    } catch (error) {
      showToast('Error generating response', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear this chat? All messages will be deleted.')) {
      setMessages([])
      if (id) {
        storage.remove(`chat-${id}`)
      }
      showToast('Chat cleared successfully', 'success')
    }
  }

  return (
    <div className="flex gap-6 h-[calc(100vh-8rem)]">
      <div className="flex-1 bg-white rounded-xl shadow-soft flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/ai-assistant"
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </Link>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{assistant?.name || 'FAQ Genius'}</h2>
              <p className="text-sm text-gray-500">{assistant?.model || 'gpt-4o-mini'}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleClearChat}
              className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Clear Chat
            </button>
            <span className="text-sm text-green-600">• Synced</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 bg-primary-purple rounded-full flex items-center justify-center mb-4">
                <FileText size={32} className="text-primary-blue" />
              </div>
              <p className="text-gray-600">
                Start a conversation. Ask your assistant anything about the uploaded documents or any topic you'd like to discuss.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.user === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-4 ${
                      msg.user === 'user'
                        ? 'bg-primary-blue text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.text}</p>
                    <p className={`text-xs mt-2 ${msg.user === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-4 flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-primary-blue" />
                    <span className="text-sm text-gray-600">AI is thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              placeholder="Type your message... (Press Enter to send)"
              disabled={isLoading}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !message.trim()}
              className="p-2 bg-primary-blue text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Send size={20} />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="w-80 bg-white rounded-xl shadow-soft p-4">
        <h3 className="font-semibold text-gray-900 mb-4">Knowledge Base</h3>
        <div className="space-y-2">
          {assistant?.files && assistant.files.length > 0 ? (
            assistant.files.map((file: any, index: number) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <FileText size={16} className="text-gray-400" />
                  <span className="text-sm font-medium text-gray-900">{file.name}</span>
                </div>
                <p className="text-xs text-green-600">Synced</p>
              </div>
            ))
          ) : (
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <FileText size={16} className="text-gray-400" />
                <span className="text-sm font-medium text-gray-900">No files uploaded</span>
              </div>
              <p className="text-xs text-gray-500">Upload files when creating assistant</p>
            </div>
          )}
        </div>
        <div className="mt-6 p-3 bg-blue-50 rounded-lg">
          <p className="text-xs font-medium text-blue-900 mb-2">💡 Tips:</p>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Ask about WhatsMarkSaaS features</li>
            <li>• Get help with configuration</li>
            <li>• Ask technical questions</li>
            <li>• Request documentation help</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

