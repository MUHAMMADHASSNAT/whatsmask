import DataTable from '../../components/DataTable'

const mockLogs = [
  { id: 1, level: 'Info', message: 'User logged in successfully', user: 'john@example.com', timestamp: '2024-11-20 10:30:15' },
  { id: 2, level: 'Warning', message: 'Failed login attempt', user: 'unknown', timestamp: '2024-11-20 10:25:42' },
  { id: 3, level: 'Error', message: 'Database connection timeout', user: 'system', timestamp: '2024-11-20 09:15:30' },
  { id: 4, level: 'Info', message: 'Payment processed successfully', user: 'jane@example.com', timestamp: '2024-11-20 08:45:12' },
  { id: 5, level: 'Info', message: 'Email sent successfully', user: 'system', timestamp: '2024-11-20 08:30:05' }
]

export default function SetupSystemLogs() {
  const columns = [
    { key: 'level', label: 'Level' },
    { key: 'message', label: 'Message' },
    { key: 'user', label: 'User' },
    { key: 'timestamp', label: 'Timestamp' }
  ]

  return (
    <div>
      <DataTable
        title="System Logs"
        columns={columns}
        data={mockLogs}
        onEdit={(row) => console.log('Edit', row)}
        onDelete={(row) => console.log('Delete', row)}
        onCreate={() => console.log('Create new log')}
      />
    </div>
  )
}

