import React, { useState } from 'react'
import { ChevronDown, ChevronUp, Download } from 'lucide-react'
import { formatCurrency, generateRepaymentSchedule } from '../lib/utils'
import { cn } from '../lib/utils'

export default function RepaymentSchedule({ loan, showAll = false }) {
  const [isOpen, setIsOpen] = useState(false)

  const schedule = generateRepaymentSchedule(
    '2025-09-15',
    loan.totalPayments,
    loan.monthlyPayment,
    loan.amount,
    loan.totalRepay
  )

  const displayedPayments = showAll
    ? schedule
    : schedule.slice(loan.paidPayments, loan.paidPayments + 6)

  return (
    <div className="card">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 rounded"
        aria-expanded={isOpen}
        aria-controls="repayment-schedule-table"
      >
        <h2 className="text-base font-semibold text-gray-900">
          Upcoming payments
        </h2>
        <div className="flex items-center gap-3">
          <button
            onClick={e => {
              e.stopPropagation()
              // No-op for demo
            }}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 rounded px-2 py-1"
            aria-label="Download repayment schedule as PDF"
          >
            <Download size={14} aria-hidden="true" />
            Download PDF
          </button>
          <div className="text-gray-400" aria-hidden="true">
            {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
        </div>
      </button>

      {isOpen && (
        <div id="repayment-schedule-table" className="mt-4 fade-in">
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Balance After
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayedPayments.map((row, i) => (
                  <tr
                    key={row.payment}
                    className={cn(
                      'border-b border-gray-100 last:border-0',
                      i === 0 && !showAll ? 'bg-green-50' : 'hover:bg-gray-50'
                    )}
                  >
                    <td className="px-4 py-3 text-gray-700">
                      {row.dueDate}
                      {i === 0 && !showAll && (
                        <span className="ml-2 text-xs font-medium text-green-600">
                          Next
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-gray-900">
                      {formatCurrency(row.amount)}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-600">
                      {formatCurrency(row.balanceAfter)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
