import DataTable from '../../components/DataTable'

const mockTaxes = [
  { id: 1, name: 'VAT', rate: '20%', country: 'UK', status: 'Active' },
  { id: 2, name: 'Sales Tax', rate: '8%', country: 'US', status: 'Active' },
  { id: 3, name: 'GST', rate: '18%', country: 'India', status: 'Active' },
  { id: 4, name: 'VAT', rate: '19%', country: 'Germany', status: 'Active' },
  { id: 5, name: 'HST', rate: '13%', country: 'Canada', status: 'Inactive' }
]

export default function SetupTaxes() {
  const columns = [
    { key: 'name', label: 'Tax Name' },
    { key: 'rate', label: 'Rate' },
    { key: 'country', label: 'Country' },
    { key: 'status', label: 'Status' }
  ]

  return (
    <div>
      <DataTable
        title="Taxes"
        columns={columns}
        data={mockTaxes}
        onEdit={(row) => console.log('Edit', row)}
        onDelete={(row) => console.log('Delete', row)}
        onCreate={() => console.log('Create new tax')}
      />
    </div>
  )
}

