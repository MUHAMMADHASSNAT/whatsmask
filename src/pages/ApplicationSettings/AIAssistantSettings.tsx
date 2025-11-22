import { Save } from 'lucide-react'
import { useState, useEffect } from 'react'
import { storage } from '../../utils/storage'
import { showToast } from '../../components/ToastContainer'

export default function AIAssistantSettings() {
  const [enabled, setEnabled] = useState(false)
  const [assistantName, setAssistantName] = useState('AI Assistant')
  const [responseDelay, setResponseDelay] = useState(1000)
  const [maxTokens, setMaxTokens] = useState(150)
  const [temperature, setTemperature] = useState(0.7)

  useEffect(() => {
    const saved = storage.get('ai-assistant-settings', {
      enabled: false,
      assistantName: 'AI Assistant',
      responseDelay: 1000,
      maxTokens: 150,
      temperature: 0.7
    })
    setEnabled(saved.enabled)
    setAssistantName(saved.assistantName)
    setResponseDelay(saved.responseDelay)
    setMaxTokens(saved.maxTokens)
    setTemperature(saved.temperature)
  }, [])

  const handleSave = () => {
    if (enabled && !assistantName.trim()) {
      showToast('Please enter assistant name', 'error')
      return
    }
    storage.set('ai-assistant-settings', {
      enabled,
      assistantName,
      responseDelay,
      maxTokens,
      temperature
    })
    showToast('AI Assistant settings saved successfully', 'success')
  }

  return (
    <div className="bg-white rounded-xl shadow-soft p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AI Assistant</h2>
          <p className="text-sm text-gray-600 mt-1">
            Configure AI Assistant behavior and response settings.
          </p>
        </div>
        <button 
          onClick={handleSave}
          className="px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          <Save size={16} />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Enable AI Assistant
              </label>
              <p className="text-xs text-gray-500 mt-1">
                Activate AI-powered assistant for automated responses
              </p>
            </div>
            <button
              onClick={() => setEnabled(!enabled)}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                enabled ? 'bg-primary-blue' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  enabled ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Assistant Name
          </label>
          <input
            type="text"
            value={assistantName}
            onChange={(e) => setAssistantName(e.target.value)}
            placeholder="Enter assistant name..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            disabled={!enabled}
          />
          <p className="text-xs text-gray-500 mt-1">
            The name that will be displayed for the AI assistant
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Response Delay (ms): {responseDelay}
          </label>
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={responseDelay}
            onChange={(e) => setResponseDelay(Number(e.target.value))}
            className="w-full"
            disabled={!enabled}
          />
          <p className="text-xs text-gray-500 mt-1">
            Delay before sending AI response (in milliseconds)
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Tokens: {maxTokens}
          </label>
          <input
            type="range"
            min="50"
            max="500"
            step="10"
            value={maxTokens}
            onChange={(e) => setMaxTokens(Number(e.target.value))}
            className="w-full"
            disabled={!enabled}
          />
          <p className="text-xs text-gray-500 mt-1">
            Maximum length of AI response
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Temperature: {temperature.toFixed(1)}
          </label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
            className="w-full"
            disabled={!enabled}
          />
          <p className="text-xs text-gray-500 mt-1">
            Controls randomness of responses (0 = deterministic, 2 = very creative)
          </p>
        </div>
      </div>
    </div>
  )
}

