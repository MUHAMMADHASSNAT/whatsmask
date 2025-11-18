import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts'
import { Users, DollarSign, Building2, Megaphone, RefreshCw } from 'lucide-react'
import StatCard from '../components/StatCard'

const chartData = [
  { month: 'Sept', earnings: 4000, subscriptions: 2400 },
  { month: 'Oct', earnings: 3000, subscriptions: 1398 },
  { month: 'Nov', earnings: 2000, subscriptions: 9800 },
  { month: 'Dec', earnings: 2780, subscriptions: 3908 },
  { month: 'Jan', earnings: 1890, subscriptions: 4800 },
  { month: 'Feb', earnings: 2390, subscriptions: 3800 },
  { month: 'Mar', earnings: 3490, subscriptions: 4300 },
  { month: 'Apr', earnings: 4000, subscriptions: 2400 },
  { month: 'May', earnings: 3000, subscriptions: 1398 },
  { month: 'Jun', earnings: 2000, subscriptions: 9800 },
  { month: 'Jul', earnings: 2780, subscriptions: 3908 },
  { month: 'Aug', earnings: 3490, subscriptions: 4300 }
]

const bestSellingPlans = [
  { name: 'Plan 3', price: '$300.00', quantity: 1 },
  { name: 'Plan 4', price: '$400.00', quantity: 1 },
  { name: 'Plan 5', price: '$500.00', quantity: 1 }
]

const usageData = [
  { name: 'Contacts', used: 4, limit: 300, action: 'View' },
  { name: 'Template Bots', used: 0, limit: 300, action: 'Manage' },
  { name: 'Message Bots', used: 0, limit: 300, action: 'Manage' },
  { name: 'Campaigns', used: 0, limit: 300, action: 'View' },
  { name: 'AI Prompts', used: 0, limit: 300, action: 'Manage' },
  { name: 'Canned Replies', used: 0, limit: 300, action: 'Manage' },
  { name: 'Staff', used: 0, limit: 300, action: 'Manage' },
  { name: 'Bot Flow', used: 2, limit: 15, action: 'Manage' },
  { name: 'Conversation', used: 51, limit: 'Unlimited', action: 'Open Chat' },
  { name: 'AI Assistant', used: 0, limit: 5, action: 'Manage' }
]

const audienceGrowthData = [
  { month: 'Jan', value: 100 },
  { month: 'Feb', value: 150 },
  { month: 'Mar', value: 200 },
  { month: 'Apr', value: 180 },
  { month: 'May', value: 250 },
  { month: 'Jun', value: 300 }
]

const contactSourcesData = [
  { name: 'Website', value: 35, color: '#4A77FF' },
  { name: 'Social Media', value: 25, color: '#DAD6FF' },
  { name: 'Referral', value: 20, color: '#9CA3AF' },
  { name: 'Direct', value: 20, color: '#F3F4F6' }
]

export default function Dashboard() {
  const currentTime = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).replace(/\//g, '-')

  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <div className="space-y-6">
      {/* Welcome Widget and Subscription Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-soft p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Hello, Super Admin</h1>
              <p className="text-sm text-gray-600">Welcome to your admin dashboard</p>
            </div>
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-blue-600 flex items-center gap-2 transition-colors"
            >
              <RefreshCw size={16} />
              <span>Refresh</span>
            </button>
          </div>
          <p className="text-sm text-gray-500">Last updated: {currentTime}</p>
        </div>
        <div className="bg-white rounded-xl shadow-soft p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Plan 3</h3>
          <p className="text-sm text-gray-600 mb-4">Next Billing: 2025-08-02 (2 days)</p>
          <div className="flex gap-2">
            <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm transition-colors">
              Refresh
            </button>
            <button className="flex-1 px-3 py-2 bg-primary-blue text-white rounded-lg hover:bg-blue-600 text-sm transition-colors">
              Manage Subscription
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Subscriptions"
          value="1,234"
          status={{ text: '+12.5%', isPositive: true }}
          icon={<Users size={24} />}
        />
        <StatCard
          title="Total Earnings"
          value="$45,678"
          status={{ text: '+8.2%', isPositive: true }}
          icon={<DollarSign size={24} />}
        />
        <StatCard
          title="Total Clients"
          value="567"
          status={{ text: '+5.1%', isPositive: true }}
          icon={<Building2 size={24} />}
        />
        <StatCard
          title="Total Campaigns"
          value="89"
          status={{ text: '-2.3%', isPositive: false }}
          icon={<Megaphone size={24} />}
        />
      </div>

      {/* Earnings Report Chart */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Earnings Report</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="earnings"
              stroke="#4A77FF"
              strokeWidth={2}
              name="Total Earnings"
              dot={{ fill: '#4A77FF', r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="subscriptions"
              stroke="#DAD6FF"
              strokeWidth={2}
              name="New Subscriptions"
              dot={{ fill: '#DAD6FF', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Usage & Limits Section */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Usage & Limits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {usageData.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
              <h3 className="text-sm font-medium text-gray-700 mb-2">{item.name}</h3>
              <p className="text-lg font-bold text-gray-900 mb-4">
                {item.used} / {item.limit}
              </p>
              <button 
                onClick={() => {
                  if (item.action === 'View' && item.name === 'Contacts') {
                    window.location.href = '/contact'
                  } else if (item.action === 'Manage' && item.name === 'AI Assistant') {
                    window.location.href = '/ai-assistant'
                  } else if (item.action === 'Open Chat') {
                    window.location.href = '/chat'
                  } else if (item.action === 'Manage' && item.name === 'Bot Flow') {
                    window.location.href = '/bot-flow'
                  }
                }}
                className="w-full px-3 py-2 bg-white text-primary-blue rounded-lg hover:bg-primary-purple hover:text-primary-blue text-sm font-medium transition-colors"
              >
                {item.action}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Best Selling Plan Box */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Best Selling Plan</h2>
        <div className="space-y-4">
          {bestSellingPlans.map((plan, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-purple rounded-lg flex items-center justify-center">
                  <span className="text-primary-blue font-bold">{plan.name.split(' ')[1]}</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{plan.name}</p>
                  <p className="text-sm text-gray-500">{plan.price}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">{plan.quantity}</p>
                <p className="text-xs text-gray-500">Quantity</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audience Growth and Contact Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Audience Growth */}
        <div className="bg-white rounded-xl shadow-soft p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Audience Growth</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-primary-blue text-white rounded-lg text-sm">Mixed</button>
              <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200">Stacked</button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={audienceGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="value" fill="#4A77FF" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Contact Sources */}
        <div className="bg-white rounded-xl shadow-soft p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Sources</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={contactSourcesData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {contactSourcesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

