import { useState, useEffect } from 'react'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'
import { storage } from '../utils/storage'
import { showToast } from '../components/ToastContainer'

interface MessageBot {
  id: number
  name: string
  status: string
  messages: number
  responses: number
  created: string
}

export default function MessageBot() {
  const [bots, setBots] = useState<MessageBot[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBot, setEditingBot] = useState<MessageBot | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    status: 'Active',
    messages: 0,
    responses: 0
  })

  useEffect(() => {
    const saved = storage.get<MessageBot[]>('message-bots', [
  { id: 1, name: 'Customer Support Bot', status: 'Active', messages: 1250, responses: 1200, created: '2024-11-15' },
  { id: 2, name: 'FAQ Bot', status: 'Active', messages: 800, responses: 780, created: '2024-11-16' },
  { id: 3, name: 'Order Bot', status: 'Inactive', messages: 500, responses: 480, created: '2024-11-10' }
    ])
    setBots(saved)
  }, [])

  const handleCreate = () => {
    setEditingBot(null)
    setFormData({ name: '', status: 'Active', messages: 0, responses: 0 })
    setIsModalOpen(true)
  }

  const handleEdit = (bot: MessageBot) => {
    setEditingBot(bot)
    setFormData({
      name: bot.name,
      status: bot.status,
      messages: bot.messages,
      responses: bot.responses
    })
    setIsModalOpen(true)
  }

  const handleDelete = (bot: MessageBot) => {
    if (window.confirm(`Are you sure you want to delete ${bot.name}?`)) {
      const updated = bots.filter((b) => b.id !== bot.id)
      setBots(updated)
      storage.set('message-bots', updated)
      showToast('Message bot deleted successfully', 'success')
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
      storage.set('message-bots', updated)
      showToast('Message bot updated successfully', 'success')
    } else {
      const newBot: MessageBot = {
        id: Date.now(),
        ...formData,
        created: new Date().toISOString().split('T')[0]
      }
      const updated = [...bots, newBot]
      setBots(updated)
      storage.set('message-bots', updated)
      showToast('Message bot created successfully', 'success')
    }
    setIsModalOpen(false)
  }

  const columns = [
    { key: 'name', label: 'Bot Name' },
    { key: 'status', label: 'Status' },
    { key: 'messages', label: 'Messages' },
    { key: 'responses', label: 'Responses' },
    { key: 'created', label: 'Created' }
  ]

  return (
    <div>
      <DataTable
        title="Message Bots"
        columns={columns}
        data={bots}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        onBulkDelete={(selected) => {
          const ids = selected.map((s: any) => s.id)
          const updated = bots.filter((b) => !ids.includes(b.id))
          setBots(updated)
          storage.set('message-bots', updated)
          showToast(`${selected.length} message bot(s) deleted successfully`, 'success')
        }}
        exportFilename="message-bots"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingBot ? 'Edit Message Bot' : 'Create New Message Bot'}
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

