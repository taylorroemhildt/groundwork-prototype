import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../App'
import { Eye, EyeOff } from 'lucide-react'

export default function SignIn() {
  const { signIn } = useApp()
  const navigate = useNavigate()
  const [email, setEmail] = useState('rosa@rosascatering.com')
  const [password, setPassword] = useState('••••••••••')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!email.trim()) {
      setError('Please enter your email address.')
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      signIn()
      navigate('/dashboard')
    }, 700)
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-[440px]">
        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          {/* Logo */}
          <div className="mb-8 text-center">
            <div
              className="text-2xl font-bold text-green-600 tracking-tight"
              aria-label="Groundwork"
            >
              Groundwork
            </div>
            <div className="text-xs text-gray-400 mt-1 font-medium tracking-wide uppercase">
              Working Capital
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Welcome back.
          </h1>
          <p className="text-sm text-gray-500 mb-7">
            Sign in to manage your loan and account.
          </p>

          {/* Error */}
          {error && (
            <div
              role="alert"
              className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="label-base">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="input-base"
                autoComplete="email"
                required
                aria-required="true"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="label-base mb-0">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs text-green-600 hover:text-green-700 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 rounded"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="input-base pr-10"
                  autoComplete="current-password"
                  required
                  aria-required="true"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 rounded"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full mt-2 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              aria-busy={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                  Signing in…
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>
        </div>

        {/* Footer link */}
        <p className="text-center text-sm text-gray-500 mt-5">
          New to Groundwork?{' '}
          <Link
            to="/apply"
            className="text-green-600 font-medium hover:text-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 rounded"
          >
            Apply for a loan →
          </Link>
        </p>
      </div>
    </div>
  )
}
