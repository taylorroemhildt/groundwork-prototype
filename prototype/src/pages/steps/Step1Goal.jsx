import React from 'react'
import { formatCurrency } from '../../lib/utils'

const purposes = [
  'Equipment',
  'Inventory',
  'Payroll',
  'Cash flow',
  'Marketing',
  'Other',
]

export default function Step1Goal({ formData, updateFormData }) {
  return (
    <div className="fade-in">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Your funding goal
      </h1>
      <p className="text-gray-500 mb-8">
        Tell us what you're looking for — we'll find the right fit.
      </p>

      <div className="space-y-6">
        {/* Amount */}
        <div>
          <label htmlFor="funding-amount" className="label-base">
            How much do you need?
          </label>
          <div className="relative">
            <span
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium"
              aria-hidden="true"
            >
              $
            </span>
            <input
              id="funding-amount"
              type="number"
              value={formData.fundingAmount}
              onChange={e => updateFormData({ fundingAmount: parseFloat(e.target.value) || 0 })}
              className="input-base pl-7 text-lg font-semibold"
              min={5000}
              max={250000}
              step={1000}
              aria-required="true"
              aria-describedby="amount-hint"
            />
          </div>
          <p id="amount-hint" className="text-xs text-gray-400 mt-1.5">
            Available range: $5,000 – $250,000
          </p>

          {/* Visual range slider for feel */}
          <input
            type="range"
            min={5000}
            max={250000}
            step={1000}
            value={formData.fundingAmount}
            onChange={e => updateFormData({ fundingAmount: parseFloat(e.target.value) })}
            className="w-full mt-3 accent-green-600"
            aria-label="Funding amount slider"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-0.5">
            <span>$5,000</span>
            <span className="font-medium text-green-600">
              {formatCurrency(formData.fundingAmount)}
            </span>
            <span>$250,000</span>
          </div>
        </div>

        {/* Purpose */}
        <div>
          <label htmlFor="funding-purpose" className="label-base">
            What's it for?
          </label>
          <select
            id="funding-purpose"
            value={formData.fundingPurpose}
            onChange={e => updateFormData({ fundingPurpose: e.target.value })}
            className="input-base"
            aria-required="true"
          >
            {purposes.map(p => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-400 mt-1.5">
            This helps us understand your business needs.
          </p>
        </div>
      </div>
    </div>
  )
}
