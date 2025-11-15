import DataTable from '../components/DataTable'

const mockContacts = [
  { id: 1, name: 'John Doe', phone: '+1234567890', email: 'john@example.com', status: 'Active', lastContact: '2024-11-20' },
  { id: 2, name: 'Jane Smith', phone: '+1234567891', email: 'jane@example.com', status: 'Active', lastContact: '2024-11-19' },
  { id: 3, name: 'Bob Johnson', phone: '+1234567892', email: 'bob@example.com', status: 'Inactive', lastContact: '2024-11-15' },
  { id: 4, name: 'Alice Williams', phone: '+1234567893', email: 'alice@example.com', status: 'Active', lastContact: '2024-11-18' },
  { id: 5, name: 'Charlie Brown', phone: '+1234567894', email: 'charlie@example.com', status: 'Active', lastContact: '2024-11-20' }
]

export default function Contact() {
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'phone', label: 'Phone' },
    { key: 'email', label: 'Email' },
    { key: 'status', label: 'Status' },
    { key: 'lastContact', label: 'Last Contact' }
  ]

  return (
    <div>
      <DataTable
        title="Contacts"
        columns={columns}
        data={mockContacts}
        onEdit={(row) => console.log('Edit', row)}
        onDelete={(row) => console.log('Delete', row)}
        onCreate={() => console.log('Create new contact')}
      />
    </div>
  )
}

