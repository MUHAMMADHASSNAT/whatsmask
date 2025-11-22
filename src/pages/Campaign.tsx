import { useState, useEffect } from 'react'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'
import { storage } from '../utils/storage'
import { showToast } from '../components/ToastContainer'

interface Campaign {
  id: number
  name: string
  status: string
  recipients: number
  sent: number
  opened: number
  created: string
}

export default function Campaign() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    status: 'Draft',
    recipients: 0,
    sent: 0,
    opened: 0
  })

  useEffect(() => {
    const saved = storage.get<Campaign[]>('campaigns', [
  { id: 1, name: 'Summer Sale 2024', status: 'Active', recipients: 1500, sent: 1450, opened: 1200, created: '2024-11-15' },
  { id: 2, name: 'Product Launch', status: 'Scheduled', recipients: 2000, sent: 0, opened: 0, created: '2024-11-16' },
  { id: 3, name: 'Holiday Promotion', status: 'Completed', recipients: 3000, sent: 3000, opened: 2500, created: '2024-11-10' },
  { id: 4, name: 'Newsletter', status: 'Active', recipients: 5000, sent: 4800, opened: 4000, created: '2024-11-18' },
  { id: 5, name: 'Reminder Campaign', status: 'Draft', recipients: 0, sent: 0, opened: 0, created: '2024-11-19' }
    ])
    setCampaigns(saved)
  }, [])

  const handleCreate = () => {
    setEditingCampaign(null)
    setFormData({ name: '', status: 'Draft', recipients: 0, sent: 0, opened: 0 })
    setIsModalOpen(true)
  }

  const handleEdit = (campaign: Campaign) => {
    setEditingCampaign(campaign)
    setFormData({
      name: campaign.name,
      status: campaign.status,
      recipients: campaign.recipients,
      sent: campaign.sent,
      opened: campaign.opened
    })
    setIsModalOpen(true)
  }

  const handleDelete = (campaign: Campaign) => {
    if (window.confirm(`Are you sure you want to delete ${campaign.name}?`)) {
      const updated = campaigns.filter((c) => c.id !== campaign.id)
      setCampaigns(updated)
      storage.set('campaigns', updated)
      showToast('Campaign deleted successfully', 'success')
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
      storage.set('campaigns', updated)
      showToast('Campaign updated successfully', 'success')
    } else {
      const newCampaign: Campaign = {
        id: Date.now(),
        ...formData,
        created: new Date().toISOString().split('T')[0]
      }
      const updated = [...campaigns, newCampaign]
      setCampaigns(updated)
      storage.set('campaigns', updated)
      showToast('Campaign created successfully', 'success')
    }
    setIsModalOpen(false)
  }

  const columns = [
    { key: 'name', label: 'Campaign Name' },
    { key: 'status', label: 'Status' },
    { key: 'recipients', label: 'Recipients' },
    { key: 'sent', label: 'Sent' },
    { key: 'opened', label: 'Opened' },
    { key: 'created', label: 'Created' }
  ]

  return (
    <div>
      <DataTable
        title="Campaigns"
        columns={columns}
        data={campaigns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        onBulkDelete={(selected) => {
          const ids = selected.map((s: any) => s.id)
          const updated = campaigns.filter((c) => !ids.includes(c.id))
          setCampaigns(updated)
          storage.set('campaigns', updated)
          showToast(`${selected.length} campaign(s) deleted successfully`, 'success')
        }}
        exportFilename="campaigns"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCampaign ? 'Edit Campaign' : 'Create New Campaign'}
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
              <option>Draft</option>
              <option>Scheduled</option>
              <option>Active</option>
              <option>Completed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recipients
            </label>
            <input
              type="number"
              value={formData.recipients}
              onChange={(e) => setFormData({ ...formData, recipients: parseInt(e.target.value) || 0 })}
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

