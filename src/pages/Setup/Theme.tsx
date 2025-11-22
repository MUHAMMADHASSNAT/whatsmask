import { useState, useEffect } from 'react'
import { Save } from 'lucide-react'
import { storage } from '../../utils/storage'
import { showToast } from '../../components/ToastContainer'

export default function SetupTheme() {
  const [formData, setFormData] = useState({
    primaryColor: '#4A77FF',
    secondaryColor: '#DAD6FF',
    themeMode: 'light'
  })

  useEffect(() => {
    const saved = storage.get('setup-theme', {
      primaryColor: '#4A77FF',
      secondaryColor: '#DAD6FF',
      themeMode: 'light'
    })
    setFormData(saved)
  }, [])

  const handleSubmit = () => {
    storage.set('setup-theme', formData)
    showToast('Theme settings saved successfully', 'success')
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Theme Settings</h2>
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
              Primary Color
            </label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={formData.primaryColor}
                onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                className="w-20 h-10 border border-gray-300 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={formData.primaryColor}
                onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Secondary Color
            </label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={formData.secondaryColor}
                onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                className="w-20 h-10 border border-gray-300 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={formData.secondaryColor}
                onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Theme Mode
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input 
                  type="radio" 
                  name="theme" 
                  value="light" 
                  checked={formData.themeMode === 'light'}
                  onChange={(e) => setFormData({ ...formData, themeMode: e.target.value })}
                  className="text-primary-blue" 
                />
                <span className="text-sm text-gray-700">Light</span>
              </label>
              <label className="flex items-center gap-2">
                <input 
                  type="radio" 
                  name="theme" 
                  value="dark" 
                  checked={formData.themeMode === 'dark'}
                  onChange={(e) => setFormData({ ...formData, themeMode: e.target.value })}
                  className="text-primary-blue" 
                />
                <span className="text-sm text-gray-700">Dark</span>
              </label>
              <label className="flex items-center gap-2">
                <input 
                  type="radio" 
                  name="theme" 
                  value="auto" 
                  checked={formData.themeMode === 'auto'}
                  onChange={(e) => setFormData({ ...formData, themeMode: e.target.value })}
                  className="text-primary-blue" 
                />
                <span className="text-sm text-gray-700">Auto</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

