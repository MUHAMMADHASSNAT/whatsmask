import DataTable from '../../components/DataTable'

const mockDepartments = [
  { id: 1, name: 'IT', manager: 'John Doe', employees: 15, status: 'Active' },
  { id: 2, name: 'Sales', manager: 'Jane Smith', employees: 20, status: 'Active' },
  { id: 3, name: 'Support', manager: 'Bob Johnson', employees: 12, status: 'Active' },
  { id: 4, name: 'Marketing', manager: 'Alice Williams', employees: 8, status: 'Active' },
  { id: 5, name: 'Finance', manager: 'Charlie Brown', employees: 5, status: 'Active' }
]

export default function SetupDepartments() {
  const columns = [
    { key: 'name', label: 'Department' },
    { key: 'manager', label: 'Manager' },
    { key: 'employees', label: 'Employees' },
    { key: 'status', label: 'Status' }
  ]

  return (
    <div>
      <DataTable
        title="Departments"
        columns={columns}
        data={mockDepartments}
        onEdit={(row) => console.log('Edit', row)}
        onDelete={(row) => console.log('Delete', row)}
        onCreate={() => console.log('Create new department')}
      />
    </div>
  )
}

