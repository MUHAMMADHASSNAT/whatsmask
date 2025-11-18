import { useState, useEffect } from 'react'
import { Plus, Sparkles, MessageSquare, Trash2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { storage } from '../utils/storage'
import { showToast } from '../components/ToastContainer'

interface AIAssistant {
  id: string
  name: string
  description: string
  model: string
  createdAt: string
}

export default function AIAssistant() {
  const navigate = useNavigate()
  const [assistants, setAssistants] = useState<AIAssistant[]>([])

  useEffect(() => {
    const saved = storage.get<AIAssistant[]>('ai-assistants', [])
    setAssistants(saved)
  }, [])

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this assistant?')) {
      const updated = assistants.filter((a) => a.id !== id)
      setAssistants(updated)
      storage.set('ai-assistants', updated)
      showToast('Assistant deleted successfully', 'success')
    }
  }

  if (assistants.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">AI Assistant</h1>
          <Link
            to="/ai-assistant/create"
            className="px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
          >
            <Plus size={16} />
            <span>Create New Assistant</span>
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-soft p-12 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-primary-purple rounded-full flex items-center justify-center">
              <Sparkles size={40} className="text-primary-blue" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Personal Assistants Yet</h2>
          <p className="text-gray-600 mb-6">
            Create your first AI assistant to help with document analysis, customer support, and more.
          </p>
          <Link
            to="/ai-assistant/create"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-blue text-white rounded-lg hover:bg-blue-600"
          >
            <Plus size={16} />
            <span>Create Assistant</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">AI Assistant</h1>
        <Link
          to="/ai-assistant/create"
          className="px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          <Plus size={16} />
          <span>Create New Assistant</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assistants.map((assistant) => (
          <div
            key={assistant.id}
            className="bg-white rounded-xl shadow-soft p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-primary-purple rounded-lg flex items-center justify-center">
                <Sparkles size={24} className="text-primary-blue" />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/ai-assistant/${assistant.id}/chat`)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Chat"
                >
                  <MessageSquare size={18} />
                </button>
                <button
                  onClick={() => handleDelete(assistant.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{assistant.name}</h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{assistant.description}</p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{assistant.model}</span>
              <span>{new Date(assistant.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

