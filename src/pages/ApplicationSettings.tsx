import { NavLink, Outlet } from 'react-router-dom'
import {
  MessageSquare,
  Shield,
  RefreshCw,
  Headphones,
  Bell,
  Cpu,
  Sparkles,
  Trash2
} from 'lucide-react'

const settingsMenu = [
  { path: '/application-settings/whatsapp-auto-lead', icon: MessageSquare, label: 'WhatsApp Auto Lead' },
  { path: '/application-settings/stop-bot', icon: Shield, label: 'Stop Bot' },
  { path: '/application-settings/webhook', icon: RefreshCw, label: 'Whatsapp Webhook' },
  { path: '/application-settings/support-agent', icon: Headphones, label: 'Support Agent' },
  { path: '/application-settings/notification-sound', icon: Bell, label: 'Notification Sound' },
  { path: '/application-settings/ai-integration', icon: Cpu, label: 'AI Integration' },
  { path: '/application-settings/auto-clear-chat', icon: Trash2, label: 'Auto Clear Chat History' },
  { path: '/application-settings/ai-assistant', icon: Sparkles, label: 'AI Assistant' }
]

export default function ApplicationSettings() {
  return (
    <div className="flex gap-6">
      <div className="w-64 bg-white rounded-xl shadow-soft p-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Application Settings</h2>
        <nav className="space-y-2">
          {settingsMenu.map((item, index) => {
            const Icon = item.icon
            return (
              <NavLink
                key={index}
                to={item.path}
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
            )
          })}
        </nav>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}

