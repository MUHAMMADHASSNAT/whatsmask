import { useState } from 'react'
import { Save, ArrowLeft, X, Zap, FileText, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { showToast } from '../components/ToastContainer'

interface NodeData {
  contactType?: string
  triggerType?: string
  keywords?: string[]
  assistant?: string
  message?: string
}

interface Node {
  id: number
  type: string
  title: string
  position: { x: number; y: number }
  data: NodeData
}

export default function BotFlow() {
  const navigate = useNavigate()
  const [nodes, setNodes] = useState<Node[]>([
    {
      id: 1,
      type: 'trigger',
      title: 'Start Trigger • Entry Point',
      position: { x: 100, y: 100 },
      data: {
        contactType: 'Lead',
        triggerType: 'on exact match',
        keywords: ['hello']
      }
    },
    {
      id: 2,
      type: 'ai-assistant',
      title: 'AI Assistant',
      position: { x: 400, y: 100 },
      data: {
        assistant: 'FAQ Genius'
      }
    }
  ])
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [newKeyword, setNewKeyword] = useState('')

  const handleBack = () => {
    navigate(-1)
  }

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
    if (!isFullscreen) {
      document.documentElement.requestFullscreen?.()
    } else {
      document.exitFullscreen?.()
    }
  }

  const handleSaveFlow = () => {
    showToast('Flow saved successfully', 'success')
  }

  const handleAddNode = (type: 'message' | 'ai-assistant') => {
    const newNode: Node = {
      id: nodes.length + 1,
      type: type === 'message' ? 'message' : 'ai-assistant',
      title: type === 'message' ? 'Message' : 'AI Assistant',
      position: { x: 100 + (nodes.length * 300), y: 100 },
      data: type === 'message' ? { message: '' } : { assistant: 'FAQ Genius' }
    }
    setNodes([...nodes, newNode])
    showToast(`${type === 'message' ? 'Message' : 'AI Assistant'} node added`, 'success')
  }

  const handleRemoveKeyword = (nodeId: number, keywordIndex: number) => {
    const updated = nodes.map(node => {
      if (node.id === nodeId && node.data.keywords) {
        return {
          ...node,
          data: {
            ...node.data,
            keywords: node.data.keywords.filter((_: string, idx: number) => idx !== keywordIndex)
          } as NodeData
        }
      }
      return node
    })
    setNodes(updated)
  }

  const handleAddKeyword = (nodeId: number) => {
    if (!newKeyword.trim()) {
      showToast('Please enter a keyword', 'error')
      return
    }
    const updated = nodes.map(node => {
      if (node.id === nodeId) {
        return {
          ...node,
          data: {
            ...node.data,
            keywords: [...(node.data.keywords || []), newKeyword.trim()]
          } as NodeData
        }
      }
      return node
    })
    setNodes(updated)
    setNewKeyword('')
    showToast('Keyword added', 'success')
  }

  const handleRemoveConnection = () => {
    if (nodes.length > 1) {
      setNodes(nodes.slice(0, -1))
      showToast('Connection removed', 'success')
    }
  }

  return (
    <div className="h-[calc(100vh-8rem)] bg-background-grey rounded-xl overflow-hidden relative">
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <button 
          onClick={handleBack}
          className="p-2 bg-white rounded-lg shadow-soft hover:bg-gray-50"
        >
          <ArrowLeft size={20} />
        </button>
        <button 
          onClick={handleFullscreen}
          className="px-4 py-2 bg-white rounded-lg shadow-soft hover:bg-gray-50 text-sm"
        >
          {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </button>
      </div>

      <div className="absolute top-4 right-4 z-10">
        <button 
          onClick={handleSaveFlow}
          className="px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          <Save size={16} />
          <span>Save Flow</span>
        </button>
      </div>

      <div className="absolute left-4 top-20 bottom-4 w-12 bg-white rounded-lg shadow-soft p-2 flex flex-col gap-2 z-10">
        <button 
          onClick={() => handleAddNode('message')}
          className="p-2 hover:bg-gray-100 rounded-lg" 
          title="Message"
        >
          <FileText size={20} className="text-gray-600" />
        </button>
        <button 
          onClick={() => handleAddNode('ai-assistant')}
          className="p-2 hover:bg-gray-100 rounded-lg" 
          title="AI Assistant"
        >
          <Zap size={20} className="text-gray-600" />
        </button>
      </div>

      <div className="h-full p-8" style={{ backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        <div className="relative h-full">
          {nodes.map((node) => (
            <div
              key={node.id}
              className="absolute bg-white rounded-lg shadow-lg border-2 border-gray-200"
              style={{
                left: node.position.x,
                top: node.position.y,
                width: '300px'
              }}
            >
              <div className={`p-3 rounded-t-lg ${
                node.type === 'trigger' ? 'bg-primary-purple' : 'bg-blue-100'
              }`}>
                <div className="flex items-center gap-2 text-white">
                  {node.type === 'trigger' ? <Zap size={16} /> : <FileText size={16} />}
                  <span className="font-semibold text-sm">{node.title}</span>
                </div>
              </div>
              <div className="p-4 space-y-3">
                {node.type === 'trigger' && (
                  <>
                    <div>
                      <label className="text-xs font-medium text-gray-700 mb-1 block">
                        Contact Type *
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                        <option>Lead</option>
                        <option>Customer</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-700 mb-1 block">
                        Trigger Type *
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                        <option>on exact match</option>
                        <option>contains</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-700 mb-1 block">
                        Trigger Keywords *
                      </label>
                      <p className="text-xs text-gray-500 mb-2">
                        This flow will be triggered when a user sends any of these keywords
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {(node.data.keywords || []).map((keyword: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-primary-purple text-primary-blue rounded text-xs flex items-center gap-1"
                          >
                            {keyword}
                            <button 
                              onClick={() => handleRemoveKeyword(node.id, idx)}
                              className="hover:text-red-600"
                            >
                              <X size={12} />
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-2">
                        <input
                          type="text"
                          value={newKeyword}
                          onChange={(e) => setNewKeyword(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleAddKeyword(node.id)}
                          placeholder="Add a keyword..."
                          className="flex-1 px-3 py-1 border border-gray-300 rounded text-sm"
                        />
                        <button 
                          onClick={() => handleAddKeyword(node.id)}
                          className="px-3 py-1 bg-primary-blue text-white rounded text-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </>
                )}
                {node.type === 'ai-assistant' && (
                  <>
                    <div>
                      <label className="text-xs font-medium text-gray-700 mb-1 block">
                        AI Personal Assistant *
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                        <option>FAQ Genius</option>
                      </select>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}

          {nodes.length > 1 && (
            <div className="absolute" style={{ left: '350px', top: '150px' }}>
              <div className="w-32 h-0.5 bg-primary-purple border-dashed border-2 relative">
                <button 
                  onClick={handleRemoveConnection}
                  className="absolute -right-4 -top-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

