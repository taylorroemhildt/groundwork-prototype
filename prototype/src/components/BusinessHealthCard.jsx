import React from 'react'
import { TrendingUp, Calendar, DollarSign } from 'lucide-react'
import { formatCurrency } from '../lib/utils'

// Simple sparkline SVG component
function Sparkline() {
  const points = [
    { x: 0, y: 70 },
    { x: 16, y: 55 },
    { x: 32, y: 65 },
    { x: 48, y: 40 },
    { x: 64, y: 35 },
    { x: 80, y: 28 },
    { x: 96, y: 20 },
    { x: 112, y: 15 },
    { x: 128, y: 10 },
  ]

  const pathData = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ')

  // Area fill
  const areaData = `${pathData} L 128 80 L 0 80 Z`

  return (
    <svg
      viewBox="0 0 128 80"
      className="w-full h-12"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="sparkGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1A5C3D" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#1A5C3D" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaData} fill="url(#sparkGradient)" />
      <path
        d={pathData}
        fill="none"
        stroke="#1A5C3D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Last point dot */}
      <circle cx="128" cy="10" r="3" fill="#1A5C3D" />
    </svg>
  )
}

export default function BusinessHealthCard({ loan }) {
  const metrics = [
    {
      id: 'cashflow',
      label: 'Cash flow',
      value: 'Trending up',
      icon: TrendingUp,
      iconColor: 'text-green-600',
      iconBg: 'bg-green-50',
      extra: <Sparkline />,
      extraLabel: 'Revenue trend — last 9 months',
    },
    {
      id: 'daysLeft',
      label: 'Days until payoff',
      value: '334',
      subValue: 'days',
      icon: Calendar,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50',
    },
    {
      id: 'totalPaid',
      label: 'Total paid',
      value: formatCurrency(loan.totalPaid),
      subValue: `of ${formatCurrency(loan.totalRepay)}`,
      icon: DollarSign,
      iconColor: 'text-green-600',
      iconBg: 'bg-green-50',
    },
  ]

  return (
    <div>
      <h2 className="text-base font-semibold text-gray-900 mb-3">
        Business snapshot
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {metrics.map(metric => (
          <div key={metric.id} className="card">
            <div className="flex items-center gap-2.5 mb-3">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${metric.iconBg}`}
                aria-hidden="true"
              >
                <metric.icon size={16} className={metric.iconColor} />
              </div>
              <span className="text-sm text-gray-500 font-medium">{metric.label}</span>
            </div>

            {metric.extra ? (
              <>
                <div
                  className="mb-1"
                  role="img"
                  aria-label={metric.extraLabel}
                >
                  {metric.extra}
                </div>
                <div className="text-sm font-semibold text-green-600 flex items-center gap-1">
                  <TrendingUp size={13} aria-hidden="true" />
                  {metric.value}
                </div>
              </>
            ) : (
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {metric.value}
                </div>
                {metric.subValue && (
                  <div className="text-sm text-gray-500 mt-0.5">{metric.subValue}</div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
