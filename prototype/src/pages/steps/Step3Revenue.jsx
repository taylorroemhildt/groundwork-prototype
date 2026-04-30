import React from 'react'

export default function Step3Revenue({ formData, updateFormData }) {
  return (
    <div className="fade-in">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Quick revenue check
      </h1>
      <p className="text-gray-500 mb-8">
        This gives us a starting point — we won't verify until later.
      </p>

      <div className="space-y-6">
        <div>
          <label htmlFor="monthly-revenue" className="label-base">
            What's your average monthly revenue?
          </label>
          <div className="relative">
            <span
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium"
              aria-hidden="true"
            >
              $
            </span>
            <input
              id="monthly-revenue"
              type="number"
              value={formData.monthlyRevenue}
              onChange={e => updateFormData({ monthlyRevenue: parseFloat(e.target.value) || 0 })}
              className="input-base pl-7 text-lg font-semibold"
              min={0}
              step={500}
              aria-required="true"
              aria-describedby="revenue-hint"
            />
          </div>
          <p id="revenue-hint" className="text-xs text-gray-400 mt-1.5">
            This helps us understand your cash flow. We'll verify it later.
          </p>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Annual estimate
            </div>
            <div className="text-xl font-bold text-gray-900">
              ${(formData.monthlyRevenue * 12).toLocaleString()}
            </div>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <div className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-1">
              Looks good for
            </div>
            <div className="text-xl font-bold text-green-700">
              {formData.monthlyRevenue >= 10000
                ? 'Up to $100k'
                : formData.monthlyRevenue >= 5000
                ? 'Up to $50k'
                : 'Basic offers'}
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 text-sm text-blue-700">
          <strong className="font-semibold">Heads up:</strong> We look at average revenue over the
          last 3–6 months. Seasonal variations are totally normal — just use your best estimate.
        </div>
      </div>
    </div>
  )
}
