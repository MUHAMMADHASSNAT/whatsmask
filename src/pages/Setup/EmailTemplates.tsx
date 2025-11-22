import { useState, useEffect } from 'react'
import DataTable from '../../components/DataTable'
import Modal from '../../components/Modal'
import { storage } from '../../utils/storage'
import { showToast } from '../../components/ToastContainer'

interface EmailTemplate {
  id: number
  name: string
  subject: string
  type: string
  status: string
  body?: string
}

export default function SetupEmailTemplates() {
  const [templates, setTemplates] = useState<EmailTemplate[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    type: 'Transactional',
    status: 'Active',
    body: ''
  })

  useEffect(() => {
    const saved = storage.get<EmailTemplate[]>('setup-email-templates', [
      { id: 1, name: 'Welcome Email', subject: 'Welcome to our platform!', type: 'Transactional', status: 'Active', body: 'Welcome {{name}}! Thank you for joining us.' },
      { id: 2, name: 'Password Reset', subject: 'Reset your password', type: 'Transactional', status: 'Active', body: 'Click here to reset your password: {{reset_link}}' },
      { id: 3, name: 'Invoice', subject: 'Your invoice is ready', type: 'Transactional', status: 'Active', body: 'Your invoice #{{invoice_number}} is ready for payment.' },
      { id: 4, name: 'Newsletter', subject: 'Monthly Newsletter', type: 'Marketing', status: 'Active', body: 'Check out our latest updates and features!' },
      { id: 5, name: 'Subscription Expired', subject: 'Your subscription has expired', type: 'Transactional', status: 'Draft', body: 'Your subscription has expired. Please renew to continue.' }
    ])
    setTemplates(saved)
  }, [])

  const handleCreate = () => {
    setEditingTemplate(null)
    setFormData({ name: '', subject: '', type: 'Transactional', status: 'Active', body: '' })
    setIsModalOpen(true)
  }

  const handleEdit = (template: EmailTemplate) => {
    setEditingTemplate(template)
    setFormData({
      name: template.name,
      subject: template.subject,
      type: template.type,
      status: template.status,
      body: template.body || ''
    })
    setIsModalOpen(true)
  }

  const handleDelete = (template: EmailTemplate) => {
    if (window.confirm(`Are you sure you want to delete ${template.name}?`)) {
      const updated = templates.filter((t) => t.id !== template.id)
      setTemplates(updated)
      storage.set('setup-email-templates', updated)
      showToast('Email template deleted successfully', 'success')
    }
  }

  const handleSubmit = () => {
    if (!formData.name || !formData.subject || !formData.body) {
      showToast('Please fill in all required fields', 'error')
      return
    }

    if (editingTemplate) {
      const updated = templates.map((t) =>
        t.id === editingTemplate.id ? { ...t, ...formData } : t
      )
      setTemplates(updated)
      storage.set('setup-email-templates', updated)
      showToast('Email template updated successfully', 'success')
    } else {
      const newTemplate: EmailTemplate = {
        id: Date.now(),
        ...formData
      }
      const updated = [...templates, newTemplate]
      setTemplates(updated)
      storage.set('setup-email-templates', updated)
      showToast('Email template created successfully', 'success')
    }
    setIsModalOpen(false)
  }

  const columns = [
    { key: 'name', label: 'Template Name' },
    { key: 'subject', label: 'Subject' },
    { key: 'type', label: 'Type' },
    { key: 'status', label: 'Status' }
  ]

  return (
    <div>
      <DataTable
        title="Email Templates"
        columns={columns}
        data={templates}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        onBulkDelete={(selected) => {
          const ids = selected.map((s: any) => s.id)
          const updated = templates.filter((t) => !ids.includes(t.id))
          setTemplates(updated)
          storage.set('setup-email-templates', updated)
          showToast(`${selected.length} template(s) deleted successfully`, 'success')
        }}
        exportFilename="email-templates"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTemplate ? 'Edit Email Template' : 'Create New Email Template'}
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Template Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject *
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            >
              <option>Transactional</option>
              <option>Marketing</option>
              <option>Notification</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Body *
            </label>
            <textarea
              rows={6}
              value={formData.body}
              onChange={(e) => setFormData({ ...formData, body: e.target.value })}
              placeholder="Use {{variable}} for dynamic content"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">Use variables like {{name}}, {{email}} for dynamic content</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            >
              <option>Active</option>
              <option>Draft</option>
              <option>Inactive</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-blue-600"
            >
              {editingTemplate ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

