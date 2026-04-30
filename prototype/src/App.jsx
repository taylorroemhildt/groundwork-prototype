import React, { createContext, useContext, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import LoanDetails from './pages/LoanDetails'
import Apply from './pages/Apply'
import ApplicationTracker from './pages/ApplicationTracker'
import OfferReview from './pages/OfferReview'

// App-wide state context
export const AppContext = createContext(null)

export function useApp() {
  return useContext(AppContext)
}

const initialState = {
  isAuthenticated: false,
  user: {
    name: 'Rosa Martinez',
    businessName: "Rosa's Catering Co.",
    initials: 'RM',
  },
  loan: {
    amount: 35000,
    remaining: 21750,
    nextPayment: { amount: 2236, daysUntil: 8 },
    totalPayments: 18,
    paidPayments: 7,
    percentPaid: 39,
    startDate: 'Sep 15, 2025',
    endDate: 'Mar 15, 2027',
    totalRepay: 40250,
    monthlyPayment: 2236,
    totalPaid: 13250,
    fees: 5250,
    status: 'active',
  },
  applicationStep: 1,
  applicationStatus: 'not_started',
}

export default function App() {
  const [appState, setAppState] = useState(initialState)

  function signIn() {
    setAppState(s => ({ ...s, isAuthenticated: true }))
  }

  function signOut() {
    setAppState(s => ({ ...s, isAuthenticated: false }))
  }

  function updateAppState(updates) {
    setAppState(s => ({ ...s, ...updates }))
  }

  const contextValue = {
    ...appState,
    signIn,
    signOut,
    updateAppState,
  }

  return (
    <AppContext.Provider value={contextValue}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/apply" element={<Apply />} />
          <Route
            path="/dashboard"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/loan-details"
            element={
              <Layout>
                <LoanDetails />
              </Layout>
            }
          />
          <Route
            path="/tracker"
            element={
              <Layout>
                <ApplicationTracker />
              </Layout>
            }
          />
          <Route
            path="/offer"
            element={
              <Layout>
                <OfferReview />
              </Layout>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  )
}
