import React from 'react'
import { formatCurrency } from '../lib/utils'

export default function OfferCard({ loan }) {
  const rows = [
    { label: 'Principal', value: formatCurrency(loan.amount), bold: false },
    { label: 'Total fees', value: formatCurrency(loan.fees), bold: false },
    { label: 'Total you\'ll repay', value: formatCurrency(loan.totalRepay), bold: true },
    { label: 'Monthly payment', value: formatCurrency(loan.monthlyPayment), bold: false },
    { label: 'Term', value: `${loan.totalPayments} months`, bold: false },
  ]

  return (
    <div className="card border-gray-200">
      <h2 className="text-base font-semibold text-gray-900 mb-4">
        Repayment breakdown
      </h2>
      <dl>
        {rows.map((row, i) => (
          <div
            key={row.label}
            className={`flex justify-between py-3 ${
              i < rows.length - 1 ? 'border-b border-gray-100' : ''
            } ${row.bold ? 'pt-3' : ''}`}
          >
            <dt
              className={`text-sm ${
                row.bold ? 'font-semibold text-gray-900' : 'text-gray-600'
              }`}
            >
              {row.label}
            </dt>
            <dd
              className={`text-sm ${
                row.bold ? 'font-bold text-gray-900' : 'font-medium text-gray-900'
              }`}
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <button
          className="text-sm text-green-600 hover:text-green-700 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 rounded"
          onClick={() => {}}
          aria-label="Learn more about how fees work — opens details"
        >
          Learn more about how fees work →
        </button>
      </div>
    </div>
  )
}
