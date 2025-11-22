import { useState, useEffect } from 'react'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'
import { storage } from '../utils/storage'
import { showToast } from '../components/ToastContainer'

interface Template {
  id: number
  name: string
  category: string
  status: string
  language: string
  created: string
}

export default function Templates() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    category: 'Greeting',
    status: 'Pending',
    language: 'English'
  })

  useEffect(() => {
    const saved = storage.get<Template[]>('templates', [
  { id: 1, name: 'Welcome Message', category: 'Greeting', status: 'Approved', language: 'English', created: '2024-11-15' },
  { id: 2, name: 'Order Confirmation', category: 'Transaction', status: 'Pending', language: 'English', created: '2024-11-16' },
  { id: 3, name: 'Support Response', category: 'Support', status: 'Approved', language: 'English', created: '2024-11-17' },
  { id: 4, name: 'Payment Reminder', category: 'Transaction', status: 'Approved', language: 'English', created: '2024-11-18' },
  { id: 5, name: 'Thank You Message', category: 'Greeting', status: 'Approved', language: 'English', created: '2024-11-19' }
    ])
    setTemplates(saved)
  }, [])

  const handleCreate = () => {
    setEditingTemplate(null)
    setFormData({ name: '', category: 'Greeting', status: 'Pending', language: 'English' })
    setIsModalOpen(true)
  }

  const handleEdit = (template: Template) => {
    setEditingTemplate(template)
    setFormData({
      name: template.name,
      category: template.category,
      status: template.status,
      language: template.language
    })
    setIsModalOpen(true)
  }

  const handleDelete = (template: Template) => {
    if (window.confirm(`Are you sure you want to delete ${template.name}?`)) {
      const updated = templates.filter((t) => t.id !== template.id)
      setTemplates(updated)
      storage.set('templates', updated)
      showToast('Template deleted successfully', 'success')
    }
  }

  const handleSubmit = () => {
    if (!formData.name) {
      showToast('Please fill in template name', 'error')
      return
    }

    if (editingTemplate) {
      const updated = templates.map((t) =>
        t.id === editingTemplate.id ? { ...t, ...formData } : t
      )
      setTemplates(updated)
      storage.set('templates', updated)
      showToast('Template updated successfully', 'success')
    } else {
      const newTemplate: Template = {
        id: Date.now(),
        ...formData,
        created: new Date().toISOString().split('T')[0]
      }
      const updated = [...templates, newTemplate]
      setTemplates(updated)
      storage.set('templates', updated)
      showToast('Template created successfully', 'success')
    }
    setIsModalOpen(false)
  }

  const columns = [
    { key: 'name', label: 'Template Name' },
    { key: 'category', label: 'Category' },
    { key: 'status', label: 'Status' },
    { key: 'language', label: 'Language' },
    { key: 'created', label: 'Created' }
  ]

  return (
    <div>
      <DataTable
        title="Templates"
        columns={columns}
        data={templates}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        onBulkDelete={(selected) => {
          const ids = selected.map((s: any) => s.id)
          const updated = templates.filter((t) => !ids.includes(t.id))
          setTemplates(updated)
          storage.set('templates', updated)
          showToast(`${selected.length} template(s) deleted successfully`, 'success')
        }}
        exportFilename="templates"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTemplate ? 'Edit Template' : 'Create New Template'}
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
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            >
              <option>Greeting</option>
              <option>Transaction</option>
              <option>Support</option>
              <option>Marketing</option>
            </select>
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
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <select
              value={formData.language}
              onChange={(e) => setFormData({ ...formData, language: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            >
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
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

