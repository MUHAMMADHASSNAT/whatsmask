import { useState, useEffect } from 'react'
import DataTable from '../../components/DataTable'
import Modal from '../../components/Modal'
import { storage } from '../../utils/storage'
import { showToast } from '../../components/ToastContainer'

interface FAQ {
  id: number
  question: string
  category: string
  status: string
  views: number
  answer?: string
}

export default function SetupFAQ() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null)
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'Account',
    status: 'Draft',
    views: 0
  })

  useEffect(() => {
    const saved = storage.get<FAQ[]>('setup-faqs', [
      { id: 1, question: 'How do I reset my password?', category: 'Account', status: 'Published', views: 1250, answer: 'Click on forgot password link on login page.' },
      { id: 2, question: 'What payment methods do you accept?', category: 'Billing', status: 'Published', views: 890, answer: 'We accept credit cards, PayPal, and bank transfers.' },
      { id: 3, question: 'How to cancel my subscription?', category: 'Billing', status: 'Draft', views: 0, answer: 'Go to subscription settings and click cancel.' },
      { id: 4, question: 'How to upgrade my plan?', category: 'Plans', status: 'Published', views: 650, answer: 'Navigate to Plans page and select upgrade option.' },
      { id: 5, question: 'What is your refund policy?', category: 'Billing', status: 'Published', views: 420, answer: '30-day money back guarantee.' }
    ])
    setFaqs(saved)
  }, [])

  const handleCreate = () => {
    setEditingFAQ(null)
    setFormData({ question: '', answer: '', category: 'Account', status: 'Draft', views: 0 })
    setIsModalOpen(true)
  }

  const handleEdit = (faq: FAQ) => {
    setEditingFAQ(faq)
    setFormData({
      question: faq.question,
      answer: faq.answer || '',
      category: faq.category,
      status: faq.status,
      views: faq.views
    })
    setIsModalOpen(true)
  }

  const handleDelete = (faq: FAQ) => {
    if (window.confirm(`Are you sure you want to delete this FAQ?`)) {
      const updated = faqs.filter((f) => f.id !== faq.id)
      setFaqs(updated)
      storage.set('setup-faqs', updated)
      showToast('FAQ deleted successfully', 'success')
    }
  }

  const handleSubmit = () => {
    if (!formData.question || !formData.answer) {
      showToast('Please fill in question and answer', 'error')
      return
    }

    if (editingFAQ) {
      const updated = faqs.map((f) =>
        f.id === editingFAQ.id ? { ...f, ...formData } : f
      )
      setFaqs(updated)
      storage.set('setup-faqs', updated)
      showToast('FAQ updated successfully', 'success')
    } else {
      const newFAQ: FAQ = {
        id: Date.now(),
        ...formData
      }
      const updated = [...faqs, newFAQ]
      setFaqs(updated)
      storage.set('setup-faqs', updated)
      showToast('FAQ created successfully', 'success')
    }
    setIsModalOpen(false)
  }

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
        data={faqs}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        onBulkDelete={(selected) => {
          const ids = selected.map((s: any) => s.id)
          const updated = faqs.filter((f) => !ids.includes(f.id))
          setFaqs(updated)
          storage.set('setup-faqs', updated)
          showToast(`${selected.length} FAQ(s) deleted successfully`, 'success')
        }}
        exportFilename="faqs"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingFAQ ? 'Edit FAQ' : 'Create New FAQ'}
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question *
            </label>
            <input
              type="text"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Answer *
            </label>
            <textarea
              rows={4}
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            >
              <option>Account</option>
              <option>Billing</option>
              <option>Plans</option>
              <option>Technical</option>
              <option>General</option>
            </select>
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
              {editingFAQ ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

