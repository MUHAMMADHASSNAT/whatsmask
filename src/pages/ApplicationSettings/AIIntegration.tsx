import { Save, ExternalLink } from 'lucide-react'
import { useState } from 'react'

export default function AIIntegration() {
  const [openAIToggle, setOpenAIToggle] = useState(false)
  const [chatModel, setChatModel] = useState('gpt-3.5-turbo')
  const [secretKey, setSecretKey] = useState('')

  return (
    <div className="bg-white rounded-xl shadow-soft p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AI Integration</h2>
          <p className="text-sm text-gray-600 mt-1">
            Integrate AI-powered tools to enhance automation and decision-making.
          </p>
        </div>
        <button className="px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-blue-600 flex items-center gap-2">
          <Save size={16} />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-medium text-gray-700">
              Activate OpenAI in the chat.
            </label>
            <button
              onClick={() => setOpenAIToggle(!openAIToggle)}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                openAIToggle ? 'bg-primary-blue' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  openAIToggle ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Chat Model
          </label>
          <select
            value={chatModel}
            onChange={(e) => setChatModel(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
          >
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
            <option value="gpt-4">GPT-4</option>
            <option value="gpt-4-turbo">GPT-4 Turbo</option>
            <option value="gpt-4o-mini">GPT-4o Mini (Fast & Cost-effective)</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Choose the model that fits your needs and budget.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            OpenAI Secret Key
          </label>
          <input
            type="password"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            placeholder="sk-..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
          />
          <a
            href="#"
            className="text-sm text-primary-blue hover:underline flex items-center gap-1 mt-1"
          >
            <ExternalLink size={14} />
            Where you can find secret key?
          </a>
        </div>
      </div>
    </div>
  )
}

