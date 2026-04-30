import React, { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'

export default function Step5EligibilityResult({ formData, onNext }) {
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    // Brief loading delay for dramatic effect
    const timer = setTimeout(() => setRevealed(true), 600)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fade-in text-center">
      {!revealed ? (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <div className="w-12 h-12 border-3 border-green-600 border-t-transparent rounded-full animate-spin" style={{ borderWidth: '3px' }} aria-hidden="true" />
          <p className="text-gray-500 text-sm font-medium">Checking your eligibility…</p>
        </div>
      ) : (
        <div className="scale-in">
          {/* Celebration header */}
          <div className="mb-6">
            <div className="text-4xl mb-3" aria-hidden="true">🎉</div>
            <h1 className="text-2xl font-bold text-green-600 mb-1">
              Great news, Rosa.
            </h1>
            <p className="text-gray-500 text-sm">
              Based on what you've shared, you pre-qualify for:
            </p>
          </div>

          {/* Big offer range */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-8 mb-6">
            <div className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-2">
              Estimated offer range
            </div>
            <div className="text-5xl font-bold text-gray-900 mb-2">
              $25,000 – $40,000
            </div>
            <div className="text-gray-500 text-sm">
              Estimated monthly payment
            </div>
            <div className="text-2xl font-bold text-gray-900 mt-1">
              ~$2,100 – $2,500
              <span className="text-base font-normal text-gray-500"> / month</span>
            </div>
            <div className="text-sm text-gray-500 mt-1">over 18 months</div>

            <div className="mt-4 pt-4 border-t border-green-200">
              <div className="text-sm text-gray-600">
                You'd pay back approximately{' '}
                <span className="font-semibold text-gray-900">$37,800 – $45,000 total</span>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="space-y-3">
            <button
              onClick={onNext}
              className="btn-primary w-full flex items-center justify-center gap-2 text-base py-3.5"
            >
              Continue to get your final offer
              <ArrowRight size={18} aria-hidden="true" />
            </button>

            <button
              onClick={() => {}}
              className="w-full text-sm text-gray-500 hover:text-gray-700 transition-colors py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 rounded"
            >
              Save and come back later
            </button>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-gray-400 mt-4 leading-relaxed px-4">
            This is an estimate based on what you've shared. Your final offer may vary after we
            verify your information.
          </p>
        </div>
      )}
    </div>
  )
}
