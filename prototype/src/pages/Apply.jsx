import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import ProgressBar from '../components/ProgressBar'
import Step1Goal from './steps/Step1Goal'
import Step2Business from './steps/Step2Business'
import Step3Revenue from './steps/Step3Revenue'
import Step4Identity from './steps/Step4Identity'
import Step5EligibilityResult from './steps/Step5EligibilityResult'
import Step6Verify from './steps/Step6Verify'
import Step7Review from './steps/Step7Review'

const TOTAL_STEPS = 7

const stepComponents = {
  1: Step1Goal,
  2: Step2Business,
  3: Step3Revenue,
  4: Step4Identity,
  5: Step5EligibilityResult,
  6: Step6Verify,
  7: Step7Review,
}

export default function Apply() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1
    fundingAmount: 30000,
    fundingPurpose: 'Equipment',
    // Step 2
    businessName: "Rosa's Catering Co.",
    businessType: 'Catering / Food Service',
    yearsInOperation: '3–5 years',
    // Step 3
    monthlyRevenue: 18500,
    // Step 4
    fullName: 'Rosa Martinez',
    dateOfBirth: '',
    ssnLast4: '',
    // Step 5 (no input — results)
    // Step 6
    verificationMethod: null, // 'bank' | 'upload'
    bankConnected: false,
    documentsUploaded: false,
  })

  function updateFormData(updates) {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  function goNext() {
    if (step < TOTAL_STEPS) {
      setStep(s => s + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function goBack() {
    if (step > 1) {
      setStep(s => s - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const StepComponent = stepComponents[step]

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      {/* Minimal top bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            to="/"
            className="text-green-600 font-bold text-lg tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 rounded"
            aria-label="Groundwork — go home"
          >
            Groundwork
          </Link>
          <span className="text-sm font-medium text-gray-500" aria-live="polite">
            Step {step} of {TOTAL_STEPS}
          </span>
          <Link
            to="/"
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 rounded"
          >
            Save &amp; exit
          </Link>
        </div>
        <ProgressBar current={step} total={TOTAL_STEPS} />
      </header>

      {/* Step content */}
      <main className="flex-1 flex flex-col" id="main-content">
        <div className="max-w-xl mx-auto w-full px-6 py-10 flex-1 flex flex-col">
          <div className="flex-1">
            <StepComponent
              formData={formData}
              updateFormData={updateFormData}
              onNext={goNext}
              step={step}
            />
          </div>

          {/* Navigation buttons */}
          {step !== 5 && step !== 7 && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
              {step > 1 ? (
                <button
                  onClick={goBack}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 rounded px-2 py-1.5"
                >
                  <ArrowLeft size={16} aria-hidden="true" />
                  Back
                </button>
              ) : (
                <div />
              )}

              {step !== 5 && (
                <button
                  onClick={goNext}
                  className="btn-primary"
                  disabled={step === 6 && !formData.verificationMethod}
                >
                  {step === 6 ? 'Continue' : 'Next →'}
                </button>
              )}
            </div>
          )}

          {/* Step 7 back button */}
          {step === 7 && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={goBack}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 rounded px-2 py-1.5"
              >
                <ArrowLeft size={16} aria-hidden="true" />
                Back
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
