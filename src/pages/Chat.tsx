import { useState } from 'react'
import { Search, Phone, MoreVertical, Send, Smile, Paperclip, ThumbsUp, ThumbsDown, MessageSquare, Share2 } from 'lucide-react'

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Corbital Technologies',
      text: '**WhatsMarkSaaS** is a multi-tenant Software as a Service (SaaS) platform for WhatsApp marketing businesses. Key features:\n\n**Multi-Tenancy**: Allows multiple customers to use the platform simultaneously.\n\n**Subscription Management**: For creating and managing subscription plans.\n\n**Built on WhatsApp Technology**: Utilizes the WhatsMarkSaaS script with additional functionalities.\n\n**User-Friendly Interface**: Intuitive admin interface requiring basic technical skills.',
      time: '09:04 PM',
      isUser: false
    },
    {
      id: 2,
      sender: 'You',
      text: 'which php version required?',
      time: '09:04 PM',
      isUser: true
    },
    {
      id: 3,
      sender: 'Corbital Technologies',
      text: 'WhatsMarkSaaS requires the following PHP version:\n- *PHP 8.2.18 or higher*',
      time: '09:05 PM',
      isUser: false
    }
  ])
  const [message, setMessage] = useState('')

  const handleSend = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: 'You',
          text: message,
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          isUser: true
        }
      ])
      setMessage('')
    }
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] bg-white rounded-xl shadow-soft overflow-hidden">
      <div className="w-80 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {/* Contact list would go here */}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-purple rounded-full flex items-center justify-center">
              <span className="text-primary-blue font-bold">CT</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">CT Corbital Technologies lead</h3>
              <p className="text-sm text-gray-500">919909919284</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Search size={20} className="text-gray-600" />
            </button>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Phone size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <MoreVertical size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    msg.isUser
                      ? 'bg-primary-blue text-white'
                      : 'bg-white text-gray-900'
                  }`}
                >
                  {!msg.isUser && (
                    <p className="text-xs font-medium mb-1 text-gray-600">{msg.sender}</p>
                  )}
                  <p className="whitespace-pre-wrap text-sm">{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.isUser ? 'text-blue-100' : 'text-gray-500'}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="mb-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              placeholder="Message to Corbital Technologies → Shift + Enter for newline, use @ to mention"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Smile size={20} className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Paperclip size={20} className="text-gray-600" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <ThumbsUp size={20} className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <ThumbsDown size={20} className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <MessageSquare size={20} className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Share2 size={20} className="text-gray-600" />
              </button>
              <button
                onClick={handleSend}
                className="p-2 bg-primary-blue text-white rounded-lg hover:bg-blue-600"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

