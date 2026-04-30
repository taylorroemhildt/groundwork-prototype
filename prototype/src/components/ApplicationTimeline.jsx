import React from 'react'
import { Check, Circle } from 'lucide-react'
import { cn } from '../lib/utils'

const stages = [
  {
    id: 'received',
    label: 'Application received',
    date: 'April 28, 2026',
    status: 'complete',
  },
  {
    id: 'identity',
    label: 'Identity verified',
    date: 'April 28, 2026',
    status: 'complete',
  },
  {
    id: 'business',
    label: 'Business review',
    date: 'In progress · Usually 1–2 business days',
    status: 'active',
  },
  {
    id: 'decision',
    label: 'Decision / Offer',
    date: null,
    status: 'pending',
  },
  {
    id: 'funds',
    label: 'Funds sent',
    date: null,
    status: 'pending',
  },
]

export default function ApplicationTimeline() {
  return (
    <div className="card">
      <h2 className="text-base font-semibold text-gray-900 mb-5">
        Application progress
      </h2>
      <ol className="relative" aria-label="Application status timeline">
        {stages.map((stage, i) => (
          <li key={stage.id} className="flex gap-4 pb-6 last:pb-0 relative">
            {/* Connecting line */}
            {i < stages.length - 1 && (
              <div
                className={cn(
                  'absolute left-4 top-8 w-0.5 h-full -translate-x-1/2',
                  stage.status === 'complete' ? 'bg-green-600' : 'bg-gray-200'
                )}
                aria-hidden="true"
              />
            )}

            {/* Icon */}
            <div className="flex-shrink-0 relative z-10">
              {stage.status === 'complete' && (
                <div
                  className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center"
                  aria-label="Completed"
                >
                  <Check size={14} className="text-white" aria-hidden="true" />
                </div>
              )}
              {stage.status === 'active' && (
                <div
                  className="w-8 h-8 rounded-full border-2 border-green-600 bg-white flex items-center justify-center"
                  aria-label="In progress"
                >
                  <div className="w-3 h-3 rounded-full bg-green-600 pulse-dot" aria-hidden="true" />
                </div>
              )}
              {stage.status === 'pending' && (
                <div
                  className="w-8 h-8 rounded-full border-2 border-gray-200 bg-white flex items-center justify-center"
                  aria-label="Not started"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-200" aria-hidden="true" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pt-0.5">
              <div
                className={cn(
                  'text-sm font-medium',
                  stage.status === 'pending' ? 'text-gray-400' : 'text-gray-900'
                )}
              >
                {stage.label}
              </div>
              {stage.date && (
                <div
                  className={cn(
                    'text-xs mt-0.5',
                    stage.status === 'active'
                      ? 'text-green-600 font-medium'
                      : 'text-gray-400'
                  )}
                >
                  {stage.date}
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
