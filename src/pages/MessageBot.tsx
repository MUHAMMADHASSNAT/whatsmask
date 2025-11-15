import DataTable from '../components/DataTable'

const mockBots = [
  { id: 1, name: 'Customer Support Bot', status: 'Active', messages: 1250, responses: 1200, created: '2024-11-15' },
  { id: 2, name: 'FAQ Bot', status: 'Active', messages: 800, responses: 780, created: '2024-11-16' },
  { id: 3, name: 'Order Bot', status: 'Inactive', messages: 500, responses: 480, created: '2024-11-10' }
]

export default function MessageBot() {
  const columns = [
    { key: 'name', label: 'Bot Name' },
    { key: 'status', label: 'Status' },
    { key: 'messages', label: 'Messages' },
    { key: 'responses', label: 'Responses' },
    { key: 'created', label: 'Created' }
  ]

  return (
    <div>
      <DataTable
        title="Message Bots"
        columns={columns}
        data={mockBots}
        onEdit={(row) => console.log('Edit', row)}
        onDelete={(row) => console.log('Delete', row)}
        onCreate={() => console.log('Create new message bot')}
      />
    </div>
  )
}

