import DataTable from '../../components/DataTable'

const mockPages = [
  { id: 1, title: 'About Us', slug: 'about-us', status: 'Published', updated: '2024-11-15' },
  { id: 2, title: 'Privacy Policy', slug: 'privacy-policy', status: 'Published', updated: '2024-11-10' },
  { id: 3, title: 'Terms of Service', slug: 'terms', status: 'Published', updated: '2024-11-05' },
  { id: 4, title: 'Contact', slug: 'contact', status: 'Draft', updated: '2024-11-20' },
  { id: 5, title: 'Help Center', slug: 'help', status: 'Published', updated: '2024-11-12' }
]

export default function SetupPages() {
  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'slug', label: 'Slug' },
    { key: 'status', label: 'Status' },
    { key: 'updated', label: 'Last Updated' }
  ]

  return (
    <div>
      <DataTable
        title="Pages"
        columns={columns}
        data={mockPages}
        onEdit={(row) => console.log('Edit', row)}
        onDelete={(row) => console.log('Delete', row)}
        onCreate={() => console.log('Create new page')}
      />
    </div>
  )
}

