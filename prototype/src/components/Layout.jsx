import React from 'react'
import NavBar from './NavBar'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <NavBar />
      <main className="flex-1" id="main-content">
        {children}
      </main>
    </div>
  )
}
