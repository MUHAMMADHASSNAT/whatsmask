import DataTable from '../../components/DataTable'

const mockModules = [
  { id: 1, name: 'Email Marketing', version: '1.2.0', status: 'Enabled', description: 'Send marketing emails' },
  { id: 2, name: 'Analytics', version: '2.1.0', status: 'Enabled', description: 'Track user analytics' },
  { id: 3, name: 'SMS Gateway', version: '1.0.5', status: 'Enabled', description: 'Send SMS notifications' },
  { id: 4, name: 'Backup System', version: '3.0.0', status: 'Disabled', description: 'Automated backups' },
  { id: 5, name: 'API Gateway', version: '1.5.2', status: 'Enabled', description: 'Manage API access' }
]

export default function SetupModules() {
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
        data={mockModules}
        onEdit={(row) => console.log('Edit', row)}
        onDelete={(row) => console.log('Delete', row)}
        onCreate={() => console.log('Create new module')}
      />
    </div>
  )
}

