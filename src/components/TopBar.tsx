import { Settings, ExternalLink, User, Menu, Trash2, Sun, Moon, Star, Grid3x3, Bell, LayoutDashboard, Users, FileText, CreditCard, HelpCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toggleDarkMode, initTheme, isDarkMode } from '../utils/theme'
import { storage } from '../utils/storage'
import { showToast } from './ToastContainer'

interface TopBarProps {
  onMenuClick?: () => void
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const navigate = useNavigate()
  const [dark, setDark] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showFavorites, setShowFavorites] = useState(false)
  const [isGridView, setIsGridView] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    initTheme()
    setDark(isDarkMode())
    const savedFavorites = storage.get<string[]>('favorites', [])
    setFavorites(savedFavorites)
    const savedGridView = storage.get<boolean>('grid-view', false)
    setIsGridView(savedGridView)
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

  const handleSettingsClick = (path: string) => {
    navigate(path)
    setShowSettings(false)
  }

  const toggleFavorite = (path: string) => {
    const newFavorites = favorites.includes(path)
      ? favorites.filter(f => f !== path)
      : [...favorites, path]
    setFavorites(newFavorites)
    storage.set('favorites', newFavorites)
    showToast(
      favorites.includes(path) ? 'Removed from favorites' : 'Added to favorites',
      'success'
    )
    setShowFavorites(false)
  }

  const handleGridViewToggle = () => {
    const newGridView = !isGridView
    setIsGridView(newGridView)
    storage.set('grid-view', newGridView)
    showToast(newGridView ? 'Grid view enabled' : 'List view enabled', 'info')
  }

  const quickLinks = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/tenants', label: 'Tenants', icon: Users },
    { path: '/subscriptions', label: 'Subscriptions', icon: CreditCard },
    { path: '/tickets', label: 'Tickets', icon: HelpCircle },
    { path: '/templates', label: 'Templates', icon: FileText }
  ]
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
          <button 
            onClick={() => {
              const url = window.location.origin.replace('/admin', '')
              window.open(url, '_blank')
            }}
            className="flex items-center gap-2 px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
          >
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
          <div className="relative">
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Settings"
            >
              <Settings size={20} className="text-gray-600" />
            </button>
            {showSettings && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-2">
                  <button
                    onClick={() => handleSettingsClick('/system-settings')}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg text-sm flex items-center gap-2"
                  >
                    <Settings size={16} />
                    System Settings
                  </button>
                  <button
                    onClick={() => handleSettingsClick('/application-settings')}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg text-sm flex items-center gap-2"
                  >
                    <Settings size={16} />
                    Application Settings
                  </button>
                  <button
                    onClick={() => handleSettingsClick('/payment-settings')}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg text-sm flex items-center gap-2"
                  >
                    <Settings size={16} />
                    Payment Settings
                  </button>
                  <button
                    onClick={() => handleSettingsClick('/website-settings')}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg text-sm flex items-center gap-2"
                  >
                    <Settings size={16} />
                    Website Settings
                  </button>
                  <button
                    onClick={() => handleSettingsClick('/webhook-settings')}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg text-sm flex items-center gap-2"
                  >
                    <Settings size={16} />
                    Webhook Settings
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <button 
              onClick={() => setShowFavorites(!showFavorites)}
              className={`p-2 rounded-lg hover:bg-gray-100 transition-colors ${favorites.length > 0 ? 'text-yellow-500' : ''}`}
              title="Favorites"
            >
              <Star size={20} className={favorites.length > 0 ? 'fill-current' : ''} />
            </button>
            {showFavorites && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-3 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900 text-sm">Quick Links</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {quickLinks.map((link) => {
                    const Icon = link.icon
                    const isFavorite = favorites.includes(link.path)
                    return (
                      <div key={link.path} className="flex items-center justify-between p-2 hover:bg-gray-50">
                        <button
                          onClick={() => {
                            navigate(link.path)
                            setShowFavorites(false)
                          }}
                          className="flex-1 text-left flex items-center gap-2 px-2 py-1 rounded text-sm"
                        >
                          <Icon size={16} />
                          {link.label}
                        </button>
                        <button
                          onClick={() => toggleFavorite(link.path)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Star 
                            size={16} 
                            className={isFavorite ? 'text-yellow-500 fill-current' : 'text-gray-400'} 
                          />
                        </button>
                      </div>
                    )
                  })}
                </div>
                {favorites.length === 0 && (
                  <div className="p-4 text-center text-sm text-gray-500">
                    No favorites yet. Click the star to add.
                  </div>
                )}
              </div>
            )}
          </div>
          <button 
            onClick={handleGridViewToggle}
            className={`p-2 rounded-lg hover:bg-gray-100 transition-colors ${isGridView ? 'bg-gray-100' : ''}`}
            title={isGridView ? 'Switch to List View' : 'Switch to Grid View'}
          >
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

