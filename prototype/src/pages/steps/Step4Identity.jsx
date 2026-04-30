import React from 'react'
import { Lock } from 'lucide-react'

export default function Step4Identity({ formData, updateFormData }) {
  return (
    <div className="fade-in">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        A little about you
      </h1>
      <p className="text-gray-500 mb-8">
        We need this to verify your identity — it's quick and secure.
      </p>

      <div className="space-y-5">
        {/* Full name */}
        <div>
          <label htmlFor="full-name" className="label-base">
            Full name
          </label>
          <input
            id="full-name"
            type="text"
            value={formData.fullName}
            onChange={e => updateFormData({ fullName: e.target.value })}
            className="input-base"
            autoComplete="name"
            aria-required="true"
          />
        </div>

        {/* Date of birth */}
        <div>
          <label htmlFor="date-of-birth" className="label-base">
            Date of birth
          </label>
          <input
            id="date-of-birth"
            type="date"
            value={formData.dateOfBirth}
            onChange={e => updateFormData({ dateOfBirth: e.target.value })}
            className="input-base"
            autoComplete="bday"
            aria-required="true"
          />
        </div>

        {/* SSN last 4 */}
        <div>
          <label htmlFor="ssn-last4" className="label-base">
            Last 4 digits of your Social Security Number
          </label>
          <input
            id="ssn-last4"
            type="text"
            inputMode="numeric"
            value={formData.ssnLast4}
            onChange={e => {
              const val = e.target.value.replace(/\D/g, '').slice(0, 4)
              updateFormData({ ssnLast4: val })
            }}
            className="input-base tracking-widest font-mono text-lg"
            maxLength={4}
            pattern="\d{4}"
            placeholder="0000"
            aria-required="true"
            aria-describedby="ssn-hint"
            autoComplete="off"
          />
          <p id="ssn-hint" className="text-xs text-gray-400 mt-1.5">
            We only need the last 4 digits.
          </p>
        </div>

        {/* Security info box */}
        <div className="flex gap-3 bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex-shrink-0 mt-0.5">
            <Lock size={16} className="text-green-600" aria-hidden="true" />
          </div>
          <p className="text-sm text-green-800 leading-relaxed">
            <span className="font-semibold">This is a soft credit check</span> — it won't affect
            your credit score. Your information is encrypted with 256-bit SSL and is never sold to
            third parties.
          </p>
        </div>
      </div>
    </div>
  )
}
