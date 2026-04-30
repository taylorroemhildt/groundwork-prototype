import React from 'react'

const businessTypes = [
  'Catering / Food Service',
  'Retail',
  'Construction',
  'Healthcare',
  'Professional Services',
  'Other',
]

const yearsOptions = [
  'Less than 1 year',
  '1–2 years',
  '3–5 years',
  '5–10 years',
  '10+ years',
]

export default function Step2Business({ formData, updateFormData }) {
  return (
    <div className="fade-in">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Tell us about your business
      </h1>
      <p className="text-gray-500 mb-8">
        A few quick details so we can personalize your offer.
      </p>

      <div className="space-y-6">
        {/* Business name */}
        <div>
          <label htmlFor="business-name" className="label-base">
            Business name
          </label>
          <input
            id="business-name"
            type="text"
            value={formData.businessName}
            onChange={e => updateFormData({ businessName: e.target.value })}
            className="input-base"
            placeholder="e.g. Rosa's Catering Co."
            autoComplete="organization"
            aria-required="true"
          />
        </div>

        {/* Business type */}
        <div>
          <label htmlFor="business-type" className="label-base">
            Business type
          </label>
          <select
            id="business-type"
            value={formData.businessType}
            onChange={e => updateFormData({ businessType: e.target.value })}
            className="input-base"
            aria-required="true"
          >
            {businessTypes.map(t => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Years in operation */}
        <div>
          <label htmlFor="years-operation" className="label-base">
            Years in operation
          </label>
          <select
            id="years-operation"
            value={formData.yearsInOperation}
            onChange={e => updateFormData({ yearsInOperation: e.target.value })}
            className="input-base"
            aria-required="true"
          >
            {yearsOptions.map(o => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-400 mt-1.5">
            Businesses with at least 1 year of history typically qualify for better rates.
          </p>
        </div>
      </div>
    </div>
  )
}
