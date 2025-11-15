import DataTable from '../components/DataTable'

const mockCampaigns = [
  { id: 1, name: 'Summer Sale 2024', status: 'Active', recipients: 1500, sent: 1450, opened: 1200, created: '2024-11-15' },
  { id: 2, name: 'Product Launch', status: 'Scheduled', recipients: 2000, sent: 0, opened: 0, created: '2024-11-16' },
  { id: 3, name: 'Holiday Promotion', status: 'Completed', recipients: 3000, sent: 3000, opened: 2500, created: '2024-11-10' },
  { id: 4, name: 'Newsletter', status: 'Active', recipients: 5000, sent: 4800, opened: 4000, created: '2024-11-18' },
  { id: 5, name: 'Reminder Campaign', status: 'Draft', recipients: 0, sent: 0, opened: 0, created: '2024-11-19' }
]

export default function Campaign() {
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
        data={mockCampaigns}
        onEdit={(row) => console.log('Edit', row)}
        onDelete={(row) => console.log('Delete', row)}
        onCreate={() => console.log('Create new campaign')}
      />
    </div>
  )
}

