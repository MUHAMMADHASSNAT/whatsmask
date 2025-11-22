import { Save, Copy, ExternalLink } from 'lucide-react'
import { useState, useEffect } from 'react'
import { storage } from '../../utils/storage'
import { showToast } from '../../components/ToastContainer'

export default function WhatsAppWebhook() {
  const [enabled, setEnabled] = useState(false)
  const [webhookUrl, setWebhookUrl] = useState('')
  const [webhookSecret, setWebhookSecret] = useState('')
  const [verifyToken, setVerifyToken] = useState('')

  useEffect(() => {
    const saved = storage.get('whatsapp-webhook', {
      enabled: false,
      webhookUrl: '',
      webhookSecret: '',
      verifyToken: ''
    })
    setEnabled(saved.enabled)
    setWebhookUrl(saved.webhookUrl)
    setWebhookSecret(saved.webhookSecret)
    setVerifyToken(saved.verifyToken)
  }, [])

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    showToast(`${label} copied to clipboard`, 'success')
  }

  const generateToken = () => {
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    setVerifyToken(token)
    showToast('Verify token generated', 'success')
  }

  const handleSave = () => {
    if (enabled && !webhookUrl.trim()) {
      showToast('Please enter webhook URL', 'error')
      return
    }
    if (enabled && !verifyToken.trim()) {
      showToast('Please generate or enter verify token', 'error')
      return
    }
    storage.set('whatsapp-webhook', {
      enabled,
      webhookUrl,
      webhookSecret,
      verifyToken
    })
    showToast('WhatsApp Webhook settings saved successfully', 'success')
  }

  return (
    <div className="bg-white rounded-xl shadow-soft p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">WhatsApp Webhook</h2>
          <p className="text-sm text-gray-600 mt-1">
            Configure webhook settings to receive WhatsApp events and messages.
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
                Enable Webhook
              </label>
              <p className="text-xs text-gray-500 mt-1">
                Receive WhatsApp events and messages via webhook
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
            Webhook URL
          </label>
          <input
            type="url"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            placeholder="https://your-domain.com/webhook"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            disabled={!enabled}
          />
          <p className="text-xs text-gray-500 mt-1">
            The URL where WhatsApp will send webhook events
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Verify Token
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={verifyToken}
              onChange={(e) => setVerifyToken(e.target.value)}
              placeholder="Enter verify token..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
              disabled={!enabled}
            />
            <button
              onClick={generateToken}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              disabled={!enabled}
            >
              Generate
            </button>
            {verifyToken && (
              <button
                onClick={() => handleCopy(verifyToken, 'Verify token')}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2"
                disabled={!enabled}
              >
                <Copy size={16} />
              </button>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Token used to verify webhook requests from WhatsApp
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Webhook Secret (Optional)
          </label>
          <input
            type="password"
            value={webhookSecret}
            onChange={(e) => setWebhookSecret(e.target.value)}
            placeholder="Enter webhook secret..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            disabled={!enabled}
          />
          <p className="text-xs text-gray-500 mt-1">
            Secret key for signing webhook payloads
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">Webhook Setup Instructions</h3>
          <ol className="text-xs text-blue-800 space-y-1 list-decimal list-inside">
            <li>Enter your webhook URL above</li>
            <li>Generate or enter a verify token</li>
            <li>Configure this verify token in your WhatsApp Business API settings</li>
            <li>Save the settings and verify the webhook connection</li>
          </ol>
          <a
            href="https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary-blue hover:underline flex items-center gap-1 mt-2"
          >
            <ExternalLink size={12} />
            Learn more about WhatsApp Webhooks
          </a>
        </div>
      </div>
    </div>
  )
}

