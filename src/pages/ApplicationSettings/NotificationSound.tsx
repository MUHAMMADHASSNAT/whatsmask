import { Save, Volume2, VolumeX } from 'lucide-react'
import { useState, useEffect } from 'react'
import { storage } from '../../utils/storage'
import { showToast } from '../../components/ToastContainer'

export default function NotificationSound() {
  const [enabled, setEnabled] = useState(false)
  const [soundType, setSoundType] = useState('default')
  const [volume, setVolume] = useState(50)

  useEffect(() => {
    const saved = storage.get('notification-sound', {
      enabled: false,
      soundType: 'default',
      volume: 50
    })
    setEnabled(saved.enabled)
    setSoundType(saved.soundType)
    setVolume(saved.volume)
  }, [])

  const playSound = () => {
    if (enabled) {
      const audio = new Audio()
      audio.volume = volume / 100
      audio.play().catch(() => {
        showToast('Could not play sound', 'error')
      })
    }
  }

  const handleSave = () => {
    storage.set('notification-sound', {
      enabled,
      soundType,
      volume
    })
    showToast('Notification Sound settings saved successfully', 'success')
  }

  return (
    <div className="bg-white rounded-xl shadow-soft p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Notification Sound</h2>
          <p className="text-sm text-gray-600 mt-1">
            Configure sound notifications for incoming messages and alerts.
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
                Enable Notification Sound
              </label>
              <p className="text-xs text-gray-500 mt-1">
                Play sound when receiving new messages or notifications
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
            Sound Type
          </label>
          <select
            value={soundType}
            onChange={(e) => setSoundType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            disabled={!enabled}
          >
            <option value="default">Default</option>
            <option value="chime">Chime</option>
            <option value="bell">Bell</option>
            <option value="pop">Pop</option>
            <option value="ding">Ding</option>
            <option value="notification">Notification</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Choose the sound type for notifications
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Volume: {volume}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full"
            disabled={!enabled}
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-500">0%</span>
            <button
              onClick={playSound}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2 text-sm"
              disabled={!enabled}
            >
              {enabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              Test Sound
            </button>
            <span className="text-xs text-gray-500">100%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

