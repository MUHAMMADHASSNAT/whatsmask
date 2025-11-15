import DataTable from '../components/DataTable'

const mockTransactions = [
  { id: 'TXN-001', client: 'Acme Corp', amount: '$500', type: 'Payment', status: 'Completed', date: '2024-11-15' },
  { id: 'TXN-002', client: 'Tech Solutions', amount: '$300', type: 'Payment', status: 'Completed', date: '2024-11-20' },
  { id: 'TXN-003', client: 'Global Inc', amount: '$100', type: 'Refund', status: 'Pending', date: '2024-11-10' },
  { id: 'TXN-004', client: 'Digital Agency', amount: '$300', type: 'Payment', status: 'Completed', date: '2024-11-05' },
  { id: 'TXN-005', client: 'StartupXYZ', amount: '$100', type: 'Payment', status: 'Failed', date: '2024-10-12' }
]

export default function Transactions() {
  const columns = [
    { key: 'id', label: 'Transaction ID' },
    { key: 'client', label: 'Client' },
    { key: 'amount', label: 'Amount' },
    { key: 'type', label: 'Type' },
    { key: 'status', label: 'Status' },
    { key: 'date', label: 'Date' }
  ]

  return (
    <div>
      <DataTable
        title="Transactions"
        columns={columns}
        data={mockTransactions}
        onEdit={(row) => console.log('Edit', row)}
        onDelete={(row) => console.log('Delete', row)}
        onCreate={() => console.log('Create new transaction')}
      />
    </div>
  )
}

