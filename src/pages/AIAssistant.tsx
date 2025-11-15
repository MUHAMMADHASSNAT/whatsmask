import { Plus, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AIAssistant() {
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

