import DataTable from '../components/DataTable'

const mockTemplates = [
  { id: 1, name: 'Welcome Message', category: 'Greeting', status: 'Approved', language: 'English', created: '2024-11-15' },
  { id: 2, name: 'Order Confirmation', category: 'Transaction', status: 'Pending', language: 'English', created: '2024-11-16' },
  { id: 3, name: 'Support Response', category: 'Support', status: 'Approved', language: 'English', created: '2024-11-17' },
  { id: 4, name: 'Payment Reminder', category: 'Transaction', status: 'Approved', language: 'English', created: '2024-11-18' },
  { id: 5, name: 'Thank You Message', category: 'Greeting', status: 'Approved', language: 'English', created: '2024-11-19' }
]

export default function Templates() {
  const columns = [
    { key: 'name', label: 'Template Name' },
    { key: 'category', label: 'Category' },
    { key: 'status', label: 'Status' },
    { key: 'language', label: 'Language' },
    { key: 'created', label: 'Created' }
  ]

  return (
    <div>
      <DataTable
        title="Templates"
        columns={columns}
        data={mockTemplates}
        onEdit={(row) => console.log('Edit', row)}
        onDelete={(row) => console.log('Delete', row)}
        onCreate={() => console.log('Create new template')}
      />
    </div>
  )
}

