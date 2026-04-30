import React from 'react'
import { cn } from '../lib/utils'

export default function ProgressBar({ current, total, className }) {
  const percent = Math.round((current / total) * 100)

  return (
    <div className={cn('w-full', className)}>
      <div
        className="h-1.5 bg-gray-200 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={`Step ${current} of ${total}`}
      >
        <div
          className="h-full bg-green-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
