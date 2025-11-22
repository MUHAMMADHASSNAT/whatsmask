import { useState, useEffect } from 'react'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'
import { storage } from '../utils/storage'
import { showToast } from '../components/ToastContainer'

interface Invoice {
  id: string
  client: string
  amount: string
  status: string
  date: string
  dueDate: string
}

export default function Invoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null)
  const [formData, setFormData] = useState({
    client: '',
    amount: '',
    status: 'Pending',
    date: '',
    dueDate: ''
  })

  useEffect(() => {
    const saved = storage.get<Invoice[]>('invoices', [
  { id: 'INV-001', client: 'Acme Corp', amount: '$500', status: 'Paid', date: '2024-11-15', dueDate: '2024-11-15' },
  { id: 'INV-002', client: 'Tech Solutions', amount: '$300', status: 'Paid', date: '2024-11-20', dueDate: '2024-11-20' },
  { id: 'INV-003', client: 'Global Inc', amount: '$100', status: 'Pending', date: '2024-11-10', dueDate: '2024-12-10' },
  { id: 'INV-004', client: 'Digital Agency', amount: '$300', status: 'Paid', date: '2024-11-05', dueDate: '2024-11-05' },
  { id: 'INV-005', client: 'StartupXYZ', amount: '$100', status: 'Overdue', date: '2024-10-12', dueDate: '2024-11-12' }
    ])
    setInvoices(saved)
  }, [])

  const handleCreate = () => {
    setEditingInvoice(null)
    setFormData({ client: '', amount: '', status: 'Pending', date: '', dueDate: '' })
    setIsModalOpen(true)
  }

  const handleEdit = (invoice: Invoice) => {
    setEditingInvoice(invoice)
    setFormData({
      client: invoice.client,
      amount: invoice.amount,
      status: invoice.status,
      date: invoice.date,
      dueDate: invoice.dueDate
    })
    setIsModalOpen(true)
  }

  const handleDelete = (invoice: Invoice) => {
    if (window.confirm(`Are you sure you want to delete ${invoice.id}?`)) {
      const updated = invoices.filter((i) => i.id !== invoice.id)
      setInvoices(updated)
      storage.set('invoices', updated)
      showToast('Invoice deleted successfully', 'success')
    }
  }

  const handleSubmit = () => {
    if (!formData.client || !formData.amount) {
      showToast('Please fill in all required fields', 'error')
      return
    }

    if (editingInvoice) {
      const updated = invoices.map((i) =>
        i.id === editingInvoice.id ? { ...i, ...formData } : i
      )
      setInvoices(updated)
      storage.set('invoices', updated)
      showToast('Invoice updated successfully', 'success')
    } else {
      const newInvoice: Invoice = {
        id: `INV-${String(Date.now()).slice(-6)}`,
        ...formData
      }
      const updated = [...invoices, newInvoice]
      setInvoices(updated)
      storage.set('invoices', updated)
      showToast('Invoice created successfully', 'success')
    }
    setIsModalOpen(false)
  }

  const columns = [
    { key: 'id', label: 'Invoice ID' },
    { key: 'client', label: 'Client' },
    { key: 'amount', label: 'Amount' },
    { key: 'status', label: 'Status' },
    { key: 'date', label: 'Date' },
    { key: 'dueDate', label: 'Due Date' }
  ]

  return (
    <div>
      <DataTable
        title="Invoices"
        columns={columns}
        data={invoices}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        onBulkDelete={(selected) => {
          const ids = selected.map((s: any) => s.id)
          const updated = invoices.filter((i) => !ids.includes(i.id))
          setInvoices(updated)
          storage.set('invoices', updated)
          showToast(`${selected.length} invoice(s) deleted successfully`, 'success')
        }}
        exportFilename="invoices"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingInvoice ? 'Edit Invoice' : 'Create New Invoice'}
      >
        <div className="space-y-4">
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
              Amount *
            </label>
            <input
              type="text"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="$100"
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
              <option>Pending</option>
              <option>Paid</option>
              <option>Overdue</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Due Date
            </label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            />
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
              {editingInvoice ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

