import React, { useState } from 'react'
import { CheckCircle, X } from 'lucide-react'
import { formatCurrency } from '../lib/utils'

export default function LoanStatusCard({ loan, onMakePayment }) {
  const [successState, setSuccessState] = useState(false)

  function handlePaymentSuccess(amount) {
    setSuccessState(true)
    setTimeout(() => setSuccessState(false), 4000)
    onMakePayment && onMakePayment()
  }

  return (
    <div className="card">
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-green-600">
            Active Loan
          </span>
          <div className="mt-1 text-3xl font-bold text-gray-900">
            {formatCurrency(loan.amount)}
          </div>
          <div className="text-sm text-gray-500 mt-0.5">borrowed</div>
        </div>

        {successState ? (
          <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm font-medium border border-green-200">
            <CheckCircle size={16} aria-hidden="true" />
            Payment of {formatCurrency(loan.nextPayment.amount)} scheduled
          </div>
        ) : (
          <button
            onClick={() => onMakePayment && onMakePayment()}
            className="btn-primary text-sm py-2 px-4"
          >
            Make a payment
          </button>
        )}
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex justify-between text-sm mb-1.5">
          <span className="text-gray-500">
            {formatCurrency(loan.amount - loan.remaining)} paid
          </span>
          <span className="text-gray-500">
            {formatCurrency(loan.remaining)} remaining
          </span>
        </div>
        <div
          className="h-3 bg-gray-100 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={loan.percentPaid}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${loan.percentPaid}% of loan paid off`}
        >
          <div
            className="h-full bg-green-600 rounded-full transition-all duration-700"
            style={{ width: `${loan.percentPaid}%` }}
          />
        </div>
        <div className="text-right text-xs text-gray-400 mt-1">
          {loan.percentPaid}% paid off
        </div>
      </div>

      {/* Next payment */}
      <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
        <div className="text-sm text-gray-700">
          Next payment:{' '}
          <span className="font-semibold text-gray-900">
            {formatCurrency(loan.nextPayment.amount)}
          </span>{' '}
          · due in{' '}
          <span className="font-semibold text-gray-900">
            {loan.nextPayment.daysUntil} days
          </span>
        </div>
        <span className="ml-auto flex items-center gap-1.5 text-xs font-medium text-green-700 bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
          <CheckCircle size={12} aria-hidden="true" />
          On track
        </span>
      </div>
    </div>
  )
}
