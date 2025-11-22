import { Save } from 'lucide-react'
import { useState, useEffect } from 'react'
import { storage } from '../../utils/storage'
import { showToast } from '../../components/ToastContainer'

export default function WhatsAppAutoLead() {
  const [enabled, setEnabled] = useState(false)
  const [welcomeMessage, setWelcomeMessage] = useState('')
  const [autoReply, setAutoReply] = useState(false)
  const [replyMessage, setReplyMessage] = useState('')

  useEffect(() => {
    const saved = storage.get('whatsapp-auto-lead', {
      enabled: false,
      welcomeMessage: 'Hello! Welcome to our service. How can I help you?',
      autoReply: false,
      replyMessage: 'Thank you for your message. We will get back to you soon.'
    })
    setEnabled(saved.enabled)
    setWelcomeMessage(saved.welcomeMessage)
    setAutoReply(saved.autoReply)
    setReplyMessage(saved.replyMessage)
  }, [])

  const handleSave = () => {
    if (enabled && !welcomeMessage.trim()) {
      showToast('Please enter a welcome message', 'error')
      return
    }
    if (autoReply && !replyMessage.trim()) {
      showToast('Please enter a reply message', 'error')
      return
    }
    storage.set('whatsapp-auto-lead', {
      enabled,
      welcomeMessage,
      autoReply,
      replyMessage
    })
    showToast('WhatsApp Auto Lead settings saved successfully', 'success')
  }

  return (
    <div className="bg-white rounded-xl shadow-soft p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">WhatsApp Auto Lead</h2>
          <p className="text-sm text-gray-600 mt-1">
            Automatically capture and respond to leads from WhatsApp messages.
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
                Enable Auto Lead Capture
              </label>
              <p className="text-xs text-gray-500 mt-1">
                Automatically capture leads from incoming WhatsApp messages
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
            Welcome Message
          </label>
          <textarea
            rows={4}
            value={welcomeMessage}
            onChange={(e) => setWelcomeMessage(e.target.value)}
            placeholder="Enter welcome message for new leads..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            disabled={!enabled}
          />
          <p className="text-xs text-gray-500 mt-1">
            This message will be sent automatically to new leads
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Enable Auto Reply
              </label>
              <p className="text-xs text-gray-500 mt-1">
                Automatically reply to incoming messages
              </p>
            </div>
            <button
              onClick={() => setAutoReply(!autoReply)}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                autoReply ? 'bg-primary-blue' : 'bg-gray-300'
              }`}
              disabled={!enabled}
            >
              <span
                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  autoReply ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Auto Reply Message
          </label>
          <textarea
            rows={4}
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
            placeholder="Enter auto reply message..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            disabled={!enabled || !autoReply}
          />
          <p className="text-xs text-gray-500 mt-1">
            This message will be sent as an automatic reply
          </p>
        </div>
      </div>
    </div>
  )
}

