import { Globe, Settings, ExternalLink, User, Menu, Trash2, Sun, Star, Grid3x3 } from 'lucide-react'

interface TopBarProps {
  onMenuClick?: () => void
}

export default function TopBar({ onMenuClick }: TopBarProps) {
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
          <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
            <Trash2 size={16} />
            <span className="hidden sm:inline">Clear cache</span>
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Settings size={20} className="text-gray-600" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Star size={20} className="text-gray-600" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Grid3x3 size={20} className="text-gray-600" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Sun size={20} className="text-gray-600" />
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

