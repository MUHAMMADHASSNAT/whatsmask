import { useState, useEffect } from 'react'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'
import { storage } from '../utils/storage'
import { showToast } from '../components/ToastContainer'

interface Plan {
  id: number
  name: string
  price: string
  duration: string
  features: string
  status: string
}

export default function Plans() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    duration: 'Monthly',
    features: '',
    status: 'Active'
  })

  useEffect(() => {
    const saved = storage.get<Plan[]>('plans', [
      { id: 1, name: 'Starter', price: '$100', duration: 'Monthly', features: 'Basic Features', status: 'Active' },
      { id: 2, name: 'Professional', price: '$300', duration: 'Monthly', features: 'Advanced Features', status: 'Active' },
      { id: 3, name: 'Enterprise', price: '$500', duration: 'Monthly', features: 'All Features', status: 'Active' },
      { id: 4, name: 'Starter Annual', price: '$1,000', duration: 'Yearly', features: 'Basic Features', status: 'Active' },
      { id: 5, name: 'Professional Annual', price: '$3,000', duration: 'Yearly', features: 'Advanced Features', status: 'Active' }
    ])
    setPlans(saved)
  }, [])

  const handleCreate = () => {
    setEditingPlan(null)
    setFormData({ name: '', price: '', duration: 'Monthly', features: '', status: 'Active' })
    setIsModalOpen(true)
  }

  const handleEdit = (plan: Plan) => {
    setEditingPlan(plan)
    setFormData({
      name: plan.name,
      price: plan.price,
      duration: plan.duration,
      features: plan.features,
      status: plan.status
    })
    setIsModalOpen(true)
  }

  const handleDelete = (plan: Plan) => {
    if (window.confirm(`Are you sure you want to delete ${plan.name}?`)) {
      const updated = plans.filter((p) => p.id !== plan.id)
      setPlans(updated)
      storage.set('plans', updated)
      showToast('Plan deleted successfully', 'success')
    }
  }

  const handleSubmit = () => {
    if (!formData.name || !formData.price) {
      showToast('Please fill in all required fields', 'error')
      return
    }

    if (editingPlan) {
      const updated = plans.map((p) =>
        p.id === editingPlan.id ? { ...p, ...formData } : p
      )
      setPlans(updated)
      storage.set('plans', updated)
      showToast('Plan updated successfully', 'success')
    } else {
      const newPlan: Plan = {
        id: Date.now(),
        ...formData
      }
      const updated = [...plans, newPlan]
      setPlans(updated)
      storage.set('plans', updated)
      showToast('Plan created successfully', 'success')
    }
    setIsModalOpen(false)
  }

  const columns = [
    { key: 'name', label: 'Plan Name' },
    { key: 'price', label: 'Price' },
    { key: 'duration', label: 'Duration' },
    { key: 'features', label: 'Features' },
    { key: 'status', label: 'Status' }
  ]

  return (
    <div>
      <DataTable
        title="Plans"
        columns={columns}
        data={plans}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        onBulkDelete={(selected) => {
          const ids = selected.map((s: any) => s.id)
          const updated = plans.filter((p) => !ids.includes(p.id))
          setPlans(updated)
          storage.set('plans', updated)
          showToast(`${selected.length} plan(s) deleted successfully`, 'success')
        }}
        exportFilename="plans"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingPlan ? 'Edit Plan' : 'Create New Plan'}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Plan Name *
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
              Price *
            </label>
            <input
              type="text"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="$100"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration
            </label>
            <select
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            >
              <option>Monthly</option>
              <option>Yearly</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Features
            </label>
            <input
              type="text"
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
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
              {editingPlan ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
