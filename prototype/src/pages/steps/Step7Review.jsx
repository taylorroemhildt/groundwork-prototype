import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Edit2, Building2, FileText, Check } from 'lucide-react'
import { formatCurrency } from '../../lib/utils'

function ReviewSection({ title, items, onEdit, stepNumber }) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 bg-gray-50 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        <button
          onClick={() => onEdit(stepNumber)}
          className="flex items-center gap-1.5 text-xs font-medium text-green-600 hover:text-green-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 rounded px-2 py-1"
          aria-label={`Edit ${title}`}
        >
          <Edit2 size={12} aria-hidden="true" />
          Edit
        </button>
      </div>
      <dl className="px-5 py-3">
        {items.map((item, i) => (
          <div
            key={item.label}
            className={`flex justify-between py-2.5 ${i < items.length - 1 ? 'border-b border-gray-50' : ''}`}
          >
            <dt className="text-sm text-gray-500">{item.label}</dt>
            <dd className="text-sm font-medium text-gray-900 text-right">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export default function Step7Review({ formData, onNext }) {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleEdit(stepNumber) {
    // Navigate back to specific step — simplified: just signal parent
    // In real app would setStep(stepNumber), for now no-op
  }

  function handleSubmit() {
    setIsSubmitting(true)
    setTimeout(() => {
      navigate('/tracker')
    }, 1200)
  }

  const sections = [
    {
      title: 'Funding goal',
      step: 1,
      items: [
        { label: 'Amount requested', value: formatCurrency(formData.fundingAmount) },
        { label: 'Purpose', value: formData.fundingPurpose },
      ],
    },
    {
      title: 'Business details',
      step: 2,
      items: [
        { label: 'Business name', value: formData.businessName },
        { label: 'Business type', value: formData.businessType },
        { label: 'Years in operation', value: formData.yearsInOperation },
      ],
    },
    {
      title: 'Revenue',
      step: 3,
      items: [
        { label: 'Avg. monthly revenue', value: formatCurrency(formData.monthlyRevenue) },
        { label: 'Annual estimate', value: formatCurrency(formData.monthlyRevenue * 12) },
      ],
    },
    {
      title: 'Your identity',
      step: 4,
      items: [
        { label: 'Full name', value: formData.fullName },
        { label: 'SSN (last 4)', value: formData.ssnLast4 ? `●●●-●●-${formData.ssnLast4}` : '●●●-●●-——' },
      ],
    },
    {
      title: 'Verification',
      step: 6,
      items: [
        {
          label: 'Method',
          value: formData.bankConnected
            ? `Bank connected (${formData.connectedBank || 'Chase'})`
            : formData.documentsUploaded
            ? 'Statements uploaded'
            : 'Not completed',
        },
      ],
    },
  ]

  return (
    <div className="fade-in">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Review your application
      </h1>
      <p className="text-gray-500 mb-6">
        Everything look right? Take a moment to review before you submit.
      </p>

      <div className="space-y-3 mb-6">
        {sections.map(section => (
          <ReviewSection
            key={section.title}
            title={section.title}
            items={section.items}
            onEdit={handleEdit}
            stepNumber={section.step}
          />
        ))}
      </div>

      {/* Submit */}
      <div className="space-y-4">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="btn-primary w-full flex items-center justify-center gap-2 text-base py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
          aria-busy={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
              Submitting your application…
            </>
          ) : (
            <>
              Submit application
              <Check size={16} aria-hidden="true" />
            </>
          )}
        </button>

        <p className="text-xs text-gray-400 text-center leading-relaxed">
          By submitting, you agree to a soft credit check. This won't affect your score.
          We'll review your application and get back to you within 1–2 business days.
        </p>
      </div>
    </div>
  )
}
