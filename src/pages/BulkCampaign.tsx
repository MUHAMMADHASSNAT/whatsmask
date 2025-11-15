import DataTable from '../components/DataTable'

const mockBulkCampaigns = [
  { id: 1, name: 'Bulk Newsletter', status: 'Active', contacts: 10000, sent: 9500, created: '2024-11-15' },
  { id: 2, name: 'Mass Announcement', status: 'Scheduled', contacts: 5000, sent: 0, created: '2024-11-16' },
  { id: 3, name: 'Promotional Blast', status: 'Completed', contacts: 15000, sent: 15000, created: '2024-11-10' }
]

export default function BulkCampaign() {
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
        data={mockBulkCampaigns}
        onEdit={(row) => console.log('Edit', row)}
        onDelete={(row) => console.log('Delete', row)}
        onCreate={() => console.log('Create new bulk campaign')}
      />
    </div>
  )
}

