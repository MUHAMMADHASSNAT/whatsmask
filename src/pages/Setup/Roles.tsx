import { useState, useEffect } from 'react'
import DataTable from '../../components/DataTable'
import Modal from '../../components/Modal'
import { storage } from '../../utils/storage'
import { showToast } from '../../components/ToastContainer'

interface Role {
  id: number
  name: string
  permissions: string
  users: number
  status: string
}

export default function SetupRoles() {
  const [roles, setRoles] = useState<Role[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingRole, setEditingRole] = useState<Role | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    permissions: 'Basic',
    users: 0,
    status: 'Active'
  })

  useEffect(() => {
    const saved = storage.get<Role[]>('setup-roles', [
      { id: 1, name: 'Super Admin', permissions: 'All', users: 2, status: 'Active' },
      { id: 2, name: 'Admin', permissions: 'Most', users: 5, status: 'Active' },
      { id: 3, name: 'Manager', permissions: 'Limited', users: 10, status: 'Active' },
      { id: 4, name: 'User', permissions: 'Basic', users: 50, status: 'Active' },
      { id: 5, name: 'Guest', permissions: 'View Only', users: 3, status: 'Inactive' }
    ])
    setRoles(saved)
  }, [])

  const handleCreate = () => {
    setEditingRole(null)
    setFormData({ name: '', permissions: 'Basic', users: 0, status: 'Active' })
    setIsModalOpen(true)
  }

  const handleEdit = (role: Role) => {
    setEditingRole(role)
    setFormData({
      name: role.name,
      permissions: role.permissions,
      users: role.users,
      status: role.status
    })
    setIsModalOpen(true)
  }

  const handleDelete = (role: Role) => {
    if (window.confirm(`Are you sure you want to delete ${role.name}?`)) {
      const updated = roles.filter((r) => r.id !== role.id)
      setRoles(updated)
      storage.set('setup-roles', updated)
      showToast('Role deleted successfully', 'success')
    }
  }

  const handleSubmit = () => {
    if (!formData.name) {
      showToast('Please fill in role name', 'error')
      return
    }

    if (editingRole) {
      const updated = roles.map((r) =>
        r.id === editingRole.id ? { ...r, ...formData } : r
      )
      setRoles(updated)
      storage.set('setup-roles', updated)
      showToast('Role updated successfully', 'success')
    } else {
      const newRole: Role = {
        id: Date.now(),
        ...formData
      }
      const updated = [...roles, newRole]
      setRoles(updated)
      storage.set('setup-roles', updated)
      showToast('Role created successfully', 'success')
    }
    setIsModalOpen(false)
  }

  const columns = [
    { key: 'name', label: 'Role Name' },
    { key: 'permissions', label: 'Permissions' },
    { key: 'users', label: 'Users' },
    { key: 'status', label: 'Status' }
  ]

  return (
    <div>
      <DataTable
        title="Roles"
        columns={columns}
        data={roles}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        onBulkDelete={(selected) => {
          const ids = selected.map((s: any) => s.id)
          const updated = roles.filter((r) => !ids.includes(r.id))
          setRoles(updated)
          storage.set('setup-roles', updated)
          showToast(`${selected.length} role(s) deleted successfully`, 'success')
        }}
        exportFilename="roles"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingRole ? 'Edit Role' : 'Create New Role'}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role Name *
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
              Permissions
            </label>
            <select
              value={formData.permissions}
              onChange={(e) => setFormData({ ...formData, permissions: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            >
              <option>View Only</option>
              <option>Basic</option>
              <option>Limited</option>
              <option>Most</option>
              <option>All</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Users Count
            </label>
            <input
              type="number"
              value={formData.users}
              onChange={(e) => setFormData({ ...formData, users: parseInt(e.target.value) || 0 })}
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
              {editingRole ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

