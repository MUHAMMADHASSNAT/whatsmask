import DataTable from '../components/DataTable'

const mockTemplateBots = [
  { id: 1, name: 'Welcome Template Bot', status: 'Active', templates: 5, usage: 450, created: '2024-11-15' },
  { id: 2, name: 'Order Template Bot', status: 'Active', templates: 3, usage: 320, created: '2024-11-16' },
  { id: 3, name: 'Support Template Bot', status: 'Inactive', templates: 4, usage: 200, created: '2024-11-10' }
]

export default function TemplateBot() {
  const columns = [
    { key: 'name', label: 'Bot Name' },
    { key: 'status', label: 'Status' },
    { key: 'templates', label: 'Templates' },
    { key: 'usage', label: 'Usage' },
    { key: 'created', label: 'Created' }
  ]

  return (
    <div>
      <DataTable
        title="Template Bots"
        columns={columns}
        data={mockTemplateBots}
        onEdit={(row) => console.log('Edit', row)}
        onDelete={(row) => console.log('Delete', row)}
        onCreate={() => console.log('Create new template bot')}
      />
    </div>
  )
}

