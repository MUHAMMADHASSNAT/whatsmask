import DataTable from '../components/DataTable'

const mockSubscriptions = [
  { id: 1, client: 'Acme Corp', plan: 'Enterprise', amount: '$500', status: 'Active', nextBilling: '2024-12-15' },
  { id: 2, client: 'Tech Solutions', plan: 'Professional', amount: '$300', status: 'Active', nextBilling: '2024-12-20' },
  { id: 3, client: 'Global Inc', plan: 'Starter', amount: '$100', status: 'Cancelled', nextBilling: '-' },
  { id: 4, client: 'Digital Agency', plan: 'Professional', amount: '$300', status: 'Active', nextBilling: '2024-12-05' },
  { id: 5, client: 'StartupXYZ', plan: 'Starter', amount: '$100', status: 'Active', nextBilling: '2024-12-12' }
]

export default function Subscriptions() {
  const columns = [
    { key: 'client', label: 'Client' },
    { key: 'plan', label: 'Plan' },
    { key: 'amount', label: 'Amount' },
    { key: 'status', label: 'Status' },
    { key: 'nextBilling', label: 'Next Billing' }
  ]

  return (
    <div>
      <DataTable
        title="Subscriptions"
        columns={columns}
        data={mockSubscriptions}
        onEdit={(row) => console.log('Edit', row)}
        onDelete={(row) => console.log('Delete', row)}
        onCreate={() => console.log('Create new subscription')}
      />
    </div>
  )
}

