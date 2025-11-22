import { Save } from 'lucide-react'
import { useState, useEffect } from 'react'
import { storage } from '../../utils/storage'
import { showToast } from '../../components/ToastContainer'

export default function StopBot() {
  const [enabled, setEnabled] = useState(false)
  const [stopKeywords, setStopKeywords] = useState<string[]>(['stop', 'unsubscribe', 'cancel'])
  const [newKeyword, setNewKeyword] = useState('')
  const [stopMessage, setStopMessage] = useState('You have been unsubscribed. You will no longer receive messages from us.')

  useEffect(() => {
    const saved = storage.get('stop-bot', {
      enabled: false,
      stopKeywords: ['stop', 'unsubscribe', 'cancel'],
      stopMessage: 'You have been unsubscribed. You will no longer receive messages from us.'
    })
    setEnabled(saved.enabled)
    setStopKeywords(saved.stopKeywords)
    setStopMessage(saved.stopMessage)
  }, [])

  const handleAddKeyword = () => {
    if (!newKeyword.trim()) {
      showToast('Please enter a keyword', 'error')
      return
    }
    if (stopKeywords.includes(newKeyword.toLowerCase())) {
      showToast('Keyword already exists', 'error')
      return
    }
    setStopKeywords([...stopKeywords, newKeyword.toLowerCase()])
    setNewKeyword('')
  }

  const handleRemoveKeyword = (keyword: string) => {
    setStopKeywords(stopKeywords.filter(k => k !== keyword))
  }

  const handleSave = () => {
    if (enabled && stopKeywords.length === 0) {
      showToast('Please add at least one stop keyword', 'error')
      return
    }
    storage.set('stop-bot', {
      enabled,
      stopKeywords,
      stopMessage
    })
    showToast('Stop Bot settings saved successfully', 'success')
  }

  return (
    <div className="bg-white rounded-xl shadow-soft p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Stop Bot</h2>
          <p className="text-sm text-gray-600 mt-1">
            Configure keywords that will stop the bot from sending messages to users.
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
                Enable Stop Bot
              </label>
              <p className="text-xs text-gray-500 mt-1">
                Allow users to stop receiving messages by sending stop keywords
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
            Stop Keywords
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddKeyword()}
              placeholder="Enter stop keyword..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
              disabled={!enabled}
            />
            <button
              onClick={handleAddKeyword}
              className="px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-blue-600"
              disabled={!enabled}
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {stopKeywords.map((keyword, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm flex items-center gap-2"
              >
                {keyword}
                {enabled && (
                  <button
                    onClick={() => handleRemoveKeyword(keyword)}
                    className="text-blue-700 hover:text-red-600"
                  >
                    ×
                  </button>
                )}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Users sending these keywords will stop receiving messages
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Stop Confirmation Message
          </label>
          <textarea
            rows={3}
            value={stopMessage}
            onChange={(e) => setStopMessage(e.target.value)}
            placeholder="Enter confirmation message..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            disabled={!enabled}
          />
          <p className="text-xs text-gray-500 mt-1">
            This message will be sent when a user uses a stop keyword
          </p>
        </div>
      </div>
    </div>
  )
}

