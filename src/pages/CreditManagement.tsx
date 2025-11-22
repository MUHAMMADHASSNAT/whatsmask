import { useState, useEffect } from 'react'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'
import { Plus, Minus, DollarSign } from 'lucide-react'
import { storage } from '../utils/storage'
import { showToast } from '../components/ToastContainer'

interface Credit {
  id: number
  client: string
  balance: string
  used: string
  available: string
  lastUpdated: string
}

export default function CreditManagement() {
  const [credits, setCredits] = useState<Credit[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAddCreditModalOpen, setIsAddCreditModalOpen] = useState(false)
  const [editingCredit, setEditingCredit] = useState<Credit | null>(null)
  const [formData, setFormData] = useState({
    client: '',
    balance: '',
    used: '0'
  })
  const [addCreditData, setAddCreditData] = useState({
    clientId: '',
    amount: '',
    type: 'add' as 'add' | 'deduct'
  })

  useEffect(() => {
    const saved = storage.get<Credit[]>('credits', [
      { id: 1, client: 'Acme Corp', balance: '$1,500', used: '$500', available: '$1,000', lastUpdated: '2024-11-15' },
      { id: 2, client: 'Tech Solutions', balance: '$800', used: '$300', available: '$500', lastUpdated: '2024-11-20' },
      { id: 3, client: 'Global Inc', balance: '$200', used: '$100', available: '$100', lastUpdated: '2024-11-10' },
      { id: 4, client: 'Digital Agency', balance: '$1,200', used: '$300', available: '$900', lastUpdated: '2024-11-05' },
      { id: 5, client: 'StartupXYZ', balance: '$500', used: '$100', available: '$400', lastUpdated: '2024-10-12' }
    ])
    setCredits(saved)
  }, [])

  const parseAmount = (amount: string) => {
    return parseFloat(amount.replace(/[^0-9.]/g, '')) || 0
  }

  const formatAmount = (amount: number) => {
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const handleCreate = () => {
    setEditingCredit(null)
    setFormData({ client: '', balance: '', used: '0' })
    setIsModalOpen(true)
  }

  const handleEdit = (credit: Credit) => {
    setEditingCredit(credit)
    setFormData({
      client: credit.client,
      balance: credit.balance,
      used: credit.used
    })
    setIsModalOpen(true)
  }

  const handleDelete = (credit: Credit) => {
    if (window.confirm(`Are you sure you want to delete credit for ${credit.client}?`)) {
      const updated = credits.filter((c) => c.id !== credit.id)
      setCredits(updated)
      storage.set('credits', updated)
      showToast('Credit deleted successfully', 'success')
    }
  }

  const handleSubmit = () => {
    if (!formData.client || !formData.balance) {
      showToast('Please fill in all required fields', 'error')
      return
    }

    const balance = parseAmount(formData.balance)
    const used = parseAmount(formData.used)
    const available = balance - used

    if (available < 0) {
      showToast('Used amount cannot exceed balance', 'error')
      return
    }

    if (editingCredit) {
      const updated = credits.map((c) =>
        c.id === editingCredit.id
          ? {
              ...c,
              client: formData.client,
              balance: formatAmount(balance),
              used: formatAmount(used),
              available: formatAmount(available),
              lastUpdated: new Date().toISOString().split('T')[0]
            }
          : c
      )
      setCredits(updated)
      storage.set('credits', updated)
      showToast('Credit updated successfully', 'success')
    } else {
      const newCredit: Credit = {
        id: Date.now(),
        client: formData.client,
        balance: formatAmount(balance),
        used: formatAmount(used),
        available: formatAmount(available),
        lastUpdated: new Date().toISOString().split('T')[0]
      }
      const updated = [...credits, newCredit]
      setCredits(updated)
      storage.set('credits', updated)
      showToast('Credit created successfully', 'success')
    }
    setIsModalOpen(false)
  }

  const handleAddCredit = () => {
    if (!addCreditData.clientId || !addCreditData.amount) {
      showToast('Please select client and enter amount', 'error')
      return
    }

    const credit = credits.find((c) => c.id === parseInt(addCreditData.clientId))
    if (!credit) {
      showToast('Client not found', 'error')
      return
    }

    const currentBalance = parseAmount(credit.balance)
    const currentUsed = parseAmount(credit.used)
    const amount = parseFloat(addCreditData.amount) || 0

    let newBalance = currentBalance
    if (addCreditData.type === 'add') {
      newBalance = currentBalance + amount
    } else {
      newBalance = currentBalance - amount
      if (newBalance < 0) {
        showToast('Cannot deduct more than available balance', 'error')
        return
      }
    }

    const updated = credits.map((c) =>
      c.id === credit.id
        ? {
            ...c,
            balance: formatAmount(newBalance),
            available: formatAmount(newBalance - currentUsed),
            lastUpdated: new Date().toISOString().split('T')[0]
          }
        : c
    )
    setCredits(updated)
    storage.set('credits', updated)
    showToast(
      `Credit ${addCreditData.type === 'add' ? 'added' : 'deducted'} successfully`,
      'success'
    )
    setIsAddCreditModalOpen(false)
    setAddCreditData({ clientId: '', amount: '', type: 'add' })
  }

  const columns = [
    { key: 'client', label: 'Client' },
    { key: 'balance', label: 'Total Balance' },
    { key: 'used', label: 'Used' },
    { key: 'available', label: 'Available' },
    { key: 'lastUpdated', label: 'Last Updated' }
  ]

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Credit Management</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setIsAddCreditModalOpen(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <Plus size={16} />
            <span>Add/Deduct Credit</span>
          </button>
        </div>
      </div>
      <DataTable
        title=""
        columns={columns}
        data={credits}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        onBulkDelete={(selected) => {
          const ids = selected.map((s: any) => s.id)
          const updated = credits.filter((c) => !ids.includes(c.id))
          setCredits(updated)
          storage.set('credits', updated)
          showToast(`${selected.length} credit(s) deleted successfully`, 'success')
        }}
        exportFilename="credits"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCredit ? 'Edit Credit' : 'Create New Credit'}
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
              Total Balance *
            </label>
            <input
              type="text"
              value={formData.balance}
              onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
              placeholder="$1000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Used Amount
            </label>
            <input
              type="text"
              value={formData.used}
              onChange={(e) => setFormData({ ...formData, used: e.target.value })}
              placeholder="$0"
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
              {editingCredit ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isAddCreditModalOpen}
        onClose={() => setIsAddCreditModalOpen(false)}
        title="Add/Deduct Credit"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Client *
            </label>
            <select
              value={addCreditData.clientId}
              onChange={(e) => setAddCreditData({ ...addCreditData, clientId: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            >
              <option value="">Select Client</option>
              {credits.map((credit) => (
                <option key={credit.id} value={credit.id}>
                  {credit.client}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Action *
            </label>
            <select
              value={addCreditData.type}
              onChange={(e) => setAddCreditData({ ...addCreditData, type: e.target.value as 'add' | 'deduct' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            >
              <option value="add">Add Credit</option>
              <option value="deduct">Deduct Credit</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount *
            </label>
            <input
              type="number"
              value={addCreditData.amount}
              onChange={(e) => setAddCreditData({ ...addCreditData, amount: e.target.value })}
              placeholder="100"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => setIsAddCreditModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleAddCredit}
              className={`px-4 py-2 text-white rounded-lg flex items-center gap-2 ${
                addCreditData.type === 'add'
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {addCreditData.type === 'add' ? <Plus size={16} /> : <Minus size={16} />}
              <span>{addCreditData.type === 'add' ? 'Add' : 'Deduct'} Credit</span>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

