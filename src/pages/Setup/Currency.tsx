import { useState, useEffect } from 'react'
import DataTable from '../../components/DataTable'
import Modal from '../../components/Modal'
import { storage } from '../../utils/storage'
import { showToast } from '../../components/ToastContainer'

interface Currency {
  id: number
  name: string
  code: string
  symbol: string
  rate: number
  status: string
  default: string
}

export default function SetupCurrency() {
  const [currencies, setCurrencies] = useState<Currency[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCurrency, setEditingCurrency] = useState<Currency | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    symbol: '',
    rate: 1.0,
    status: 'Active',
    default: 'No'
  })

  useEffect(() => {
    const saved = storage.get<Currency[]>('setup-currencies', [
      { id: 1, name: 'US Dollar', code: 'USD', symbol: '$', rate: 1.0, status: 'Active', default: 'Yes' },
      { id: 2, name: 'Euro', code: 'EUR', symbol: '€', rate: 0.92, status: 'Active', default: 'No' },
      { id: 3, name: 'British Pound', code: 'GBP', symbol: '£', rate: 0.79, status: 'Active', default: 'No' },
      { id: 4, name: 'Japanese Yen', code: 'JPY', symbol: '¥', rate: 149.5, status: 'Active', default: 'No' },
      { id: 5, name: 'Canadian Dollar', code: 'CAD', symbol: 'C$', rate: 1.36, status: 'Inactive', default: 'No' }
    ])
    setCurrencies(saved)
  }, [])

  const handleCreate = () => {
    setEditingCurrency(null)
    setFormData({ name: '', code: '', symbol: '', rate: 1.0, status: 'Active', default: 'No' })
    setIsModalOpen(true)
  }

  const handleEdit = (currency: Currency) => {
    setEditingCurrency(currency)
    setFormData({
      name: currency.name,
      code: currency.code,
      symbol: currency.symbol,
      rate: currency.rate,
      status: currency.status,
      default: currency.default
    })
    setIsModalOpen(true)
  }

  const handleDelete = (currency: Currency) => {
    if (currency.default === 'Yes') {
      showToast('Cannot delete default currency', 'error')
      return
    }
    if (window.confirm(`Are you sure you want to delete ${currency.name}?`)) {
      const updated = currencies.filter((c) => c.id !== currency.id)
      setCurrencies(updated)
      storage.set('setup-currencies', updated)
      showToast('Currency deleted successfully', 'success')
    }
  }

  const handleSubmit = () => {
    if (!formData.name || !formData.code || !formData.symbol) {
      showToast('Please fill in all required fields', 'error')
      return
    }

    if (formData.default === 'Yes') {
      const updated = currencies.map((c) => ({ ...c, default: 'No' }))
      if (editingCurrency) {
        const final = updated.map((c) =>
          c.id === editingCurrency.id ? { ...c, ...formData } : c
        )
        setCurrencies(final)
        storage.set('setup-currencies', final)
        showToast('Currency updated successfully', 'success')
      } else {
        const newCurrency: Currency = {
          id: Date.now(),
          ...formData
        }
        const final = [...updated, newCurrency]
        setCurrencies(final)
        storage.set('setup-currencies', final)
        showToast('Currency created successfully', 'success')
      }
    } else {
      if (editingCurrency) {
        const updated = currencies.map((c) =>
          c.id === editingCurrency.id ? { ...c, ...formData } : c
        )
        setCurrencies(updated)
        storage.set('setup-currencies', updated)
        showToast('Currency updated successfully', 'success')
      } else {
        const newCurrency: Currency = {
          id: Date.now(),
          ...formData
        }
        const updated = [...currencies, newCurrency]
        setCurrencies(updated)
        storage.set('setup-currencies', updated)
        showToast('Currency created successfully', 'success')
      }
    }
    setIsModalOpen(false)
  }

  const columns = [
    { key: 'name', label: 'Currency' },
    { key: 'code', label: 'Code' },
    { key: 'symbol', label: 'Symbol' },
    { key: 'rate', label: 'Exchange Rate' },
    { key: 'status', label: 'Status' },
    { key: 'default', label: 'Default' }
  ]

  return (
    <div>
      <DataTable
        title="Currency"
        columns={columns}
        data={currencies}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        onBulkDelete={(selected) => {
          const ids = selected.map((s: any) => s.id)
          const updated = currencies.filter((c) => !ids.includes(c.id) && c.default !== 'Yes')
          setCurrencies(updated)
          storage.set('setup-currencies', updated)
          showToast(`${selected.length} currency(s) deleted successfully`, 'success')
        }}
        exportFilename="currencies"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCurrency ? 'Edit Currency' : 'Create New Currency'}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Currency Name *
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
              Code *
            </label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
              placeholder="USD"
              maxLength={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Symbol *
            </label>
            <input
              type="text"
              value={formData.symbol}
              onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
              placeholder="$"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Exchange Rate
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.rate}
              onChange={(e) => setFormData({ ...formData, rate: parseFloat(e.target.value) || 0 })}
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Set as Default
            </label>
            <select
              value={formData.default}
              onChange={(e) => setFormData({ ...formData, default: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            >
              <option>No</option>
              <option>Yes</option>
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
              {editingCurrency ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

