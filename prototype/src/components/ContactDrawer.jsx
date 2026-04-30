import React, { useState, useEffect, useRef } from 'react'
import { X, CheckCircle, MessageCircle } from 'lucide-react'
import { useApp } from '../App'

export default function ContactDrawer({ isOpen, onClose }) {
  const { user } = useApp()
  const [name, setName] = useState(user.name)
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const closeRef = useRef(null)
  const firstInputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => firstInputRef.current?.focus(), 100)
    } else {
      setSent(false)
    }
  }, [isOpen])

  // Trap focus and handle Escape
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
    setTimeout(onClose, 2000)
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 fade-in"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Contact support"
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-xl z-50 flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
              <MessageCircle size={16} className="text-green-600" aria-hidden="true" />
            </div>
            <h2 className="text-base font-semibold text-gray-900">Talk to someone</h2>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
            aria-label="Close contact drawer"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {sent ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 fade-in">
              <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
                <CheckCircle size={28} className="text-green-600" aria-hidden="true" />
              </div>
              <div>
                <div className="text-lg font-semibold text-gray-900">Message sent!</div>
                <p className="text-sm text-gray-500 mt-1">
                  Your advisor will get back to you within one business day.
                </p>
              </div>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-600 mb-6">
                Have a question about your loan or application? Send us a message and your dedicated advisor will follow up.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="contact-name" className="label-base">
                    Your name
                  </label>
                  <input
                    ref={firstInputRef}
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="input-base"
                    required
                    autoComplete="name"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="label-base">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    rows={5}
                    className="input-base resize-none"
                    placeholder="What's on your mind?"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full"
                  disabled={!message.trim()}
                >
                  Send message
                </button>
              </form>

              <div className="mt-6 pt-5 border-t border-gray-100">
                <p className="text-xs text-gray-400 text-center">
                  Or call us at{' '}
                  <a
                    href="tel:+18005551234"
                    className="text-green-600 font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-1 rounded"
                  >
                    (800) 555-1234
                  </a>{' '}
                  · Mon–Fri 8am–6pm PT
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
