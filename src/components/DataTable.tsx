import { Search, Filter, Plus, Edit, Trash2, ChevronLeft, ChevronRight, Download, Printer, CheckSquare, Square } from 'lucide-react'
import { useState } from 'react'
import { exportToCSV, exportToJSON } from '../utils/export'
import { showToast } from './ToastContainer'

interface Column {
  key: string
  label: string
}

interface DataTableProps {
  title: string
  columns: Column[]
  data: any[]
  onEdit?: (row: any) => void
  onDelete?: (row: any) => void
  onCreate?: () => void
  onBulkDelete?: (ids: any[]) => void
  searchPlaceholder?: string
  exportFilename?: string
}

export default function DataTable({
  title,
  columns,
  data,
  onEdit,
  onDelete,
  onCreate,
  onBulkDelete,
  searchPlaceholder = 'Search...',
  exportFilename
}: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set())
  const [showExportMenu, setShowExportMenu] = useState(false)
  const itemsPerPage = 10

  const filteredData = data.filter((row) =>
    Object.values(row).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  const handleSelectAll = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set())
    } else {
      setSelectedRows(new Set(paginatedData.map((_, idx) => startIndex + idx)))
    }
  }

  const handleSelectRow = (index: number) => {
    const newSelected = new Set(selectedRows)
    if (newSelected.has(index)) {
      newSelected.delete(index)
    } else {
      newSelected.add(index)
    }
    setSelectedRows(newSelected)
  }

  const handleBulkDelete = () => {
    if (selectedRows.size === 0) {
      showToast('Please select items to delete', 'warning')
      return
    }
    if (window.confirm(`Are you sure you want to delete ${selectedRows.size} item(s)?`)) {
      const selectedData = Array.from(selectedRows).map((idx) => filteredData[idx])
      if (onBulkDelete) {
        onBulkDelete(selectedData)
      }
      setSelectedRows(new Set())
      const count = selectedRows.size
      showToast(`${count} item(s) deleted successfully`, 'success')
    }
  }

  const handleExportCSV = () => {
    exportToCSV(filteredData, exportFilename || title.toLowerCase().replace(/\s+/g, '-'))
    showToast('Data exported to CSV successfully', 'success')
    setShowExportMenu(false)
  }

  const handleExportJSON = () => {
    exportToJSON(filteredData, exportFilename || title.toLowerCase().replace(/\s+/g, '-'))
    showToast('Data exported to JSON successfully', 'success')
    setShowExportMenu(false)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="bg-white rounded-xl shadow-soft p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            />
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Filter size={16} />
            <span>Filters</span>
          </button>
          {selectedRows.size > 0 && onBulkDelete && (
            <button
              onClick={handleBulkDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
            >
              <Trash2 size={16} />
              <span>Delete ({selectedRows.size})</span>
            </button>
          )}
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <Download size={16} />
              <span>Export</span>
            </button>
            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <button
                  onClick={handleExportCSV}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm"
                >
                  <Download size={16} />
                  Export as CSV
                </button>
                <button
                  onClick={handleExportJSON}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm"
                >
                  <Download size={16} />
                  Export as JSON
                </button>
                <button
                  onClick={handlePrint}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm"
                >
                  <Printer size={16} />
                  Print
                </button>
              </div>
            )}
          </div>
          {onCreate && (
            <button
              onClick={onCreate}
              className="px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
            >
              <Plus size={16} />
              <span>Create New</span>
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              {onBulkDelete && (
                <th className="w-12 py-3 px-4">
                  <button
                    onClick={handleSelectAll}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    {selectedRows.size === paginatedData.length ? (
                      <CheckSquare size={18} className="text-primary-blue" />
                    ) : (
                      <Square size={18} className="text-gray-400" />
                    )}
                  </button>
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="text-left py-3 px-4 text-sm font-semibold text-gray-700"
                >
                  {column.label}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (onEdit || onDelete ? 1 : 0) + (onBulkDelete ? 1 : 0)}
                  className="text-center py-8 text-gray-500"
                >
                  No data found
                </td>
              </tr>
            ) : (
              paginatedData.map((row, index) => {
                const rowIndex = startIndex + index
                const isSelected = selectedRows.has(rowIndex)
                return (
                  <tr
                    key={index}
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      isSelected ? 'bg-blue-50' : ''
                    }`}
                  >
                    {onBulkDelete && (
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleSelectRow(rowIndex)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          {isSelected ? (
                            <CheckSquare size={18} className="text-primary-blue" />
                          ) : (
                            <Square size={18} className="text-gray-400" />
                          )}
                        </button>
                      </td>
                    )}
                    {columns.map((column) => (
                      <td key={column.key} className="py-3 px-4 text-sm text-gray-700">
                        {row[column.key]}
                      </td>
                    ))}
                    {(onEdit || onDelete) && (
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                          {onEdit && (
                            <button
                              onClick={() => onEdit(row)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Edit size={16} />
                            </button>
                          )}
                          {onDelete && (
                            <button
                              onClick={() => onDelete(row)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of{' '}
            {filteredData.length} entries
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

