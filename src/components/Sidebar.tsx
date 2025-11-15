import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Building2,
  ShoppingCart,
  FileText,
  CreditCard,
  Wallet,
  Package,
  Headphones,
  Webhook,
  Settings,
  Menu,
  X,
  Link,
  User,
  FileText as FileTextIcon,
  Megaphone,
  MessageSquare,
  Workflow,
  Sparkles,
  MessageCircle,
  Grid3x3
} from 'lucide-react'

interface SidebarProps {
  onSetupClick: () => void
  isOpen?: boolean
  onClose?: () => void
}

export default function Sidebar({ onSetupClick, isOpen = true, onClose }: SidebarProps) {
  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/connect-waba', icon: Link, label: 'Connect WABA' },
    {
      path: '/subscriptions',
      icon: ShoppingCart,
      label: 'Subscription',
      parent: 'Sales'
    },
    { path: '/invoices', icon: FileText, label: 'Invoices', parent: 'Sales' },
    {
      path: '/transactions',
      icon: CreditCard,
      label: 'Transactions',
      parent: 'Sales'
    },
    {
      path: '/credit-management',
      icon: Wallet,
      label: 'Credit Management',
      parent: 'Sales'
    },
    { path: '/contact', icon: User, label: 'Contact', parent: 'Contact' },
    { path: '/templates', icon: FileTextIcon, label: 'Templates', parent: 'Templates' },
    { path: '/campaign', icon: Megaphone, label: 'Campaign', parent: 'Marketing' },
    { path: '/bulk-campaign', icon: Megaphone, label: 'Bulk Campaign', parent: 'Marketing' },
    { path: '/message-bot', icon: MessageSquare, label: 'Message Bot', parent: 'Marketing' },
    { path: '/template-bot', icon: FileTextIcon, label: 'Template Bot', parent: 'Marketing' },
    { path: '/bot-flow', icon: Workflow, label: 'Bot Flow', parent: 'Marketing' },
    { path: '/ai-assistant', icon: Sparkles, label: 'AI Assistant', parent: 'AI Assistant' },
    { path: '/chat', icon: MessageCircle, label: 'Chat', parent: 'Support' },
    { path: '/tickets', icon: Headphones, label: 'Support Tickets', parent: 'Support' },
    {
      path: '/application-settings',
      icon: Settings,
      label: 'Application Settings',
      parent: 'Settings'
    },
    {
      path: '/system-settings',
      icon: Settings,
      label: 'System Settings',
      parent: 'Settings'
    }
  ]

  let currentParent = ''

  return (
    <aside className={`fixed md:static w-64 bg-white shadow-soft h-screen flex flex-col z-50 transform transition-transform duration-300 ${
      isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
    }`}>
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-purple rounded-lg flex items-center justify-center">
            <span className="text-primary-blue font-bold text-lg">W</span>
          </div>
          <h1 className="text-2xl font-bold text-primary-blue">WhatsMark</h1>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        )}
      </div>
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const showParent = item.parent && item.parent !== currentParent
            if (showParent) currentParent = item.parent || ''
            const Icon = item.icon

            return (
              <li key={index}>
                {showParent && (
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {item.parent}
                  </div>
                )}
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
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={onSetupClick}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-primary-purple hover:text-primary-blue transition-colors"
        >
          <Menu size={20} />
          <span className="font-medium">Setup</span>
        </button>
      </div>
    </aside>
  )
}

