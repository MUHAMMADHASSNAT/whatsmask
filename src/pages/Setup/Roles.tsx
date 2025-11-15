import DataTable from '../../components/DataTable'

const mockRoles = [
  { id: 1, name: 'Super Admin', permissions: 'All', users: 2, status: 'Active' },
  { id: 2, name: 'Admin', permissions: 'Most', users: 5, status: 'Active' },
  { id: 3, name: 'Manager', permissions: 'Limited', users: 10, status: 'Active' },
  { id: 4, name: 'User', permissions: 'Basic', users: 50, status: 'Active' },
  { id: 5, name: 'Guest', permissions: 'View Only', users: 3, status: 'Inactive' }
]

export default function SetupRoles() {
  const columns = [
    { key: 'name', label: 'Role Name' },
    { key: 'permissions', label: 'Permissions' },
    { key: 'users', label: 'Users' },
    { key: 'status', label: 'Status' }
  ]

  return (
    <div>
      <DataTable
        title="Roles"
        columns={columns}
        data={mockRoles}
        onEdit={(row) => console.log('Edit', row)}
        onDelete={(row) => console.log('Delete', row)}
        onCreate={() => console.log('Create new role')}
      />
    </div>
  )
}

