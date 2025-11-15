import DataTable from '../../components/DataTable'

const mockTemplates = [
  { id: 1, name: 'Welcome Email', subject: 'Welcome to our platform!', type: 'Transactional', status: 'Active' },
  { id: 2, name: 'Password Reset', subject: 'Reset your password', type: 'Transactional', status: 'Active' },
  { id: 3, name: 'Invoice', subject: 'Your invoice is ready', type: 'Transactional', status: 'Active' },
  { id: 4, name: 'Newsletter', subject: 'Monthly Newsletter', type: 'Marketing', status: 'Active' },
  { id: 5, name: 'Subscription Expired', subject: 'Your subscription has expired', type: 'Transactional', status: 'Draft' }
]

export default function SetupEmailTemplates() {
  const columns = [
    { key: 'name', label: 'Template Name' },
    { key: 'subject', label: 'Subject' },
    { key: 'type', label: 'Type' },
    { key: 'status', label: 'Status' }
  ]

  return (
    <div>
      <DataTable
        title="Email Templates"
        columns={columns}
        data={mockTemplates}
        onEdit={(row) => console.log('Edit', row)}
        onDelete={(row) => console.log('Delete', row)}
        onCreate={() => console.log('Create new template')}
      />
    </div>
  )
}

