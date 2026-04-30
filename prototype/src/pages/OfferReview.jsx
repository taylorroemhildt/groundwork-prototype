import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, MessageCircle } from 'lucide-react'
import { useApp } from '../App'
import OfferCard from '../components/OfferCard'
import ContactDrawer from '../components/ContactDrawer'
import { formatCurrency } from '../lib/utils'

export default function OfferReview() {
  const { loan, updateAppState } = useApp()
  const navigate = useNavigate()
  const [showContactDrawer, setShowContactDrawer] = useState(false)
  const [isAccepting, setIsAccepting] = useState(false)
  const [declined, setDeclined] = useState(false)

  function handleAccept() {
    setIsAccepting(true)
    setTimeout(() => {
      updateAppState({ applicationStatus: 'approved' })
      navigate('/dashboard')
    }, 1000)
  }

  function handleDecline() {
    setDeclined(true)
  }

  if (declined) {
    return (
      <div className="max-w-lg mx-auto px-6 py-16 text-center">
        <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={28} className="text-gray-400" aria-hidden="true" />
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">No worries.</h1>
        <p className="text-gray-500 mb-6">
          We've noted that you'd like to pass on this offer. Your pre-approval stays on file for 30
          days if you change your mind.
        </p>
        <button
          onClick={() => setDeclined(false)}
          className="text-sm text-green-600 font-medium hover:text-green-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 rounded"
        >
          ← Go back to offer
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-[1000px] mx-auto px-6 py-12">
      {/* Approved badge */}
      <div className="flex items-center gap-2 mb-8">
        <CheckCircle size={18} className="text-green-600" aria-hidden="true" />
        <span className="text-sm font-medium text-green-600 uppercase tracking-wide">Approved</span>
      </div>

      {/* Two-column layout at lg */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: amount + CTAs */}
        <div>
          <p className="text-gray-500 mb-3">Here's what we're offering you, Rosa.</p>
          <h1 className="text-7xl font-bold text-green-600 leading-none mb-2">
            {formatCurrency(loan.amount)}
          </h1>
          <p className="text-gray-400 text-sm mb-10">
            You'll repay {formatCurrency(Math.round(loan.amount * 1.15))} total over 18 months
          </p>

          <div className="space-y-3">
            <button
              onClick={handleAccept}
              disabled={isAccepting}
              className="btn-primary w-full flex items-center justify-center gap-2 text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed"
              aria-busy={isAccepting}
            >
              {isAccepting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                  Accepting offer…
                </>
              ) : (
                'Accept this offer'
              )}
            </button>

            <div className="text-center">
              <button
                onClick={handleDecline}
                className="text-sm text-gray-400 hover:text-gray-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 rounded px-2 py-1"
              >
                Decline
              </button>
            </div>

            <p className="text-xs text-gray-400 text-center leading-relaxed">
              Take your time — this offer doesn't expire for 30 days. No pressure.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={() => setShowContactDrawer(true)}
              className="inline-flex items-center gap-1.5 text-sm text-green-600 font-medium hover:text-green-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 rounded"
            >
              <MessageCircle size={14} aria-hidden="true" />
              Talk to someone about this offer
            </button>
          </div>
        </div>

        {/* Right: breakdown card */}
        <div>
          <OfferCard loan={loan} />
        </div>
      </div>

      <ContactDrawer
        isOpen={showContactDrawer}
        onClose={() => setShowContactDrawer(false)}
      />
    </div>
  )
}
