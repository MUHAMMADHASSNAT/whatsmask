import { useState, useEffect } from 'react'
import { Save } from 'lucide-react'
import { storage } from '../utils/storage'
import { showToast } from '../components/ToastContainer'

export default function WebsiteSettings() {
  const [formData, setFormData] = useState({
    siteName: '',
    siteDescription: '',
    logoUrl: '',
    faviconUrl: '',
    contactEmail: ''
  })

  useEffect(() => {
    const saved = storage.get('website-settings', {
      siteName: '',
      siteDescription: '',
      logoUrl: '',
      faviconUrl: '',
      contactEmail: ''
    })
    setFormData(saved)
  }, [])

  const handleSubmit = () => {
    if (!formData.siteName || !formData.contactEmail) {
      showToast('Please fill in Site Name and Contact Email', 'error')
      return
    }
    storage.set('website-settings', formData)
    showToast('Website settings saved successfully', 'success')
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Website Settings</h2>
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
              Site Name
            </label>
            <input
              type="text"
              value={formData.siteName}
              onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
              placeholder="Your Site Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Site Description
            </label>
            <textarea
              rows={4}
              value={formData.siteDescription}
              onChange={(e) => setFormData({ ...formData, siteDescription: e.target.value })}
              placeholder="Enter site description"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logo URL
            </label>
            <input
              type="url"
              value={formData.logoUrl}
              onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
              placeholder="https://example.com/logo.png"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Favicon URL
            </label>
            <input
              type="url"
              value={formData.faviconUrl}
              onChange={(e) => setFormData({ ...formData, faviconUrl: e.target.value })}
              placeholder="https://example.com/favicon.ico"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Email
            </label>
            <input
              type="email"
              value={formData.contactEmail}
              onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
              placeholder="contact@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

