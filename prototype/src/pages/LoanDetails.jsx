import React, { useState } from 'react'
import { Download, CheckCircle, Clock, ArrowRight } from 'lucide-react'
import { useApp } from '../App'
import ContactDrawer from '../components/ContactDrawer'
import { formatCurrency, generateRepaymentSchedule } from '../lib/utils'
import { cn } from '../lib/utils'

export default function LoanDetails() {
  const { loan } = useApp()
  const [showContactDrawer, setShowContactDrawer] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const schedule = generateRepaymentSchedule(
    '2025-09-15',
    loan.totalPayments,
    loan.monthlyPayment,
    loan.amount,
    loan.totalRepay
  )

  const currentPaymentIndex = loan.paidPayments // 0-indexed; this is next upcoming

  function getRowStatus(index) {
    if (index < loan.paidPayments) return 'paid'
    if (index === loan.paidPayments) return 'current'
    return 'future'
  }

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-8">
      {/* Page header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Loan</h1>
          <p className="text-sm text-gray-500 mt-1">
            Full repayment details for your working capital loan
          </p>
        </div>
        <button
          onClick={() => setShowPaymentModal(true)}
          className="btn-primary text-sm"
        >
          Make a payment
        </button>
      </div>

      {/* Loan summary bar */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Loan amount', value: formatCurrency(loan.amount) },
          { label: 'Term', value: `${loan.totalPayments} months` },
          { label: 'Start date', value: loan.startDate },
          {
            label: 'Status',
            value: (
              <span className="inline-flex items-center gap-1.5 text-green-700 font-medium">
                <CheckCircle size={14} aria-hidden="true" />
                Active — on track
              </span>
            ),
          },
        ].map(item => (
          <div key={item.label} className="card py-4">
            <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">
              {item.label}
            </div>
            <div className="text-base font-semibold text-gray-900">{item.value}</div>
          </div>
        ))}
      </div>

      {/* Repayment schedule */}
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-gray-900">
            Full repayment schedule
          </h2>
          <button
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
            aria-label="Download repayment schedule as PDF"
          >
            <Download size={14} aria-hidden="true" />
            Download schedule (PDF)
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Due date
                </th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Balance after
                </th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((row, i) => {
                const status = getRowStatus(i)
                return (
                  <tr
                    key={row.payment}
                    className={cn(
                      'border-b border-gray-100 last:border-0',
                      status === 'current'
                        ? 'bg-green-50 border-green-100'
                        : status === 'paid'
                        ? 'opacity-70'
                        : 'hover:bg-gray-50'
                    )}
                  >
                    <td className="px-4 py-3 text-gray-400 text-xs font-medium">
                      {String(row.payment).padStart(2, '0')}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {row.dueDate}
                      {status === 'current' && (
                        <span className="ml-2 text-xs font-medium text-green-600 bg-green-100 px-1.5 py-0.5 rounded">
                          Next
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-gray-900">
                      {formatCurrency(row.amount)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {status === 'paid' ? (
                        <span className="inline-flex items-center gap-1 text-green-600 text-xs font-medium">
                          <CheckCircle size={12} aria-hidden="true" />
                          Paid
                        </span>
                      ) : status === 'current' ? (
                        <span className="inline-flex items-center gap-1 text-amber-600 text-xs font-medium">
                          <Clock size={12} aria-hidden="true" />
                          Due soon
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">Upcoming</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-600">
                      {status === 'paid' ? (
                        <span className="text-gray-400">—</span>
                      ) : (
                        formatCurrency(row.balanceAfter)
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment history summary */}
      <div className="card">
        <h2 className="text-base font-semibold text-gray-900 mb-4">
          Payment history
        </h2>
        <div className="grid grid-cols-3 gap-4 mb-5">
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="text-2xl font-bold text-gray-900">{loan.paidPayments}</div>
            <div className="text-sm text-gray-500 mt-0.5">payments made</div>
          </div>
          <div className="bg-green-50 rounded-xl p-4">
            <div className="text-2xl font-bold text-green-700">
              {formatCurrency(loan.totalPaid)}
            </div>
            <div className="text-sm text-gray-500 mt-0.5">total paid to date</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="text-2xl font-bold text-gray-900">{loan.percentPaid}%</div>
            <div className="text-sm text-gray-500 mt-0.5">of loan paid off</div>
          </div>
        </div>

        <div className="space-y-2">
          {schedule.slice(0, loan.paidPayments).reverse().map(row => (
            <div
              key={row.payment}
              className="flex items-center justify-between py-2.5 px-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle size={12} className="text-green-600" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    Payment #{String(row.payment).padStart(2, '0')}
                  </div>
                  <div className="text-xs text-gray-400">{row.dueDate}</div>
                </div>
              </div>
              <div className="text-sm font-semibold text-gray-900">
                {formatCurrency(row.amount)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact drawer */}
      <ContactDrawer
        isOpen={showContactDrawer}
        onClose={() => setShowContactDrawer(false)}
      />
    </div>
  )
}
