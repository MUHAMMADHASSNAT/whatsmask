import DataTable from '../../components/DataTable'

const mockFAQs = [
  { id: 1, question: 'How do I reset my password?', category: 'Account', status: 'Published', views: 1250 },
  { id: 2, question: 'What payment methods do you accept?', category: 'Billing', status: 'Published', views: 890 },
  { id: 3, question: 'How to cancel my subscription?', category: 'Billing', status: 'Draft', views: 0 },
  { id: 4, question: 'How to upgrade my plan?', category: 'Plans', status: 'Published', views: 650 },
  { id: 5, question: 'What is your refund policy?', category: 'Billing', status: 'Published', views: 420 }
]

export default function SetupFAQ() {
  const columns = [
    { key: 'question', label: 'Question' },
    { key: 'category', label: 'Category' },
    { key: 'status', label: 'Status' },
    { key: 'views', label: 'Views' }
  ]

  return (
    <div>
      <DataTable
        title="FAQ"
        columns={columns}
        data={mockFAQs}
        onEdit={(row) => console.log('Edit', row)}
        onDelete={(row) => console.log('Delete', row)}
        onCreate={() => console.log('Create new FAQ')}
      />
    </div>
  )
}

