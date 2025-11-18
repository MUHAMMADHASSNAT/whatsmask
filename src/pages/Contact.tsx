import { useState, useEffect } from 'react'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'
import { storage } from '../utils/storage'
import { showToast } from '../components/ToastContainer'

interface Contact {
  id: number
  name: string
  phone: string
  email: string
  status: string
  lastContact: string
}

export default function Contact() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    status: 'Active'
  })

  useEffect(() => {
    const saved = storage.get<Contact[]>('contacts', [
      { id: 1, name: 'John Doe', phone: '+1234567890', email: 'john@example.com', status: 'Active', lastContact: '2024-11-20' },
      { id: 2, name: 'Jane Smith', phone: '+1234567891', email: 'jane@example.com', status: 'Active', lastContact: '2024-11-19' },
      { id: 3, name: 'Bob Johnson', phone: '+1234567892', email: 'bob@example.com', status: 'Inactive', lastContact: '2024-11-15' },
      { id: 4, name: 'Alice Williams', phone: '+1234567893', email: 'alice@example.com', status: 'Active', lastContact: '2024-11-18' },
      { id: 5, name: 'Charlie Brown', phone: '+1234567894', email: 'charlie@example.com', status: 'Active', lastContact: '2024-11-20' }
    ])
    setContacts(saved)
  }, [])

  const handleCreate = () => {
    setEditingContact(null)
    setFormData({ name: '', phone: '', email: '', status: 'Active' })
    setIsModalOpen(true)
  }

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact)
    setFormData({
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      status: contact.status
    })
    setIsModalOpen(true)
  }

  const handleDelete = (contact: Contact) => {
    if (window.confirm(`Are you sure you want to delete ${contact.name}?`)) {
      const updated = contacts.filter((c) => c.id !== contact.id)
      setContacts(updated)
      storage.set('contacts', updated)
      showToast('Contact deleted successfully', 'success')
    }
  }

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      showToast('Please fill in all required fields', 'error')
      return
    }

    if (editingContact) {
      const updated = contacts.map((c) =>
        c.id === editingContact.id
          ? { ...c, ...formData, lastContact: new Date().toISOString().split('T')[0] }
          : c
      )
      setContacts(updated)
      storage.set('contacts', updated)
      showToast('Contact updated successfully', 'success')
    } else {
      const newContact: Contact = {
        id: Date.now(),
        ...formData,
        lastContact: new Date().toISOString().split('T')[0]
      }
      const updated = [...contacts, newContact]
      setContacts(updated)
      storage.set('contacts', updated)
      showToast('Contact created successfully', 'success')
    }
    setIsModalOpen(false)
  }

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'phone', label: 'Phone' },
    { key: 'email', label: 'Email' },
    { key: 'status', label: 'Status' },
    { key: 'lastContact', label: 'Last Contact' }
  ]

  return (
    <div>
      <DataTable
        title="Contacts"
        columns={columns}
        data={contacts}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingContact ? 'Edit Contact' : 'Create New Contact'}
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
              Phone *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
              {editingContact ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
