import { useState, useEffect } from 'react'
import DataTable from '../../components/DataTable'
import Modal from '../../components/Modal'
import { storage } from '../../utils/storage'
import { showToast } from '../../components/ToastContainer'

interface Language {
  id: number
  name: string
  code: string
  flag: string
  status: string
  default: string
}

export default function SetupLanguages() {
  const [languages, setLanguages] = useState<Language[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingLanguage, setEditingLanguage] = useState<Language | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    flag: '',
    status: 'Active',
    default: 'No'
  })

  useEffect(() => {
    const saved = storage.get<Language[]>('setup-languages', [
      { id: 1, name: 'English', code: 'en', flag: '🇺🇸', status: 'Active', default: 'Yes' },
      { id: 2, name: 'Spanish', code: 'es', flag: '🇪🇸', status: 'Active', default: 'No' },
      { id: 3, name: 'French', code: 'fr', flag: '🇫🇷', status: 'Active', default: 'No' },
      { id: 4, name: 'German', code: 'de', flag: '🇩🇪', status: 'Active', default: 'No' },
      { id: 5, name: 'Arabic', code: 'ar', flag: '🇸🇦', status: 'Inactive', default: 'No' }
    ])
    setLanguages(saved)
  }, [])

  const handleCreate = () => {
    setEditingLanguage(null)
    setFormData({ name: '', code: '', flag: '', status: 'Active', default: 'No' })
    setIsModalOpen(true)
  }

  const handleEdit = (language: Language) => {
    setEditingLanguage(language)
    setFormData({
      name: language.name,
      code: language.code,
      flag: language.flag,
      status: language.status,
      default: language.default
    })
    setIsModalOpen(true)
  }

  const handleDelete = (language: Language) => {
    if (language.default === 'Yes') {
      showToast('Cannot delete default language', 'error')
      return
    }
    if (window.confirm(`Are you sure you want to delete ${language.name}?`)) {
      const updated = languages.filter((l) => l.id !== language.id)
      setLanguages(updated)
      storage.set('setup-languages', updated)
      showToast('Language deleted successfully', 'success')
    }
  }

  const handleSubmit = () => {
    if (!formData.name || !formData.code) {
      showToast('Please fill in all required fields', 'error')
      return
    }

    if (formData.default === 'Yes') {
      const updated = languages.map((l) => ({ ...l, default: 'No' }))
      if (editingLanguage) {
        const final = updated.map((l) =>
          l.id === editingLanguage.id ? { ...l, ...formData } : l
        )
        setLanguages(final)
        storage.set('setup-languages', final)
        showToast('Language updated successfully', 'success')
      } else {
        const newLanguage: Language = {
          id: Date.now(),
          ...formData
        }
        const final = [...updated, newLanguage]
        setLanguages(final)
        storage.set('setup-languages', final)
        showToast('Language created successfully', 'success')
      }
    } else {
      if (editingLanguage) {
        const updated = languages.map((l) =>
          l.id === editingLanguage.id ? { ...l, ...formData } : l
        )
        setLanguages(updated)
        storage.set('setup-languages', updated)
        showToast('Language updated successfully', 'success')
      } else {
        const newLanguage: Language = {
          id: Date.now(),
          ...formData
        }
        const updated = [...languages, newLanguage]
        setLanguages(updated)
        storage.set('setup-languages', updated)
        showToast('Language created successfully', 'success')
      }
    }
    setIsModalOpen(false)
  }

  const columns = [
    { key: 'name', label: 'Language' },
    { key: 'code', label: 'Code' },
    { key: 'flag', label: 'Flag' },
    { key: 'status', label: 'Status' },
    { key: 'default', label: 'Default' }
  ]

  return (
    <div>
      <DataTable
        title="Languages"
        columns={columns}
        data={languages}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        onBulkDelete={(selected) => {
          const ids = selected.map((s: any) => s.id)
          const updated = languages.filter((l) => !ids.includes(l.id) && l.default !== 'Yes')
          setLanguages(updated)
          storage.set('setup-languages', updated)
          showToast(`${selected.length} language(s) deleted successfully`, 'success')
        }}
        exportFilename="languages"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingLanguage ? 'Edit Language' : 'Create New Language'}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language Name *
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
              placeholder="en"
              maxLength={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Flag Emoji
            </label>
            <input
              type="text"
              value={formData.flag}
              onChange={(e) => setFormData({ ...formData, flag: e.target.value })}
              placeholder="🇺🇸"
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
              {editingLanguage ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

