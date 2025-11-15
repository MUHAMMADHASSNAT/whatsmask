import DataTable from '../components/DataTable'

const mockTenants = [
  { id: 1, name: 'Acme Corp', email: 'contact@acme.com', plan: 'Enterprise', status: 'Active', created: '2024-01-15' },
  { id: 2, name: 'Tech Solutions', email: 'info@techsol.com', plan: 'Professional', status: 'Active', created: '2024-02-20' },
  { id: 3, name: 'Global Inc', email: 'hello@global.com', plan: 'Starter', status: 'Suspended', created: '2024-03-10' },
  { id: 4, name: 'Digital Agency', email: 'team@digital.com', plan: 'Professional', status: 'Active', created: '2024-01-05' },
  { id: 5, name: 'StartupXYZ', email: 'contact@startup.com', plan: 'Starter', status: 'Active', created: '2024-04-12' }
]

export default function Tenants() {
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'plan', label: 'Plan' },
    { key: 'status', label: 'Status' },
    { key: 'created', label: 'Created' }
  ]

  return (
    <div>
      <DataTable
        title="Tenants"
        columns={columns}
        data={mockTenants}
        onEdit={(row) => console.log('Edit', row)}
        onDelete={(row) => console.log('Delete', row)}
        onCreate={() => console.log('Create new tenant')}
      />
    </div>
  )
}

