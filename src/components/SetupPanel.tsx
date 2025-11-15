import { X } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import {
  User,
  Shield,
  Building,
  Globe,
  Palette,
  DollarSign,
  Receipt,
  HelpCircle,
  FileText,
  Mail,
  FileCode,
  Box
} from 'lucide-react'

interface SetupPanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function SetupPanel({ isOpen, onClose }: SetupPanelProps) {
  const setupItems = [
    { path: '/setup/users', icon: User, label: 'User' },
    { path: '/setup/roles', icon: Shield, label: 'Role' },
    { path: '/setup/departments', icon: Building, label: 'Department' },
    { path: '/setup/languages', icon: Globe, label: 'Languages' },
    { path: '/setup/theme', icon: Palette, label: 'Theme' },
    { path: '/setup/currency', icon: DollarSign, label: 'Currency' },
    { path: '/setup/taxes', icon: Receipt, label: 'Taxes' },
    { path: '/setup/faq', icon: HelpCircle, label: 'FAQ' },
    { path: '/setup/pages', icon: FileText, label: 'Pages' },
    { path: '/setup/email-templates', icon: Mail, label: 'Email Templates' },
    { path: '/setup/system-logs', icon: FileCode, label: 'System Logs' },
    { path: '/setup/modules', icon: Box, label: 'Modules' }
  ]

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed left-0 top-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Setup Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>
        <nav className="p-4 overflow-y-auto h-full">
          <ul className="space-y-2">
            {setupItems.map((item, index) => {
              const Icon = item.icon
              return (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-primary-blue text-white'
                          : 'text-gray-700 hover:bg-primary-purple hover:text-primary-blue'
                      }`
                    }
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </>
  )
}

