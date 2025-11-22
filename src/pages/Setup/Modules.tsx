import { useState, useEffect } from 'react'
import DataTable from '../../components/DataTable'
import Modal from '../../components/Modal'
import { storage } from '../../utils/storage'
import { showToast } from '../../components/ToastContainer'

interface Module {
  id: number
  name: string
  version: string
  status: string
  description: string
}

export default function SetupModules() {
  const [modules, setModules] = useState<Module[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingModule, setEditingModule] = useState<Module | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    version: '1.0.0',
    status: 'Enabled',
    description: ''
  })

  useEffect(() => {
    const saved = storage.get<Module[]>('setup-modules', [
      { id: 1, name: 'Email Marketing', version: '1.2.0', status: 'Enabled', description: 'Send marketing emails' },
      { id: 2, name: 'Analytics', version: '2.1.0', status: 'Enabled', description: 'Track user analytics' },
      { id: 3, name: 'SMS Gateway', version: '1.0.5', status: 'Enabled', description: 'Send SMS notifications' },
      { id: 4, name: 'Backup System', version: '3.0.0', status: 'Disabled', description: 'Automated backups' },
      { id: 5, name: 'API Gateway', version: '1.5.2', status: 'Enabled', description: 'Manage API access' }
    ])
    setModules(saved)
  }, [])

  const handleCreate = () => {
    setEditingModule(null)
    setFormData({ name: '', version: '1.0.0', status: 'Enabled', description: '' })
    setIsModalOpen(true)
  }

  const handleEdit = (module: Module) => {
    setEditingModule(module)
    setFormData({
      name: module.name,
      version: module.version,
      status: module.status,
      description: module.description
    })
    setIsModalOpen(true)
  }

  const handleDelete = (module: Module) => {
    if (window.confirm(`Are you sure you want to delete ${module.name}?`)) {
      const updated = modules.filter((m) => m.id !== module.id)
      setModules(updated)
      storage.set('setup-modules', updated)
      showToast('Module deleted successfully', 'success')
    }
  }

  const handleToggleStatus = (module: Module) => {
    const updated = modules.map((m) =>
      m.id === module.id
        ? { ...m, status: m.status === 'Enabled' ? 'Disabled' : 'Enabled' }
        : m
    )
    setModules(updated)
    storage.set('setup-modules', updated)
    showToast(`Module ${module.status === 'Enabled' ? 'disabled' : 'enabled'} successfully`, 'success')
  }

  const handleSubmit = () => {
    if (!formData.name || !formData.description) {
      showToast('Please fill in all required fields', 'error')
      return
    }

    if (editingModule) {
      const updated = modules.map((m) =>
        m.id === editingModule.id ? { ...m, ...formData } : m
      )
      setModules(updated)
      storage.set('setup-modules', updated)
      showToast('Module updated successfully', 'success')
    } else {
      const newModule: Module = {
        id: Date.now(),
        ...formData
      }
      const updated = [...modules, newModule]
      setModules(updated)
      storage.set('setup-modules', updated)
      showToast('Module created successfully', 'success')
    }
    setIsModalOpen(false)
  }

  const columns = [
    { key: 'name', label: 'Module Name' },
    { key: 'version', label: 'Version' },
    { key: 'status', label: 'Status' },
    { key: 'description', label: 'Description' }
  ]

  return (
    <div>
      <DataTable
        title="Modules"
        columns={columns}
        data={modules}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        onBulkDelete={(selected) => {
          const ids = selected.map((s: any) => s.id)
          const updated = modules.filter((m) => !ids.includes(m.id))
          setModules(updated)
          storage.set('setup-modules', updated)
          showToast(`${selected.length} module(s) deleted successfully`, 'success')
        }}
        exportFilename="modules"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingModule ? 'Edit Module' : 'Create New Module'}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Module Name *
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
              Version
            </label>
            <input
              type="text"
              value={formData.version}
              onChange={(e) => setFormData({ ...formData, version: e.target.value })}
              placeholder="1.0.0"
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
              <option>Enabled</option>
              <option>Disabled</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
              {editingModule ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

