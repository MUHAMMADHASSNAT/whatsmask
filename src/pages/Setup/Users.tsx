import { useState, useEffect } from 'react'
import DataTable from '../../components/DataTable'
import Modal from '../../components/Modal'
import { storage } from '../../utils/storage'
import { showToast } from '../../components/ToastContainer'

interface User {
  id: number
  name: string
  email: string
  role: string
  department: string
  status: string
}

export default function SetupUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'User',
    department: 'IT',
    status: 'Active'
  })

  useEffect(() => {
    const saved = storage.get<User[]>('setup-users', [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', department: 'IT', status: 'Active' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Manager', department: 'Sales', status: 'Active' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', department: 'Support', status: 'Inactive' },
      { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'Admin', department: 'IT', status: 'Active' },
      { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', department: 'Marketing', status: 'Active' }
    ])
    setUsers(saved)
  }, [])

  const handleCreate = () => {
    setEditingUser(null)
    setFormData({ name: '', email: '', role: 'User', department: 'IT', status: 'Active' })
    setIsModalOpen(true)
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      status: user.status
    })
    setIsModalOpen(true)
  }

  const handleDelete = (user: User) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      const updated = users.filter((u) => u.id !== user.id)
      setUsers(updated)
      storage.set('setup-users', updated)
      showToast('User deleted successfully', 'success')
    }
  }

  const handleSubmit = () => {
    if (!formData.name || !formData.email) {
      showToast('Please fill in all required fields', 'error')
      return
    }

    if (editingUser) {
      const updated = users.map((u) =>
        u.id === editingUser.id ? { ...u, ...formData } : u
      )
      setUsers(updated)
      storage.set('setup-users', updated)
      showToast('User updated successfully', 'success')
    } else {
      const newUser: User = {
        id: Date.now(),
        ...formData
      }
      const updated = [...users, newUser]
      setUsers(updated)
      storage.set('setup-users', updated)
      showToast('User created successfully', 'success')
    }
    setIsModalOpen(false)
  }

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'department', label: 'Department' },
    { key: 'status', label: 'Status' }
  ]

  return (
    <div>
      <DataTable
        title="Users"
        columns={columns}
        data={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        onBulkDelete={(selected) => {
          const ids = selected.map((s: any) => s.id)
          const updated = users.filter((u) => !ids.includes(u.id))
          setUsers(updated)
          storage.set('setup-users', updated)
          showToast(`${selected.length} user(s) deleted successfully`, 'success')
        }}
        exportFilename="users"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingUser ? 'Edit User' : 'Create New User'}
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
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            >
              <option>User</option>
              <option>Manager</option>
              <option>Admin</option>
              <option>Super Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department
            </label>
            <select
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            >
              <option>IT</option>
              <option>Sales</option>
              <option>Support</option>
              <option>Marketing</option>
              <option>Finance</option>
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
              {editingUser ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

