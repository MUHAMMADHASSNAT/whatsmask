import { useState, useEffect } from 'react'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'
import { storage } from '../utils/storage'
import { showToast } from '../components/ToastContainer'

interface Tenant {
  id: number
  name: string
  email: string
  plan: string
  status: string
  created: string
}

export default function Tenants() {
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTenant, setEditingTenant] = useState<Tenant | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    plan: 'Starter',
    status: 'Active'
  })

  useEffect(() => {
    const saved = storage.get<Tenant[]>('tenants', [
      { id: 1, name: 'Acme Corp', email: 'contact@acme.com', plan: 'Enterprise', status: 'Active', created: '2024-01-15' },
      { id: 2, name: 'Tech Solutions', email: 'info@techsol.com', plan: 'Professional', status: 'Active', created: '2024-02-20' },
      { id: 3, name: 'Global Inc', email: 'hello@global.com', plan: 'Starter', status: 'Suspended', created: '2024-03-10' },
      { id: 4, name: 'Digital Agency', email: 'team@digital.com', plan: 'Professional', status: 'Active', created: '2024-01-05' },
      { id: 5, name: 'StartupXYZ', email: 'contact@startup.com', plan: 'Starter', status: 'Active', created: '2024-04-12' }
    ])
    setTenants(saved)
  }, [])

  const handleCreate = () => {
    setEditingTenant(null)
    setFormData({ name: '', email: '', plan: 'Starter', status: 'Active' })
    setIsModalOpen(true)
  }

  const handleEdit = (tenant: Tenant) => {
    setEditingTenant(tenant)
    setFormData({
      name: tenant.name,
      email: tenant.email,
      plan: tenant.plan,
      status: tenant.status
    })
    setIsModalOpen(true)
  }

  const handleDelete = (tenant: Tenant) => {
    if (window.confirm(`Are you sure you want to delete ${tenant.name}?`)) {
      const updated = tenants.filter((t) => t.id !== tenant.id)
      setTenants(updated)
      storage.set('tenants', updated)
      showToast('Tenant deleted successfully', 'success')
    }
  }

  const handleSubmit = () => {
    if (!formData.name || !formData.email) {
      showToast('Please fill in all required fields', 'error')
      return
    }

    if (editingTenant) {
      const updated = tenants.map((t) =>
        t.id === editingTenant.id
          ? { ...t, ...formData }
          : t
      )
      setTenants(updated)
      storage.set('tenants', updated)
      showToast('Tenant updated successfully', 'success')
    } else {
      const newTenant: Tenant = {
        id: Date.now(),
        ...formData,
        created: new Date().toISOString().split('T')[0]
      }
      const updated = [...tenants, newTenant]
      setTenants(updated)
      storage.set('tenants', updated)
      showToast('Tenant created successfully', 'success')
    }
    setIsModalOpen(false)
  }

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'plan', label: 'Plan' },
    { key: 'status', label: 'Status' },
    { key: 'created', label: 'Created' }
  ]

  return (
    <div>
      <DataTable
        title="Tenants"
        columns={columns}
        data={tenants}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTenant ? 'Edit Tenant' : 'Create New Tenant'}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name *
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
              Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Plan
            </label>
            <select
              value={formData.plan}
              onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            >
              <option>Starter</option>
              <option>Professional</option>
              <option>Enterprise</option>
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
              <option>Active</option>
              <option>Suspended</option>
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
              {editingTenant ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
