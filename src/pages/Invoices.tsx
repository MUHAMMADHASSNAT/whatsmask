import DataTable from '../components/DataTable'

const mockInvoices = [
  { id: 'INV-001', client: 'Acme Corp', amount: '$500', status: 'Paid', date: '2024-11-15', dueDate: '2024-11-15' },
  { id: 'INV-002', client: 'Tech Solutions', amount: '$300', status: 'Paid', date: '2024-11-20', dueDate: '2024-11-20' },
  { id: 'INV-003', client: 'Global Inc', amount: '$100', status: 'Pending', date: '2024-11-10', dueDate: '2024-12-10' },
  { id: 'INV-004', client: 'Digital Agency', amount: '$300', status: 'Paid', date: '2024-11-05', dueDate: '2024-11-05' },
  { id: 'INV-005', client: 'StartupXYZ', amount: '$100', status: 'Overdue', date: '2024-10-12', dueDate: '2024-11-12' }
]

export default function Invoices() {
  const columns = [
    { key: 'id', label: 'Invoice ID' },
    { key: 'client', label: 'Client' },
    { key: 'amount', label: 'Amount' },
    { key: 'status', label: 'Status' },
    { key: 'date', label: 'Date' },
    { key: 'dueDate', label: 'Due Date' }
  ]

  return (
    <div>
      <DataTable
        title="Invoices"
        columns={columns}
        data={mockInvoices}
        onEdit={(row) => console.log('Edit', row)}
        onDelete={(row) => console.log('Delete', row)}
        onCreate={() => console.log('Create new invoice')}
      />
    </div>
  )
}

