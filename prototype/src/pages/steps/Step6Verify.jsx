import React, { useState } from 'react'
import { Building2, FileText, X, Check, Loader2 } from 'lucide-react'
import DocumentUpload from '../../components/DocumentUpload'
import { cn } from '../../lib/utils'

const banks = [
  { id: 'chase', name: 'Chase', abbr: 'CH', color: 'bg-blue-600' },
  { id: 'bofa', name: 'Bank of America', abbr: 'BA', color: 'bg-red-600' },
  { id: 'wells', name: 'Wells Fargo', abbr: 'WF', color: 'bg-amber-600' },
  { id: 'other', name: 'Other bank', abbr: '···', color: 'bg-gray-500' },
]

function PlaidModal({ onClose, onConnected }) {
  const [phase, setPhase] = useState('select') // 'select' | 'connecting' | 'connected'
  const [selectedBank, setSelectedBank] = useState(null)

  function handleSelectBank(bank) {
    setSelectedBank(bank)
    setPhase('connecting')
    setTimeout(() => setPhase('connected'), 1800)
    setTimeout(() => {
      onConnected(bank)
      onClose()
    }, 3200)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" role="dialog" aria-modal="true" aria-label="Connect your bank account">
      <div className="absolute inset-0 bg-black/50 fade-in" onClick={onClose} aria-hidden="true" />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
          aria-label="Close bank connection modal"
        >
          <X size={16} aria-hidden="true" />
        </button>

        {phase === 'select' && (
          <>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                <Building2 size={16} className="text-gray-600" aria-hidden="true" />
              </div>
              <h2 className="text-base font-semibold text-gray-900">Select your bank</h2>
            </div>
            <p className="text-sm text-gray-500 mb-5">
              We use 256-bit encryption. We can only read — never write — to your account.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {banks.map(bank => (
                <button
                  key={bank.id}
                  onClick={() => handleSelectBank(bank)}
                  className="flex flex-col items-center gap-2.5 p-4 border border-gray-200 rounded-xl hover:border-green-600 hover:bg-green-50 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
                >
                  <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold', bank.color)} aria-hidden="true">
                    {bank.abbr}
                  </div>
                  <span className="text-xs font-medium text-gray-700 text-center">{bank.name}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {phase === 'connecting' && (
          <div className="flex flex-col items-center justify-center py-8 gap-4 text-center">
            <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-bold', selectedBank?.color)} aria-hidden="true">
              {selectedBank?.abbr}
            </div>
            <div>
              <div className="text-base font-semibold text-gray-900 mb-1">
                Connecting to {selectedBank?.name}…
              </div>
              <p className="text-sm text-gray-500">Securely reading the last 3 months of transactions</p>
            </div>
            <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin" aria-label="Loading" />
          </div>
        )}

        {phase === 'connected' && (
          <div className="flex flex-col items-center justify-center py-8 gap-4 text-center fade-in">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
              <Check size={28} className="text-green-600" aria-hidden="true" />
            </div>
            <div>
              <div className="text-base font-semibold text-gray-900 mb-1">
                Connected!
              </div>
              <div className="text-sm font-medium text-green-600">
                {selectedBank?.name} Business Checking ✓
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Step6Verify({ formData, updateFormData }) {
  const [showPlaid, setShowPlaid] = useState(false)

  function handleBankConnected(bank) {
    updateFormData({ verificationMethod: 'bank', bankConnected: true, connectedBank: bank.name })
  }

  function handleDocumentUploaded() {
    updateFormData({ verificationMethod: 'upload', documentsUploaded: true })
  }

  const isVerified = formData.verificationMethod !== null

  return (
    <div className="fade-in">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Verify your business
      </h1>
      <p className="text-gray-500 mb-8">
        This helps us confirm your cash flow and finalize your offer.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Bank connection card */}
        <div
          className={cn(
            'card border-2 transition-all duration-150',
            formData.verificationMethod === 'bank'
              ? 'border-green-600 bg-green-50'
              : 'border-transparent hover:border-gray-200'
          )}
        >
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0" aria-hidden="true">
              <Building2 size={20} className="text-blue-600" />
            </div>
            <div>
              <div className="font-semibold text-gray-900 text-sm">
                Connect your bank
              </div>
              <div className="text-xs text-green-600 font-medium mt-0.5">Fastest option</div>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            We securely read your last 3 months of transactions to verify cash flow. Takes about
            30 seconds.
          </p>

          {formData.bankConnected ? (
            <div className="flex items-center gap-2 text-sm text-green-700 font-medium bg-green-100 rounded-lg px-3 py-2">
              <Check size={14} aria-hidden="true" />
              {formData.connectedBank} connected
            </div>
          ) : (
            <button
              onClick={() => setShowPlaid(true)}
              className="btn-primary w-full text-sm py-2.5"
            >
              Connect bank
            </button>
          )}
        </div>

        {/* Upload card */}
        <div
          className={cn(
            'card border-2 transition-all duration-150',
            formData.verificationMethod === 'upload'
              ? 'border-green-600 bg-green-50'
              : 'border-transparent hover:border-gray-200'
          )}
        >
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0" aria-hidden="true">
              <FileText size={20} className="text-purple-600" />
            </div>
            <div>
              <div className="font-semibold text-gray-900 text-sm">
                Upload statements
              </div>
              <div className="text-xs text-gray-400 font-medium mt-0.5">Manual option</div>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Upload 3 months of bank statements as PDFs — we'll review them within 1 business day.
          </p>

          <DocumentUpload
            label={null}
            compact={true}
            onUpload={handleDocumentUploaded}
          />
        </div>
      </div>

      {!isVerified && (
        <p className="text-xs text-gray-400 text-center mt-4">
          Choose one option to continue.
        </p>
      )}

      {showPlaid && (
        <PlaidModal
          onClose={() => setShowPlaid(false)}
          onConnected={handleBankConnected}
        />
      )}
    </div>
  )
}
