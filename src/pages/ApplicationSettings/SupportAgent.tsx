import { Save, Plus, Trash2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { storage } from '../../utils/storage'
import { showToast } from '../../components/ToastContainer'

interface Agent {
  id: number
  name: string
  email: string
  phone: string
  status: 'active' | 'inactive'
}

export default function SupportAgent() {
  const [enabled, setEnabled] = useState(false)
  const [agents, setAgents] = useState<Agent[]>([])
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })
  const [editingId, setEditingId] = useState<number | null>(null)

  useEffect(() => {
    const saved = storage.get('support-agent', {
      enabled: false,
      agents: []
    })
    setEnabled(saved.enabled)
    setAgents(saved.agents)
  }, [])

  const handleAdd = () => {
    setFormData({ name: '', email: '', phone: '' })
    setEditingId(null)
    setShowModal(true)
  }

  const handleEdit = (agent: Agent) => {
    setFormData({ name: agent.name, email: agent.email, phone: agent.phone })
    setEditingId(agent.id)
    setShowModal(true)
  }

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this agent?')) {
      setAgents(agents.filter(a => a.id !== id))
      showToast('Agent deleted successfully', 'success')
    }
  }

  const handleSaveAgent = () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      showToast('Please fill in all fields', 'error')
      return
    }
    if (editingId) {
      setAgents(agents.map(a => a.id === editingId ? { ...a, ...formData } : a))
      showToast('Agent updated successfully', 'success')
    } else {
      const newAgent: Agent = {
        id: Date.now(),
        ...formData,
        status: 'active'
      }
      setAgents([...agents, newAgent])
      showToast('Agent added successfully', 'success')
    }
    setShowModal(false)
  }

  const handleSave = () => {
    if (enabled && agents.length === 0) {
      showToast('Please add at least one support agent', 'error')
      return
    }
    storage.set('support-agent', {
      enabled,
      agents
    })
    showToast('Support Agent settings saved successfully', 'success')
  }

  return (
    <div className="bg-white rounded-xl shadow-soft p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Support Agent</h2>
          <p className="text-sm text-gray-600 mt-1">
            Manage support agents who will handle customer inquiries.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
            disabled={!enabled}
          >
            <Plus size={16} />
            <span>Add Agent</span>
          </button>
          <button 
            onClick={handleSave}
            className="px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
          >
            <Save size={16} />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Enable Support Agent
              </label>
              <p className="text-xs text-gray-500 mt-1">
                Allow support agents to handle customer inquiries
              </p>
            </div>
            <button
              onClick={() => setEnabled(!enabled)}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                enabled ? 'bg-primary-blue' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  enabled ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Agents List</h3>
          {agents.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No agents added yet. Click "Add Agent" to get started.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Phone</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {agents.map((agent) => (
                    <tr key={agent.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-700">{agent.name}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{agent.email}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{agent.phone}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          agent.status === 'active' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {agent.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(agent)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(agent.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {editingId ? 'Edit Agent' : 'Add Agent'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAgent}
                className="flex-1 px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-blue-600"
              >
                {editingId ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

