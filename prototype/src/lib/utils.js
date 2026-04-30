import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatCurrencyWithCents(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// Generate repayment schedule from start date
export function generateRepaymentSchedule(startDate, totalPayments, monthlyPayment, principal, totalRepay) {
  const schedule = []
  const start = new Date(startDate)
  let balance = totalRepay

  for (let i = 1; i <= totalPayments; i++) {
    const dueDate = new Date(start)
    dueDate.setMonth(dueDate.getMonth() + i)
    balance = Math.max(0, balance - monthlyPayment)

    schedule.push({
      payment: i,
      dueDate: dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      amount: monthlyPayment,
      balanceAfter: balance,
    })
  }

  return schedule
}
