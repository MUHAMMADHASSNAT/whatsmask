import { useState, useEffect } from 'react'
import DataTable from '../../components/DataTable'
import Modal from '../../components/Modal'
import { storage } from '../../utils/storage'
import { showToast } from '../../components/ToastContainer'

interface Tax {
  id: number
  name: string
  rate: string
  country: string
  status: string
}

export default function SetupTaxes() {
  const [taxes, setTaxes] = useState<Tax[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTax, setEditingTax] = useState<Tax | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    rate: '',
    country: '',
    status: 'Active'
  })

  useEffect(() => {
    const saved = storage.get<Tax[]>('setup-taxes', [
      { id: 1, name: 'VAT', rate: '20%', country: 'UK', status: 'Active' },
      { id: 2, name: 'Sales Tax', rate: '8%', country: 'US', status: 'Active' },
      { id: 3, name: 'GST', rate: '18%', country: 'India', status: 'Active' },
      { id: 4, name: 'VAT', rate: '19%', country: 'Germany', status: 'Active' },
      { id: 5, name: 'HST', rate: '13%', country: 'Canada', status: 'Inactive' }
    ])
    setTaxes(saved)
  }, [])

  const handleCreate = () => {
    setEditingTax(null)
    setFormData({ name: '', rate: '', country: '', status: 'Active' })
    setIsModalOpen(true)
  }

  const handleEdit = (tax: Tax) => {
    setEditingTax(tax)
    setFormData({
      name: tax.name,
      rate: tax.rate,
      country: tax.country,
      status: tax.status
    })
    setIsModalOpen(true)
  }

  const handleDelete = (tax: Tax) => {
    if (window.confirm(`Are you sure you want to delete ${tax.name}?`)) {
      const updated = taxes.filter((t) => t.id !== tax.id)
      setTaxes(updated)
      storage.set('setup-taxes', updated)
      showToast('Tax deleted successfully', 'success')
    }
  }

  const handleSubmit = () => {
    if (!formData.name || !formData.rate || !formData.country) {
      showToast('Please fill in all required fields', 'error')
      return
    }

    if (editingTax) {
      const updated = taxes.map((t) =>
        t.id === editingTax.id ? { ...t, ...formData } : t
      )
      setTaxes(updated)
      storage.set('setup-taxes', updated)
      showToast('Tax updated successfully', 'success')
    } else {
      const newTax: Tax = {
        id: Date.now(),
        ...formData
      }
      const updated = [...taxes, newTax]
      setTaxes(updated)
      storage.set('setup-taxes', updated)
      showToast('Tax created successfully', 'success')
    }
    setIsModalOpen(false)
  }

  const columns = [
    { key: 'name', label: 'Tax Name' },
    { key: 'rate', label: 'Rate' },
    { key: 'country', label: 'Country' },
    { key: 'status', label: 'Status' }
  ]

  return (
    <div>
      <DataTable
        title="Taxes"
        columns={columns}
        data={taxes}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        onBulkDelete={(selected) => {
          const ids = selected.map((s: any) => s.id)
          const updated = taxes.filter((t) => !ids.includes(t.id))
          setTaxes(updated)
          storage.set('setup-taxes', updated)
          showToast(`${selected.length} tax(es) deleted successfully`, 'success')
        }}
        exportFilename="taxes"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTax ? 'Edit Tax' : 'Create New Tax'}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tax Name *
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
              Rate *
            </label>
            <input
              type="text"
              value={formData.rate}
              onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
              placeholder="20%"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country *
            </label>
            <input
              type="text"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
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
              {editingTax ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

