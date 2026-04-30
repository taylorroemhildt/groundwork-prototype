import React, { useState } from 'react'
import { X, DollarSign } from 'lucide-react'
import { useApp } from '../App'
import MilestoneCard from '../components/MilestoneCard'
import LoanStatusCard from '../components/LoanStatusCard'
import QuickActions from '../components/QuickActions'
import BusinessHealthCard from '../components/BusinessHealthCard'
import RepaymentSchedule from '../components/RepaymentSchedule'
import ContactDrawer from '../components/ContactDrawer'
import { formatCurrency } from '../lib/utils'

function PaymentModal({ loan, onClose, onSuccess }) {
  const [amount, setAmount] = useState(loan.nextPayment.amount.toString())
  const [isProcessing, setIsProcessing] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setIsProcessing(true)
    setTimeout(() => {
      onSuccess(parseFloat(amount))
      onClose()
    }, 900)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" role="dialog" aria-modal="true" aria-label="Make a payment">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 fade-in" onClick={onClose} aria-hidden="true" />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-8 fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
          aria-label="Close payment modal"
        >
          <X size={18} aria-hidden="true" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
            <DollarSign size={20} className="text-green-600" aria-hidden="true" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Make a payment</h2>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-6">
            <label htmlFor="payment-amount" className="label-base">
              Payment amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium" aria-hidden="true">
                $
              </span>
              <input
                id="payment-amount"
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="input-base pl-7"
                min="1"
                step="1"
                required
                aria-required="true"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1.5">
              Scheduled payment: {formatCurrency(loan.nextPayment.amount)} · Due in {loan.nextPayment.daysUntil} days
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-sm">
            <div className="flex justify-between text-gray-600 mb-1.5">
              <span>Payment method</span>
              <span className="font-medium text-gray-900">Chase Business Checking ····4821</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Processing time</span>
              <span className="font-medium text-gray-900">1–2 business days</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing || !amount || parseFloat(amount) <= 0}
            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            aria-busy={isProcessing}
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                Processing…
              </>
            ) : (
              `Pay ${amount ? formatCurrency(parseFloat(amount)) : '—'} now`
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const { user, loan } = useApp()
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showContactDrawer, setShowContactDrawer] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(null)

  const showMilestone = loan.percentPaid >= 25

  const hour = new Date().getHours()
  const greeting =
    hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  function handlePaymentSuccess(amount) {
    setPaymentSuccess(amount)
    setTimeout(() => setPaymentSuccess(null), 5000)
  }

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-8 space-y-6">
      {/* Greeting */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 leading-tight">
          {greeting}, Rosa.
        </h1>
        <p className="text-base text-gray-500 mt-1">{user.businessName}</p>
      </div>

      {/* Milestone card */}
      {showMilestone && (
        <MilestoneCard percentPaid={loan.percentPaid} />
      )}

      {/* Payment success toast */}
      {paymentSuccess && (
        <div
          role="status"
          aria-live="polite"
          className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-5 py-3 text-green-800 text-sm font-medium fade-in"
        >
          <span className="text-green-600" aria-hidden="true">✓</span>
          Payment of {formatCurrency(paymentSuccess)} scheduled — you'll receive a confirmation email.
        </div>
      )}

      {/* Loan status card */}
      <LoanStatusCard
        loan={loan}
        onMakePayment={() => setShowPaymentModal(true)}
      />

      {/* Quick actions */}
      <QuickActions
        onMakePayment={() => setShowPaymentModal(true)}
        onContactSupport={() => setShowContactDrawer(true)}
      />

      {/* Business health */}
      <BusinessHealthCard loan={loan} />

      {/* Repayment schedule */}
      <RepaymentSchedule loan={loan} />

      {/* Modals */}
      {showPaymentModal && (
        <PaymentModal
          loan={loan}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}

      <ContactDrawer
        isOpen={showContactDrawer}
        onClose={() => setShowContactDrawer(false)}
      />
    </div>
  )
}
