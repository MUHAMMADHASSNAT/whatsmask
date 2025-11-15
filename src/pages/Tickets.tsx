import DataTable from '../components/DataTable'

const mockTickets = [
  { id: 'TKT-001', subject: 'Login Issue', client: 'Acme Corp', status: 'Open', priority: 'High', created: '2024-11-15' },
  { id: 'TKT-002', subject: 'Feature Request', client: 'Tech Solutions', status: 'In Progress', priority: 'Medium', created: '2024-11-20' },
  { id: 'TKT-003', subject: 'Billing Question', client: 'Global Inc', status: 'Resolved', priority: 'Low', created: '2024-11-10' },
  { id: 'TKT-004', subject: 'API Error', client: 'Digital Agency', status: 'Open', priority: 'High', created: '2024-11-05' },
  { id: 'TKT-005', subject: 'Account Setup', client: 'StartupXYZ', status: 'Resolved', priority: 'Low', created: '2024-10-12' }
]

export default function Tickets() {
  const columns = [
    { key: 'id', label: 'Ticket ID' },
    { key: 'subject', label: 'Subject' },
    { key: 'client', label: 'Client' },
    { key: 'status', label: 'Status' },
    { key: 'priority', label: 'Priority' },
    { key: 'created', label: 'Created' }
  ]

  return (
    <div>
      <DataTable
        title="Support Tickets"
        columns={columns}
        data={mockTickets}
        onEdit={(row) => console.log('Edit', row)}
        onDelete={(row) => console.log('Delete', row)}
        onCreate={() => console.log('Create new ticket')}
      />
    </div>
  )
}

