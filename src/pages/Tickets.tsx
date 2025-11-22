import { useState, useEffect } from 'react'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'
import { storage } from '../utils/storage'
import { showToast } from '../components/ToastContainer'

interface Ticket {
  id: string
  subject: string
  client: string
  status: string
  priority: string
  created: string
}

export default function Tickets() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null)
  const [formData, setFormData] = useState({
    subject: '',
    client: '',
    status: 'Open',
    priority: 'Medium'
  })

  useEffect(() => {
    const saved = storage.get<Ticket[]>('tickets', [
  { id: 'TKT-001', subject: 'Login Issue', client: 'Acme Corp', status: 'Open', priority: 'High', created: '2024-11-15' },
  { id: 'TKT-002', subject: 'Feature Request', client: 'Tech Solutions', status: 'In Progress', priority: 'Medium', created: '2024-11-20' },
  { id: 'TKT-003', subject: 'Billing Question', client: 'Global Inc', status: 'Resolved', priority: 'Low', created: '2024-11-10' },
  { id: 'TKT-004', subject: 'API Error', client: 'Digital Agency', status: 'Open', priority: 'High', created: '2024-11-05' },
  { id: 'TKT-005', subject: 'Account Setup', client: 'StartupXYZ', status: 'Resolved', priority: 'Low', created: '2024-10-12' }
    ])
    setTickets(saved)
  }, [])

  const handleCreate = () => {
    setEditingTicket(null)
    setFormData({ subject: '', client: '', status: 'Open', priority: 'Medium' })
    setIsModalOpen(true)
  }

  const handleEdit = (ticket: Ticket) => {
    setEditingTicket(ticket)
    setFormData({
      subject: ticket.subject,
      client: ticket.client,
      status: ticket.status,
      priority: ticket.priority
    })
    setIsModalOpen(true)
  }

  const handleDelete = (ticket: Ticket) => {
    if (window.confirm(`Are you sure you want to delete ${ticket.id}?`)) {
      const updated = tickets.filter((t) => t.id !== ticket.id)
      setTickets(updated)
      storage.set('tickets', updated)
      showToast('Ticket deleted successfully', 'success')
    }
  }

  const handleSubmit = () => {
    if (!formData.subject || !formData.client) {
      showToast('Please fill in all required fields', 'error')
      return
    }

    if (editingTicket) {
      const updated = tickets.map((t) =>
        t.id === editingTicket.id ? { ...t, ...formData } : t
      )
      setTickets(updated)
      storage.set('tickets', updated)
      showToast('Ticket updated successfully', 'success')
    } else {
      const newTicket: Ticket = {
        id: `TKT-${String(Date.now()).slice(-6)}`,
        ...formData,
        created: new Date().toISOString().split('T')[0]
      }
      const updated = [...tickets, newTicket]
      setTickets(updated)
      storage.set('tickets', updated)
      showToast('Ticket created successfully', 'success')
    }
    setIsModalOpen(false)
  }

  const columns = [
    { key: 'id', label: 'Ticket ID' },
    { key: 'subject', label: 'Subject' },
    { key: 'client', label: 'Client' },
    { key: 'status', label: 'Status' },
    { key: 'priority', label: 'Priority' },
    { key: 'created', label: 'Created' }
  ]

  return (
    <div>
      <DataTable
        title="Support Tickets"
        columns={columns}
        data={tickets}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        onBulkDelete={(selected) => {
          const ids = selected.map((s: any) => s.id)
          const updated = tickets.filter((t) => !ids.includes(t.id))
          setTickets(updated)
          storage.set('tickets', updated)
          showToast(`${selected.length} ticket(s) deleted successfully`, 'success')
        }}
        exportFilename="tickets"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTicket ? 'Edit Ticket' : 'Create New Ticket'}
      >
        <div className="space-y-4">
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
              Client *
            </label>
            <input
              type="text"
              value={formData.client}
              onChange={(e) => setFormData({ ...formData, client: e.target.value })}
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
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
              <option>Closed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
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
              {editingTicket ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

