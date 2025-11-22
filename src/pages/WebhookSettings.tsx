import { useState, useEffect } from 'react'
import { Save } from 'lucide-react'
import { storage } from '../utils/storage'
import { showToast } from '../components/ToastContainer'

export default function WebhookSettings() {
  const [formData, setFormData] = useState({
    webhookUrl: '',
    secretKey: '',
    enableWebhook: false,
    events: {
      messageReceived: true,
      messageSent: true,
      statusUpdate: true,
      error: true
    }
  })

  useEffect(() => {
    const saved = storage.get('webhook-settings', {
      webhookUrl: '',
      secretKey: '',
      enableWebhook: false,
      events: {
        messageReceived: true,
        messageSent: true,
        statusUpdate: true,
        error: true
      }
    })
    setFormData(saved)
  }, [])

  const handleSubmit = () => {
    if (formData.enableWebhook && !formData.webhookUrl) {
      showToast('Please enter webhook URL', 'error')
      return
    }
    storage.set('webhook-settings', formData)
    showToast('Webhook settings saved successfully', 'success')
  }

  const toggleEvent = (event: keyof typeof formData.events) => {
    setFormData({
      ...formData,
      events: {
        ...formData.events,
        [event]: !formData.events[event]
      }
    })
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Webhook Settings</h2>
          <button 
            onClick={handleSubmit}
            className="px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
          >
            <Save size={16} />
            <span>Save Settings</span>
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Webhook URL
            </label>
            <input
              type="text"
              value={formData.webhookUrl}
              onChange={(e) => setFormData({ ...formData, webhookUrl: e.target.value })}
              placeholder="https://your-domain.com/webhook"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Secret Key
            </label>
            <input
              type="password"
              value={formData.secretKey}
              onChange={(e) => setFormData({ ...formData, secretKey: e.target.value })}
              placeholder="Enter secret key"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            />
          </div>

          <div>
            <label className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={formData.enableWebhook}
                onChange={(e) => setFormData({ ...formData, enableWebhook: e.target.checked })}
                className="rounded" 
              />
              <span className="text-sm font-medium text-gray-700">Enable Webhook</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Events to Listen
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={formData.events.messageReceived}
                  onChange={() => toggleEvent('messageReceived')}
                  className="rounded" 
                />
                <span className="text-sm text-gray-700">Message Received</span>
              </label>
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={formData.events.messageSent}
                  onChange={() => toggleEvent('messageSent')}
                  className="rounded" 
                />
                <span className="text-sm text-gray-700">Message Sent</span>
              </label>
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={formData.events.statusUpdate}
                  onChange={() => toggleEvent('statusUpdate')}
                  className="rounded" 
                />
                <span className="text-sm text-gray-700">Status Update</span>
              </label>
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={formData.events.error}
                  onChange={() => toggleEvent('error')}
                  className="rounded" 
                />
                <span className="text-sm text-gray-700">Error</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

