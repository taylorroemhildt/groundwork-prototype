import React, { useState } from 'react'
import { DollarSign, TrendingUp, MessageCircle, X } from 'lucide-react'
import { cn } from '../lib/utils'

export default function QuickActions({ onMakePayment, onContactSupport }) {
  const [drawToast, setDrawToast] = useState(false)

  function handleDrawFunds() {
    setDrawToast(true)
    setTimeout(() => setDrawToast(false), 3000)
  }

  const actions = [
    {
      icon: DollarSign,
      label: 'Make a Payment',
      description: 'Schedule your next payment',
      onClick: onMakePayment,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      icon: TrendingUp,
      label: 'Draw Funds',
      description: 'Access additional capital',
      onClick: handleDrawFunds,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      icon: MessageCircle,
      label: 'Contact Support',
      description: 'Talk to your loan advisor',
      onClick: onContactSupport,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
  ]

  return (
    <div className="relative">
      {/* Coming soon toast */}
      {drawToast && (
        <div
          role="status"
          aria-live="polite"
          className="absolute -top-14 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm px-4 py-2 rounded-lg shadow-lg z-10 whitespace-nowrap fade-in"
        >
          Draw funds coming soon — stay tuned!
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {actions.map(action => (
          <button
            key={action.label}
            onClick={action.onClick}
            className="card flex flex-col items-center text-center p-5 hover:border-gray-300 hover:shadow-md transition-all duration-150 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 cursor-pointer"
          >
            <div
              className={cn(
                'w-11 h-11 rounded-xl flex items-center justify-center mb-3 transition-transform duration-150 group-hover:scale-110',
                action.bg
              )}
              aria-hidden="true"
            >
              <action.icon size={20} className={action.color} />
            </div>
            <div className="text-sm font-semibold text-gray-900">{action.label}</div>
            <div className="text-xs text-gray-500 mt-0.5">{action.description}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
