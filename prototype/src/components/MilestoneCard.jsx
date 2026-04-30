import React from 'react'
import { Star } from 'lucide-react'

export default function MilestoneCard({ percentPaid }) {
  return (
    <div
      className="flex items-center gap-4 bg-green-50 border border-green-200 rounded-xl px-6 py-4 fade-in"
      role="status"
      aria-live="polite"
    >
      <div
        className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0"
        aria-hidden="true"
      >
        <Star size={20} className="text-green-600 fill-green-200" />
      </div>
      <div>
        <div className="text-sm font-semibold text-green-800">
          You've paid off {percentPaid}% of your loan — you're making great progress.
        </div>
        <div className="text-sm text-green-700 mt-0.5">
          Keep it up. You're ahead of where most borrowers are at this stage.
        </div>
      </div>
    </div>
  )
}
