import { useState, useEffect } from 'react'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'
import { storage } from '../utils/storage'
import { showToast } from '../components/ToastContainer'

interface Transaction {
  id: string
  client: string
  amount: string
  type: string
  status: string
  date: string
}

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
  const [formData, setFormData] = useState({
    client: '',
    amount: '',
    type: 'Payment',
    status: 'Pending',
    date: ''
  })

  useEffect(() => {
    const saved = storage.get<Transaction[]>('transactions', [
  { id: 'TXN-001', client: 'Acme Corp', amount: '$500', type: 'Payment', status: 'Completed', date: '2024-11-15' },
  { id: 'TXN-002', client: 'Tech Solutions', amount: '$300', type: 'Payment', status: 'Completed', date: '2024-11-20' },
  { id: 'TXN-003', client: 'Global Inc', amount: '$100', type: 'Refund', status: 'Pending', date: '2024-11-10' },
  { id: 'TXN-004', client: 'Digital Agency', amount: '$300', type: 'Payment', status: 'Completed', date: '2024-11-05' },
  { id: 'TXN-005', client: 'StartupXYZ', amount: '$100', type: 'Payment', status: 'Failed', date: '2024-10-12' }
    ])
    setTransactions(saved)
  }, [])

  const handleCreate = () => {
    setEditingTransaction(null)
    setFormData({ client: '', amount: '', type: 'Payment', status: 'Pending', date: '' })
    setIsModalOpen(true)
  }

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction)
    setFormData({
      client: transaction.client,
      amount: transaction.amount,
      type: transaction.type,
      status: transaction.status,
      date: transaction.date
    })
    setIsModalOpen(true)
  }

  const handleDelete = (transaction: Transaction) => {
    if (window.confirm(`Are you sure you want to delete ${transaction.id}?`)) {
      const updated = transactions.filter((t) => t.id !== transaction.id)
      setTransactions(updated)
      storage.set('transactions', updated)
      showToast('Transaction deleted successfully', 'success')
    }
  }

  const handleSubmit = () => {
    if (!formData.client || !formData.amount) {
      showToast('Please fill in all required fields', 'error')
      return
    }

    if (editingTransaction) {
      const updated = transactions.map((t) =>
        t.id === editingTransaction.id ? { ...t, ...formData } : t
      )
      setTransactions(updated)
      storage.set('transactions', updated)
      showToast('Transaction updated successfully', 'success')
    } else {
      const newTransaction: Transaction = {
        id: `TXN-${String(Date.now()).slice(-6)}`,
        ...formData
      }
      const updated = [...transactions, newTransaction]
      setTransactions(updated)
      storage.set('transactions', updated)
      showToast('Transaction created successfully', 'success')
    }
    setIsModalOpen(false)
  }

  const columns = [
    { key: 'id', label: 'Transaction ID' },
    { key: 'client', label: 'Client' },
    { key: 'amount', label: 'Amount' },
    { key: 'type', label: 'Type' },
    { key: 'status', label: 'Status' },
    { key: 'date', label: 'Date' }
  ]

  return (
    <div>
      <DataTable
        title="Transactions"
        columns={columns}
        data={transactions}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        onBulkDelete={(selected) => {
          const ids = selected.map((s: any) => s.id)
          const updated = transactions.filter((t) => !ids.includes(t.id))
          setTransactions(updated)
          storage.set('transactions', updated)
          showToast(`${selected.length} transaction(s) deleted successfully`, 'success')
        }}
        exportFilename="transactions"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTransaction ? 'Edit Transaction' : 'Create New Transaction'}
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
              Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            >
              <option>Payment</option>
              <option>Refund</option>
              <option>Chargeback</option>
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
              <option>Completed</option>
              <option>Failed</option>
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
              {editingTransaction ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

