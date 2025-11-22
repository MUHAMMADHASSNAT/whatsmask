import { useState, useEffect } from 'react'
import DataTable from '../../components/DataTable'
import Modal from '../../components/Modal'
import { storage } from '../../utils/storage'
import { showToast } from '../../components/ToastContainer'

interface Page {
  id: number
  title: string
  slug: string
  status: string
  updated: string
  content?: string
}

export default function SetupPages() {
  const [pages, setPages] = useState<Page[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPage, setEditingPage] = useState<Page | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    status: 'Draft',
    content: ''
  })

  useEffect(() => {
    const saved = storage.get<Page[]>('setup-pages', [
      { id: 1, title: 'About Us', slug: 'about-us', status: 'Published', updated: '2024-11-15', content: 'About us content here...' },
      { id: 2, title: 'Privacy Policy', slug: 'privacy-policy', status: 'Published', updated: '2024-11-10', content: 'Privacy policy content...' },
      { id: 3, title: 'Terms of Service', slug: 'terms', status: 'Published', updated: '2024-11-05', content: 'Terms of service content...' },
      { id: 4, title: 'Contact', slug: 'contact', status: 'Draft', updated: '2024-11-20', content: 'Contact page content...' },
      { id: 5, title: 'Help Center', slug: 'help', status: 'Published', updated: '2024-11-12', content: 'Help center content...' }
    ])
    setPages(saved)
  }, [])

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }

  const handleCreate = () => {
    setEditingPage(null)
    setFormData({ title: '', slug: '', status: 'Draft', content: '' })
    setIsModalOpen(true)
  }

  const handleEdit = (page: Page) => {
    setEditingPage(page)
    setFormData({
      title: page.title,
      slug: page.slug,
      status: page.status,
      content: page.content || ''
    })
    setIsModalOpen(true)
  }

  const handleDelete = (page: Page) => {
    if (window.confirm(`Are you sure you want to delete ${page.title}?`)) {
      const updated = pages.filter((p) => p.id !== page.id)
      setPages(updated)
      storage.set('setup-pages', updated)
      showToast('Page deleted successfully', 'success')
    }
  }

  const handleSubmit = () => {
    if (!formData.title || !formData.slug) {
      showToast('Please fill in title and slug', 'error')
      return
    }

    if (editingPage) {
      const updated = pages.map((p) =>
        p.id === editingPage.id
          ? { ...p, ...formData, updated: new Date().toISOString().split('T')[0] }
          : p
      )
      setPages(updated)
      storage.set('setup-pages', updated)
      showToast('Page updated successfully', 'success')
    } else {
      const newPage: Page = {
        id: Date.now(),
        ...formData,
        updated: new Date().toISOString().split('T')[0]
      }
      const updated = [...pages, newPage]
      setPages(updated)
      storage.set('setup-pages', updated)
      showToast('Page created successfully', 'success')
    }
    setIsModalOpen(false)
  }

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
        data={pages}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        onBulkDelete={(selected) => {
          const ids = selected.map((s: any) => s.id)
          const updated = pages.filter((p) => !ids.includes(p.id))
          setPages(updated)
          storage.set('setup-pages', updated)
          showToast(`${selected.length} page(s) deleted successfully`, 'success')
        }}
        exportFilename="pages"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingPage ? 'Edit Page' : 'Create New Page'}
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  title: e.target.value,
                  slug: formData.slug || generateSlug(e.target.value)
                })
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug *
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: generateSlug(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <textarea
              rows={8}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            >
              <option>Draft</option>
              <option>Published</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-blue-600"
            >
              {editingPage ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

