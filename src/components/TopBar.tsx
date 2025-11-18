import { Settings, ExternalLink, User, Menu, Trash2, Sun, Moon, Star, Grid3x3, Bell } from 'lucide-react'
import { useState, useEffect } from 'react'
import { toggleDarkMode, initTheme, isDarkMode } from '../utils/theme'
import { showToast } from './ToastContainer'

interface TopBarProps {
  onMenuClick?: () => void
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const [dark, setDark] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  useEffect(() => {
    initTheme()
    setDark(isDarkMode())
  }, [])

  const handleThemeToggle = () => {
    const isDark = toggleDarkMode()
    setDark(isDark)
    showToast(isDark ? 'Dark mode enabled' : 'Light mode enabled', 'info')
  }

  const handleClearCache = () => {
    if (window.confirm('Are you sure you want to clear cache? This will remove all stored data.')) {
      localStorage.clear()
      showToast('Cache cleared successfully', 'success')
      window.location.reload()
    }
  }
  return (
    <header className="bg-white shadow-soft border-b border-gray-200 px-4 md:px-6 py-4">
      <div className="flex items-center justify-between">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Menu size={20} className="text-gray-600" />
        </button>
        <div className="flex-1"></div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
            <ExternalLink size={16} />
            <span className="hidden sm:inline">Visit Site</span>
          </button>
          <button
            onClick={handleClearCache}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
          >
            <Trash2 size={16} />
            <span className="hidden sm:inline">Clear cache</span>
          </button>
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
            >
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="p-4 hover:bg-gray-50 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">New subscription created</p>
                    <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
                  </div>
                  <div className="p-4 hover:bg-gray-50 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">Payment received</p>
                    <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                  </div>
                  <div className="p-4 hover:bg-gray-50">
                    <p className="text-sm font-medium text-gray-900">System update available</p>
                    <p className="text-xs text-gray-500 mt-1">3 hours ago</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Settings size={20} className="text-gray-600" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Star size={20} className="text-gray-600" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Grid3x3 size={20} className="text-gray-600" />
          </button>
          <button
            onClick={handleThemeToggle}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {dark ? <Sun size={20} className="text-gray-600" /> : <Moon size={20} className="text-gray-600" />}
          </button>
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="w-10 h-10 rounded-full bg-primary-purple flex items-center justify-center">
              <User size={20} className="text-primary-blue" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900">Super Admin</p>
              <p className="text-xs text-gray-500">admin@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

