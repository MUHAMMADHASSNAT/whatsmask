import { useState, useEffect } from 'react'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'
import { storage } from '../utils/storage'
import { showToast } from '../components/ToastContainer'

interface TemplateBot {
  id: number
  name: string
  status: string
  templates: number
  usage: number
  created: string
}

export default function TemplateBot() {
  const [bots, setBots] = useState<TemplateBot[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBot, setEditingBot] = useState<TemplateBot | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    status: 'Active',
    templates: 0,
    usage: 0
  })

  useEffect(() => {
    const saved = storage.get<TemplateBot[]>('template-bots', [
      { id: 1, name: 'Welcome Template Bot', status: 'Active', templates: 5, usage: 450, created: '2024-11-15' },
      { id: 2, name: 'Order Template Bot', status: 'Active', templates: 3, usage: 320, created: '2024-11-16' },
      { id: 3, name: 'Support Template Bot', status: 'Inactive', templates: 4, usage: 200, created: '2024-11-10' }
    ])
    setBots(saved)
  }, [])

  const handleCreate = () => {
    setEditingBot(null)
    setFormData({ name: '', status: 'Active', templates: 0, usage: 0 })
    setIsModalOpen(true)
  }

  const handleEdit = (bot: TemplateBot) => {
    setEditingBot(bot)
    setFormData({
      name: bot.name,
      status: bot.status,
      templates: bot.templates,
      usage: bot.usage
    })
    setIsModalOpen(true)
  }

  const handleDelete = (bot: TemplateBot) => {
    if (window.confirm(`Are you sure you want to delete ${bot.name}?`)) {
      const updated = bots.filter((b) => b.id !== bot.id)
      setBots(updated)
      storage.set('template-bots', updated)
      showToast('Template bot deleted successfully', 'success')
    }
  }

  const handleSubmit = () => {
    if (!formData.name) {
      showToast('Please fill in bot name', 'error')
      return
    }

    if (editingBot) {
      const updated = bots.map((b) =>
        b.id === editingBot.id ? { ...b, ...formData } : b
      )
      setBots(updated)
      storage.set('template-bots', updated)
      showToast('Template bot updated successfully', 'success')
    } else {
      const newBot: TemplateBot = {
        id: Date.now(),
        ...formData,
        created: new Date().toISOString().split('T')[0]
      }
      const updated = [...bots, newBot]
      setBots(updated)
      storage.set('template-bots', updated)
      showToast('Template bot created successfully', 'success')
    }
    setIsModalOpen(false)
  }

  const columns = [
    { key: 'name', label: 'Bot Name' },
    { key: 'status', label: 'Status' },
    { key: 'templates', label: 'Templates' },
    { key: 'usage', label: 'Usage' },
    { key: 'created', label: 'Created' }
  ]

  return (
    <div>
      <DataTable
        title="Template Bots"
        columns={columns}
        data={bots}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        onBulkDelete={(selected) => {
          const ids = selected.map((s: any) => s.id)
          const updated = bots.filter((b) => !ids.includes(b.id))
          setBots(updated)
          storage.set('template-bots', updated)
          showToast(`${selected.length} template bot(s) deleted successfully`, 'success')
        }}
        exportFilename="template-bots"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingBot ? 'Edit Template Bot' : 'Create New Template Bot'}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bot Name *
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
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            >
              <option>Active</option>
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
              {editingBot ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

