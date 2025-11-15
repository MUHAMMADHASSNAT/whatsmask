import { TrendingUp, TrendingDown } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string
  status?: {
    text: string
    isPositive: boolean
  }
  icon?: React.ReactNode
}

export default function StatCard({ title, value, status, icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        {icon && <div className="text-primary-blue">{icon}</div>}
      </div>
      <div className="flex items-end justify-between">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {status && (
          <div
            className={`flex items-center gap-1 text-sm font-medium ${
              status.isPositive ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {status.isPositive ? (
              <TrendingUp size={16} />
            ) : (
              <TrendingDown size={16} />
            )}
            <span>{status.text}</span>
          </div>
        )}
      </div>
    </div>
  )
}

