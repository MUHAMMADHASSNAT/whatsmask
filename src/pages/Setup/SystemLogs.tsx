import { useState, useEffect } from 'react'
import DataTable from '../../components/DataTable'
import { Trash2, Download } from 'lucide-react'
import { storage } from '../../utils/storage'
import { showToast } from '../../components/ToastContainer'
import { exportToCSV } from '../../utils/export'

interface SystemLog {
  id: number
  level: string
  message: string
  user: string
  timestamp: string
}

export default function SetupSystemLogs() {
  const [logs, setLogs] = useState<SystemLog[]>([])
  const [filterLevel, setFilterLevel] = useState<string>('All')

  useEffect(() => {
    const saved = storage.get<SystemLog[]>('setup-system-logs', [
      { id: 1, level: 'Info', message: 'User logged in successfully', user: 'john@example.com', timestamp: '2024-11-20 10:30:15' },
      { id: 2, level: 'Warning', message: 'Failed login attempt', user: 'unknown', timestamp: '2024-11-20 10:25:42' },
      { id: 3, level: 'Error', message: 'Database connection timeout', user: 'system', timestamp: '2024-11-20 09:15:30' },
      { id: 4, level: 'Info', message: 'Payment processed successfully', user: 'jane@example.com', timestamp: '2024-11-20 08:45:12' },
      { id: 5, level: 'Info', message: 'Email sent successfully', user: 'system', timestamp: '2024-11-20 08:30:05' }
    ])
    setLogs(saved)
  }, [])

  const handleClearLogs = () => {
    if (window.confirm('Are you sure you want to clear all logs? This action cannot be undone.')) {
      setLogs([])
      storage.set('setup-system-logs', [])
      showToast('All logs cleared successfully', 'success')
    }
  }

  const handleDelete = (log: SystemLog) => {
    const updated = logs.filter((l) => l.id !== log.id)
    setLogs(updated)
    storage.set('setup-system-logs', updated)
    showToast('Log deleted successfully', 'success')
  }

  const filteredLogs = filterLevel === 'All' 
    ? logs 
    : logs.filter(log => log.level === filterLevel)

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Error':
        return 'text-red-600 bg-red-50'
      case 'Warning':
        return 'text-yellow-600 bg-yellow-50'
      case 'Info':
        return 'text-blue-600 bg-blue-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const columns = [
    { key: 'level', label: 'Level' },
    { key: 'message', label: 'Message' },
    { key: 'user', label: 'User' },
    { key: 'timestamp', label: 'Timestamp' }
  ]

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">System Logs</h1>
        <div className="flex gap-2">
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
          >
            <option>All</option>
            <option>Info</option>
            <option>Warning</option>
            <option>Error</option>
          </select>
          <button
            onClick={() => exportToCSV(filteredLogs, 'system-logs')}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
          >
            <Download size={16} />
            Export
          </button>
          <button
            onClick={handleClearLogs}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
          >
            <Trash2 size={16} />
            Clear All
          </button>
        </div>
      </div>
      <DataTable
        title=""
        columns={columns}
        data={filteredLogs}
        onEdit={() => showToast('Logs are read-only', 'info')}
        onDelete={handleDelete}
        onCreate={() => showToast('Logs are automatically generated', 'info')}
        onBulkDelete={(selected) => {
          const ids = selected.map((s: any) => s.id)
          const updated = logs.filter((l) => !ids.includes(l.id))
          setLogs(updated)
          storage.set('setup-system-logs', updated)
          showToast(`${selected.length} log(s) deleted successfully`, 'success')
        }}
        exportFilename="system-logs"
      />
    </div>
  )
}

