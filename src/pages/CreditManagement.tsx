import DataTable from '../components/DataTable'

const mockCredits = [
  { id: 1, client: 'Acme Corp', balance: '$1,500', used: '$500', available: '$1,000', lastUpdated: '2024-11-15' },
  { id: 2, client: 'Tech Solutions', balance: '$800', used: '$300', available: '$500', lastUpdated: '2024-11-20' },
  { id: 3, client: 'Global Inc', balance: '$200', used: '$100', available: '$100', lastUpdated: '2024-11-10' },
  { id: 4, client: 'Digital Agency', balance: '$1,200', used: '$300', available: '$900', lastUpdated: '2024-11-05' },
  { id: 5, client: 'StartupXYZ', balance: '$500', used: '$100', available: '$400', lastUpdated: '2024-10-12' }
]

export default function CreditManagement() {
  const columns = [
    { key: 'client', label: 'Client' },
    { key: 'balance', label: 'Total Balance' },
    { key: 'used', label: 'Used' },
    { key: 'available', label: 'Available' },
    { key: 'lastUpdated', label: 'Last Updated' }
  ]

  return (
    <div>
      <DataTable
        title="Credit Management"
        columns={columns}
        data={mockCredits}
        onEdit={(row) => console.log('Edit', row)}
        onDelete={(row) => console.log('Delete', row)}
        onCreate={() => console.log('Add credit')}
      />
    </div>
  )
}

