import DataTable from '../../components/DataTable'

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', department: 'IT', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Manager', department: 'Sales', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', department: 'Support', status: 'Inactive' },
  { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'Admin', department: 'IT', status: 'Active' },
  { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', department: 'Marketing', status: 'Active' }
]

export default function SetupUsers() {
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'department', label: 'Department' },
    { key: 'status', label: 'Status' }
  ]

  return (
    <div>
      <DataTable
        title="Users"
        columns={columns}
        data={mockUsers}
        onEdit={(row) => console.log('Edit', row)}
        onDelete={(row) => console.log('Delete', row)}
        onCreate={() => console.log('Create new user')}
      />
    </div>
  )
}

