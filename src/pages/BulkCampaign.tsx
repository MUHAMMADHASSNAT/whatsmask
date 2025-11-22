import { useState, useEffect } from 'react'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'
import { storage } from '../utils/storage'
import { showToast } from '../components/ToastContainer'

interface BulkCampaign {
  id: number
  name: string
  status: string
  contacts: number
  sent: number
  created: string
}

export default function BulkCampaign() {
  const [campaigns, setCampaigns] = useState<BulkCampaign[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCampaign, setEditingCampaign] = useState<BulkCampaign | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    status: 'Scheduled',
    contacts: 0,
    sent: 0
  })

  useEffect(() => {
    const saved = storage.get<BulkCampaign[]>('bulk-campaigns', [
  { id: 1, name: 'Bulk Newsletter', status: 'Active', contacts: 10000, sent: 9500, created: '2024-11-15' },
  { id: 2, name: 'Mass Announcement', status: 'Scheduled', contacts: 5000, sent: 0, created: '2024-11-16' },
  { id: 3, name: 'Promotional Blast', status: 'Completed', contacts: 15000, sent: 15000, created: '2024-11-10' }
    ])
    setCampaigns(saved)
  }, [])

  const handleCreate = () => {
    setEditingCampaign(null)
    setFormData({ name: '', status: 'Scheduled', contacts: 0, sent: 0 })
    setIsModalOpen(true)
  }

  const handleEdit = (campaign: BulkCampaign) => {
    setEditingCampaign(campaign)
    setFormData({
      name: campaign.name,
      status: campaign.status,
      contacts: campaign.contacts,
      sent: campaign.sent
    })
    setIsModalOpen(true)
  }

  const handleDelete = (campaign: BulkCampaign) => {
    if (window.confirm(`Are you sure you want to delete ${campaign.name}?`)) {
      const updated = campaigns.filter((c) => c.id !== campaign.id)
      setCampaigns(updated)
      storage.set('bulk-campaigns', updated)
      showToast('Bulk campaign deleted successfully', 'success')
    }
  }

  const handleSubmit = () => {
    if (!formData.name) {
      showToast('Please fill in campaign name', 'error')
      return
    }

    if (editingCampaign) {
      const updated = campaigns.map((c) =>
        c.id === editingCampaign.id ? { ...c, ...formData } : c
      )
      setCampaigns(updated)
      storage.set('bulk-campaigns', updated)
      showToast('Bulk campaign updated successfully', 'success')
    } else {
      const newCampaign: BulkCampaign = {
        id: Date.now(),
        ...formData,
        created: new Date().toISOString().split('T')[0]
      }
      const updated = [...campaigns, newCampaign]
      setCampaigns(updated)
      storage.set('bulk-campaigns', updated)
      showToast('Bulk campaign created successfully', 'success')
    }
    setIsModalOpen(false)
  }

  const columns = [
    { key: 'name', label: 'Campaign Name' },
    { key: 'status', label: 'Status' },
    { key: 'contacts', label: 'Contacts' },
    { key: 'sent', label: 'Sent' },
    { key: 'created', label: 'Created' }
  ]

  return (
    <div>
      <DataTable
        title="Bulk Campaigns"
        columns={columns}
        data={campaigns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        onBulkDelete={(selected) => {
          const ids = selected.map((s: any) => s.id)
          const updated = campaigns.filter((c) => !ids.includes(c.id))
          setCampaigns(updated)
          storage.set('bulk-campaigns', updated)
          showToast(`${selected.length} bulk campaign(s) deleted successfully`, 'success')
        }}
        exportFilename="bulk-campaigns"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCampaign ? 'Edit Bulk Campaign' : 'Create New Bulk Campaign'}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Campaign Name *
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
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            >
              <option>Scheduled</option>
              <option>Active</option>
              <option>Completed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contacts
            </label>
            <input
              type="number"
              value={formData.contacts}
              onChange={(e) => setFormData({ ...formData, contacts: parseInt(e.target.value) || 0 })}
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
              {editingCampaign ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

