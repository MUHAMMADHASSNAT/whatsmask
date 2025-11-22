import { useState, useEffect } from 'react'
import { Save } from 'lucide-react'
import { storage } from '../utils/storage'
import { showToast } from '../components/ToastContainer'

export default function PaymentSettings() {
  const [formData, setFormData] = useState({
    stripePublishableKey: '',
    stripeSecretKey: '',
    paypalClientId: '',
    paypalClientSecret: '',
    enableAutoRenewal: true,
    sendPaymentReceipts: true
  })

  useEffect(() => {
    const saved = storage.get('payment-settings', {
      stripePublishableKey: '',
      stripeSecretKey: '',
      paypalClientId: '',
      paypalClientSecret: '',
      enableAutoRenewal: true,
      sendPaymentReceipts: true
    })
    setFormData(saved)
  }, [])

  const handleSubmit = () => {
    storage.set('payment-settings', formData)
    showToast('Payment settings saved successfully', 'success')
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Payment Settings</h2>
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Stripe Configuration</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Publishable Key
                </label>
                <input
                  type="text"
                  value={formData.stripePublishableKey}
                  onChange={(e) => setFormData({ ...formData, stripePublishableKey: e.target.value })}
                  placeholder="pk_test_..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Secret Key
                </label>
                <input
                  type="password"
                  value={formData.stripeSecretKey}
                  onChange={(e) => setFormData({ ...formData, stripeSecretKey: e.target.value })}
                  placeholder="sk_test_..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">PayPal Configuration</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client ID
                </label>
                <input
                  type="text"
                  value={formData.paypalClientId}
                  onChange={(e) => setFormData({ ...formData, paypalClientId: e.target.value })}
                  placeholder="Enter PayPal Client ID"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client Secret
                </label>
                <input
                  type="password"
                  value={formData.paypalClientSecret}
                  onChange={(e) => setFormData({ ...formData, paypalClientSecret: e.target.value })}
                  placeholder="Enter PayPal Client Secret"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
            <div className="space-y-4">
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={formData.enableAutoRenewal}
                  onChange={(e) => setFormData({ ...formData, enableAutoRenewal: e.target.checked })}
                  className="rounded" 
                />
                <span className="text-sm font-medium text-gray-700">Enable Auto-renewal</span>
              </label>
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={formData.sendPaymentReceipts}
                  onChange={(e) => setFormData({ ...formData, sendPaymentReceipts: e.target.checked })}
                  className="rounded" 
                />
                <span className="text-sm font-medium text-gray-700">Send Payment Receipts</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

