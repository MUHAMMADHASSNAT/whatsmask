import { useState, useEffect } from 'react'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'
import { storage } from '../utils/storage'
import { showToast } from '../components/ToastContainer'

interface Subscription {
  id: number
  client: string
  plan: string
  amount: string
  status: string
  nextBilling: string
}

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null)
  const [formData, setFormData] = useState({
    client: '',
    plan: '',
    amount: '',
    status: 'Active',
    nextBilling: ''
  })

  useEffect(() => {
    const saved = storage.get<Subscription[]>('subscriptions', [
      { id: 1, client: 'Acme Corp', plan: 'Enterprise', amount: '$500', status: 'Active', nextBilling: '2024-12-15' },
      { id: 2, client: 'Tech Solutions', plan: 'Professional', amount: '$300', status: 'Active', nextBilling: '2024-12-20' },
      { id: 3, client: 'Global Inc', plan: 'Starter', amount: '$100', status: 'Cancelled', nextBilling: '-' },
      { id: 4, client: 'Digital Agency', plan: 'Professional', amount: '$300', status: 'Active', nextBilling: '2024-12-05' },
      { id: 5, client: 'StartupXYZ', plan: 'Starter', amount: '$100', status: 'Active', nextBilling: '2024-12-12' }
    ])
    setSubscriptions(saved)
  }, [])

  const handleCreate = () => {
    setEditingSubscription(null)
    setFormData({ client: '', plan: '', amount: '', status: 'Active', nextBilling: '' })
    setIsModalOpen(true)
  }

  const handleEdit = (subscription: Subscription) => {
    setEditingSubscription(subscription)
    setFormData({
      client: subscription.client,
      plan: subscription.plan,
      amount: subscription.amount,
      status: subscription.status,
      nextBilling: subscription.nextBilling
    })
    setIsModalOpen(true)
  }

  const handleDelete = (subscription: Subscription) => {
    if (window.confirm(`Are you sure you want to delete subscription for ${subscription.client}?`)) {
      const updated = subscriptions.filter((s) => s.id !== subscription.id)
      setSubscriptions(updated)
      storage.set('subscriptions', updated)
      showToast('Subscription deleted successfully', 'success')
    }
  }

  const handleSubmit = () => {
    if (!formData.client || !formData.plan || !formData.amount) {
      showToast('Please fill in all required fields', 'error')
      return
    }

    if (editingSubscription) {
      const updated = subscriptions.map((s) =>
        s.id === editingSubscription.id ? { ...s, ...formData } : s
      )
      setSubscriptions(updated)
      storage.set('subscriptions', updated)
      showToast('Subscription updated successfully', 'success')
    } else {
      const newSubscription: Subscription = {
        id: Date.now(),
        ...formData
      }
      const updated = [...subscriptions, newSubscription]
      setSubscriptions(updated)
      storage.set('subscriptions', updated)
      showToast('Subscription created successfully', 'success')
    }
    setIsModalOpen(false)
  }

  const columns = [
    { key: 'client', label: 'Client' },
    { key: 'plan', label: 'Plan' },
    { key: 'amount', label: 'Amount' },
    { key: 'status', label: 'Status' },
    { key: 'nextBilling', label: 'Next Billing' }
  ]

  return (
    <div>
      <DataTable
        title="Subscriptions"
        columns={columns}
        data={subscriptions}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingSubscription ? 'Edit Subscription' : 'Create New Subscription'}
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
              Plan *
            </label>
            <select
              value={formData.plan}
              onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            >
              <option value="">Select Plan</option>
              <option>Starter</option>
              <option>Professional</option>
              <option>Enterprise</option>
            </select>
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
              <option>Active</option>
              <option>Cancelled</option>
              <option>Suspended</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Next Billing Date
            </label>
            <input
              type="date"
              value={formData.nextBilling}
              onChange={(e) => setFormData({ ...formData, nextBilling: e.target.value })}
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
              {editingSubscription ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
