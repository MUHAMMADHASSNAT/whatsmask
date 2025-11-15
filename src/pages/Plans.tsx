import DataTable from '../components/DataTable'

const mockPlans = [
  { id: 1, name: 'Starter', price: '$100', duration: 'Monthly', features: 'Basic Features', status: 'Active' },
  { id: 2, name: 'Professional', price: '$300', duration: 'Monthly', features: 'Advanced Features', status: 'Active' },
  { id: 3, name: 'Enterprise', price: '$500', duration: 'Monthly', features: 'All Features', status: 'Active' },
  { id: 4, name: 'Starter Annual', price: '$1,000', duration: 'Yearly', features: 'Basic Features', status: 'Active' },
  { id: 5, name: 'Professional Annual', price: '$3,000', duration: 'Yearly', features: 'Advanced Features', status: 'Active' }
]

export default function Plans() {
  const columns = [
    { key: 'name', label: 'Plan Name' },
    { key: 'price', label: 'Price' },
    { key: 'duration', label: 'Duration' },
    { key: 'features', label: 'Features' },
    { key: 'status', label: 'Status' }
  ]

  return (
    <div>
      <DataTable
        title="Plans"
        columns={columns}
        data={mockPlans}
        onEdit={(row) => console.log('Edit', row)}
        onDelete={(row) => console.log('Delete', row)}
        onCreate={() => console.log('Create new plan')}
      />
    </div>
  )
}

