import { Save } from 'lucide-react'
import { useState, useEffect } from 'react'
import { storage } from '../../utils/storage'
import { showToast } from '../../components/ToastContainer'

export default function AutoClearChat() {
  const [enabled, setEnabled] = useState(false)
  const [clearInterval, setClearInterval] = useState(30)
  const [clearAfterDays, setClearAfterDays] = useState(7)

  useEffect(() => {
    const saved = storage.get('auto-clear-chat', {
      enabled: false,
      clearInterval: 30,
      clearAfterDays: 7
    })
    setEnabled(saved.enabled)
    setClearInterval(saved.clearInterval)
    setClearAfterDays(saved.clearAfterDays)
  }, [])

  const handleSave = () => {
    if (enabled && clearInterval < 1) {
      showToast('Clear interval must be at least 1 day', 'error')
      return
    }
    storage.set('auto-clear-chat', {
      enabled,
      clearInterval,
      clearAfterDays
    })
    showToast('Auto Clear Chat settings saved successfully', 'success')
  }

  return (
    <div className="bg-white rounded-xl shadow-soft p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Auto Clear Chat History</h2>
          <p className="text-sm text-gray-600 mt-1">
            Automatically clear chat history after a specified period to save storage space.
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
                Enable Auto Clear
              </label>
              <p className="text-xs text-gray-500 mt-1">
                Automatically clear old chat history
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
            Clear Chat History After (Days)
          </label>
          <input
            type="number"
            min="1"
            value={clearAfterDays}
            onChange={(e) => setClearAfterDays(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            disabled={!enabled}
          />
          <p className="text-xs text-gray-500 mt-1">
            Chat history older than this number of days will be automatically cleared
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Clear Interval (Days)
          </label>
          <input
            type="number"
            min="1"
            value={clearInterval}
            onChange={(e) => setClearInterval(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            disabled={!enabled}
          />
          <p className="text-xs text-gray-500 mt-1">
            How often to run the auto-clear process (in days)
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-yellow-900 mb-2">⚠️ Warning</h3>
          <p className="text-xs text-yellow-800">
            Once chat history is cleared, it cannot be recovered. Make sure to export important conversations before enabling this feature.
          </p>
        </div>
      </div>
    </div>
  )
}

