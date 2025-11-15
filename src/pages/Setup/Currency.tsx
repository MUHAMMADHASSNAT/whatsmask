import DataTable from '../../components/DataTable'

const mockCurrencies = [
  { id: 1, name: 'US Dollar', code: 'USD', symbol: '$', rate: 1.0, status: 'Active', default: 'Yes' },
  { id: 2, name: 'Euro', code: 'EUR', symbol: '€', rate: 0.92, status: 'Active', default: 'No' },
  { id: 3, name: 'British Pound', code: 'GBP', symbol: '£', rate: 0.79, status: 'Active', default: 'No' },
  { id: 4, name: 'Japanese Yen', code: 'JPY', symbol: '¥', rate: 149.5, status: 'Active', default: 'No' },
  { id: 5, name: 'Canadian Dollar', code: 'CAD', symbol: 'C$', rate: 1.36, status: 'Inactive', default: 'No' }
]

export default function SetupCurrency() {
  const columns = [
    { key: 'name', label: 'Currency' },
    { key: 'code', label: 'Code' },
    { key: 'symbol', label: 'Symbol' },
    { key: 'rate', label: 'Exchange Rate' },
    { key: 'status', label: 'Status' },
    { key: 'default', label: 'Default' }
  ]

  return (
    <div>
      <DataTable
        title="Currency"
        columns={columns}
        data={mockCurrencies}
        onEdit={(row) => console.log('Edit', row)}
        onDelete={(row) => console.log('Delete', row)}
        onCreate={() => console.log('Create new currency')}
      />
    </div>
  )
}

