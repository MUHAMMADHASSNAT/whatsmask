import DataTable from '../../components/DataTable'

const mockLanguages = [
  { id: 1, name: 'English', code: 'en', flag: '🇺🇸', status: 'Active', default: 'Yes' },
  { id: 2, name: 'Spanish', code: 'es', flag: '🇪🇸', status: 'Active', default: 'No' },
  { id: 3, name: 'French', code: 'fr', flag: '🇫🇷', status: 'Active', default: 'No' },
  { id: 4, name: 'German', code: 'de', flag: '🇩🇪', status: 'Active', default: 'No' },
  { id: 5, name: 'Arabic', code: 'ar', flag: '🇸🇦', status: 'Inactive', default: 'No' }
]

export default function SetupLanguages() {
  const columns = [
    { key: 'name', label: 'Language' },
    { key: 'code', label: 'Code' },
    { key: 'flag', label: 'Flag' },
    { key: 'status', label: 'Status' },
    { key: 'default', label: 'Default' }
  ]

  return (
    <div>
      <DataTable
        title="Languages"
        columns={columns}
        data={mockLanguages}
        onEdit={(row) => console.log('Edit', row)}
        onDelete={(row) => console.log('Delete', row)}
        onCreate={() => console.log('Create new language')}
      />
    </div>
  )
}

