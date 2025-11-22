import { useState, useEffect } from 'react'
import DataTable from '../../components/DataTable'
import Modal from '../../components/Modal'
import { storage } from '../../utils/storage'
import { showToast } from '../../components/ToastContainer'

interface Department {
  id: number
  name: string
  manager: string
  employees: number
  status: string
}

export default function SetupDepartments() {
  const [departments, setDepartments] = useState<Department[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    manager: '',
    employees: 0,
    status: 'Active'
  })

  useEffect(() => {
    const saved = storage.get<Department[]>('setup-departments', [
      { id: 1, name: 'IT', manager: 'John Doe', employees: 15, status: 'Active' },
      { id: 2, name: 'Sales', manager: 'Jane Smith', employees: 20, status: 'Active' },
      { id: 3, name: 'Support', manager: 'Bob Johnson', employees: 12, status: 'Active' },
      { id: 4, name: 'Marketing', manager: 'Alice Williams', employees: 8, status: 'Active' },
      { id: 5, name: 'Finance', manager: 'Charlie Brown', employees: 5, status: 'Active' }
    ])
    setDepartments(saved)
  }, [])

  const handleCreate = () => {
    setEditingDepartment(null)
    setFormData({ name: '', manager: '', employees: 0, status: 'Active' })
    setIsModalOpen(true)
  }

  const handleEdit = (department: Department) => {
    setEditingDepartment(department)
    setFormData({
      name: department.name,
      manager: department.manager,
      employees: department.employees,
      status: department.status
    })
    setIsModalOpen(true)
  }

  const handleDelete = (department: Department) => {
    if (window.confirm(`Are you sure you want to delete ${department.name}?`)) {
      const updated = departments.filter((d) => d.id !== department.id)
      setDepartments(updated)
      storage.set('setup-departments', updated)
      showToast('Department deleted successfully', 'success')
    }
  }

  const handleSubmit = () => {
    if (!formData.name || !formData.manager) {
      showToast('Please fill in all required fields', 'error')
      return
    }

    if (editingDepartment) {
      const updated = departments.map((d) =>
        d.id === editingDepartment.id ? { ...d, ...formData } : d
      )
      setDepartments(updated)
      storage.set('setup-departments', updated)
      showToast('Department updated successfully', 'success')
    } else {
      const newDepartment: Department = {
        id: Date.now(),
        ...formData
      }
      const updated = [...departments, newDepartment]
      setDepartments(updated)
      storage.set('setup-departments', updated)
      showToast('Department created successfully', 'success')
    }
    setIsModalOpen(false)
  }

  const columns = [
    { key: 'name', label: 'Department' },
    { key: 'manager', label: 'Manager' },
    { key: 'employees', label: 'Employees' },
    { key: 'status', label: 'Status' }
  ]

  return (
    <div>
      <DataTable
        title="Departments"
        columns={columns}
        data={departments}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        onBulkDelete={(selected) => {
          const ids = selected.map((s: any) => s.id)
          const updated = departments.filter((d) => !ids.includes(d.id))
          setDepartments(updated)
          storage.set('setup-departments', updated)
          showToast(`${selected.length} department(s) deleted successfully`, 'success')
        }}
        exportFilename="departments"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingDepartment ? 'Edit Department' : 'Create New Department'}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department Name *
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
              Manager *
            </label>
            <input
              type="text"
              value={formData.manager}
              onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Employees
            </label>
            <input
              type="number"
              value={formData.employees}
              onChange={(e) => setFormData({ ...formData, employees: parseInt(e.target.value) || 0 })}
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
              {editingDepartment ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

