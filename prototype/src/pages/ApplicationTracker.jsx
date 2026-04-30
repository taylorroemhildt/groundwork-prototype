import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, FileText, MessageCircle, Upload, CheckCircle, AlertCircle } from 'lucide-react'
import ApplicationTimeline from '../components/ApplicationTimeline'
import ContactDrawer from '../components/ContactDrawer'
import { cn } from '../lib/utils'

function DocumentBanner({ onUpload }) {
  const [uploaded, setUploaded] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const inputRef = React.useRef(null)

  function handleFile(e) {
    const file = e.target.files[0]
    if (!file) return
    setIsUploading(true)
    setTimeout(() => {
      setIsUploading(false)
      setUploaded(true)
      onUpload && onUpload()
    }, 1400)
  }

  if (uploaded) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-5 py-4 fade-in"
      >
        <CheckCircle size={20} className="text-green-600 flex-shrink-0" aria-hidden="true" />
        <div>
          <div className="text-sm font-semibold text-green-800">Document received</div>
          <div className="text-sm text-green-700 mt-0.5">
            Your tax return is under review — we'll be in touch soon.
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="border-2 border-green-600 bg-green-50 rounded-xl p-5 fade-in">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
          <AlertCircle size={18} className="text-green-700" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-green-900">
            Action needed: We need one more document from you
          </h2>
          <p className="text-sm text-green-800 mt-1">
            Please upload your most recent business tax return (2024 or 2023).
          </p>
        </div>
      </div>

      <div className="ml-12">
        <input
          ref={inputRef}
          type="file"
          id="tax-return-upload"
          className="sr-only"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFile}
          aria-label="Upload business tax return"
        />
        <button
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          className="flex items-center gap-2 btn-primary text-sm py-2.5 px-4 disabled:opacity-60"
          aria-busy={isUploading}
        >
          {isUploading ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
              Uploading…
            </>
          ) : (
            <>
              <Upload size={14} aria-hidden="true" />
              Upload tax return
            </>
          )}
        </button>

        <p className="text-xs text-green-700 mt-2 opacity-80">
          Why we need this: Tax returns help us verify your annual revenue.
        </p>
      </div>
    </div>
  )
}

const documents = [
  { label: '3 months bank statements', status: 'complete' },
  { label: 'Business information', status: 'complete' },
  { label: 'Business tax return', status: 'needed' },
]

export default function ApplicationTracker() {
  const navigate = useNavigate()
  const [trackerState, setTrackerState] = useState('document_needed') // 'document_needed' | 'under_review'
  const [showContactDrawer, setShowContactDrawer] = useState(false)
  const [docUploaded, setDocUploaded] = useState(false)

  function handleDocumentUploaded() {
    setDocUploaded(true)
    setTimeout(() => setTrackerState('under_review'), 1500)
  }

  function toggleState() {
    setTrackerState(s => s === 'document_needed' ? 'under_review' : 'document_needed')
  }

  const isDocumentNeeded = trackerState === 'document_needed'

  const updatedDocs = documents.map(d =>
    d.status === 'needed' && docUploaded ? { ...d, status: 'complete' } : d
  )

  return (
    <div className="max-w-[760px] mx-auto px-6 py-8">
      {/* Page header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Application Status</h1>
          <p className="text-sm text-gray-500 mt-1">
            Application submitted April 28, 2026 · Reference #GW-2026-4821
          </p>
        </div>

        {/* Demo toggle */}
        <button
          onClick={toggleState}
          className="text-xs text-gray-400 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
          aria-label={`Switch to ${isDocumentNeeded ? 'Under Review' : 'Document Needed'} state (demo)`}
        >
          Switch to: {isDocumentNeeded ? 'Under Review' : 'Document Needed'}
        </button>
      </div>

      <div className="space-y-5">
        {/* Action banner (document needed) */}
        {isDocumentNeeded && !docUploaded && (
          <DocumentBanner onUpload={handleDocumentUploaded} />
        )}

        {docUploaded && trackerState === 'document_needed' && (
          <div role="status" aria-live="polite" className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-5 py-4 fade-in">
            <CheckCircle size={20} className="text-green-600 flex-shrink-0" aria-hidden="true" />
            <div className="text-sm font-semibold text-green-800">Document received — switching to review…</div>
          </div>
        )}

        {/* Under review card */}
        {trackerState === 'under_review' && (
          <div className="card bg-green-50 border-green-200 fade-in">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                <FileText size={18} className="text-green-700" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <h2 className="text-sm font-bold text-green-900">
                  We're reviewing your application
                </h2>
                <p className="text-sm text-green-800 mt-1">
                  Everything looks good so far. We'll email you when we have an update — usually
                  within 1–2 business days.
                </p>
              </div>
            </div>

            {/* Demo helper */}
            <div className="mt-4 pt-4 border-t border-green-200">
              <button
                onClick={() => navigate('/offer')}
                className="text-sm text-green-700 font-medium hover:text-green-800 underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 rounded"
              >
                View my offer (demo) →
              </button>
            </div>
          </div>
        )}

        {/* Timeline */}
        <ApplicationTimeline />

        {/* Documents submitted */}
        <div className="card">
          <h2 className="text-base font-semibold text-gray-900 mb-4">
            Documents submitted
          </h2>
          <ul className="space-y-3" aria-label="Document checklist">
            {updatedDocs.map(doc => (
              <li
                key={doc.label}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0',
                      doc.status === 'complete'
                        ? 'bg-green-600'
                        : 'bg-amber-50 border-2 border-amber-400'
                    )}
                    aria-hidden="true"
                  >
                    {doc.status === 'complete' && (
                      <Check size={11} className="text-white" />
                    )}
                  </div>
                  <span
                    className={cn(
                      'text-sm',
                      doc.status === 'complete' ? 'text-gray-900' : 'text-gray-700'
                    )}
                  >
                    {doc.label}
                  </span>
                </div>
                <span
                  className={cn(
                    'text-xs font-medium',
                    doc.status === 'complete' ? 'text-green-600' : 'text-amber-600'
                  )}
                  aria-label={doc.status === 'complete' ? 'Received' : 'Action needed'}
                >
                  {doc.status === 'complete' ? 'Received ✓' : 'Needed'}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact link */}
        <div className="text-center py-2">
          <button
            onClick={() => setShowContactDrawer(true)}
            className="inline-flex items-center gap-1.5 text-sm text-green-600 font-medium hover:text-green-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 rounded"
          >
            <MessageCircle size={14} aria-hidden="true" />
            Have questions? Talk to someone →
          </button>
        </div>
      </div>

      <ContactDrawer
        isOpen={showContactDrawer}
        onClose={() => setShowContactDrawer(false)}
      />
    </div>
  )
}
