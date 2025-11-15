import { useState } from 'react'
import { ArrowLeft, Send, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AIAssistantChat() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: 'user',
      text: 'what is whatsmarksaas ?',
      time: '9:04 PM'
    },
    {
      id: 2,
      user: 'assistant',
      text: '**WhatsMarkSaaS** is a multi-tenant Software as a Service (SaaS) platform for WhatsApp marketing businesses. Key features:\n\n**Multi-Tenancy**: Allows multiple customers to use the platform simultaneously.\n\n**Subscription Management**: For creating and managing subscription plans.\n\n**Built on WhatsApp Technology**: Utilizes the WhatsMarkSaaS script with additional functionalities.\n\n**User-Friendly Interface**: Intuitive admin interface requiring basic technical skills.',
      time: '9:04 PM'
    },
    {
      id: 3,
      user: 'user',
      text: 'which php version required?',
      time: '9:04 PM'
    },
    {
      id: 4,
      user: 'assistant',
      text: 'WhatsMarkSaaS requires the following PHP version:\n- *PHP 8.2.18 or higher*',
      time: '9:05 PM'
    }
  ])

  const handleSend = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          user: 'user',
          text: message,
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        }
      ])
      setMessage('')
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
              <h2 className="text-xl font-bold text-gray-900">FAQ Genius</h2>
              <p className="text-sm text-gray-500">gpt-4o-mini</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
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
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    <p className={`text-xs mt-2 ${msg.user === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            />
            <button
              onClick={handleSend}
              className="p-2 bg-primary-blue text-white rounded-lg hover:bg-blue-600"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="w-80 bg-white rounded-xl shadow-soft p-4">
        <h3 className="font-semibold text-gray-900 mb-4">Knowledge Base</h3>
        <div className="space-y-2">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <FileText size={16} className="text-gray-400" />
              <span className="text-sm font-medium text-gray-900">faq.md</span>
            </div>
            <p className="text-xs text-green-600">md Synced</p>
          </div>
        </div>
      </div>
    </div>
  )
}

