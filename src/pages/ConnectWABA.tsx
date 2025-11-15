import { Save, Link2 } from 'lucide-react'

export default function ConnectWABA() {
  return (
    <div className="bg-white rounded-xl shadow-soft p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-primary-purple rounded-lg flex items-center justify-center">
          <Link2 size={24} className="text-primary-blue" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Connect WABA</h2>
          <p className="text-sm text-gray-600">Connect your WhatsApp Business API account</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            WABA Phone Number ID
          </label>
          <input
            type="text"
            placeholder="Enter your WhatsApp Business API Phone Number ID"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Access Token
          </label>
          <input
            type="password"
            placeholder="Enter your access token"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Webhook Verify Token
          </label>
          <input
            type="text"
            placeholder="Enter webhook verify token"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
          />
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            <span className="text-sm font-medium text-gray-700">Enable webhook notifications</span>
          </label>
        </div>

        <div className="flex justify-end">
          <button className="px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-blue-600 flex items-center gap-2">
            <Save size={16} />
            <span>Save & Connect</span>
          </button>
        </div>
      </div>
    </div>
  )
}

