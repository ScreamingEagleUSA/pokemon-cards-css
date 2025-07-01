import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from './lib/supabase'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { SubscriptionProvider } from './contexts/SubscriptionContext'

// Components
import LandingPage from './components/LandingPage'
import AuthPage from './components/AuthPage'
import Dashboard from './components/Dashboard'
import MemberCard from './components/MemberCard'
import AdminDashboard from './components/AdminDashboard'
import VerificationPage from './components/VerificationPage'
import LoadingSpinner from './components/LoadingSpinner'

function AppRoutes() {
  const { user, loading } = useAuth()
  
  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/dashboard" />} />
      <Route path="/verify/:memberId" element={<VerificationPage />} />
      
      {/* Protected Routes */}
      <Route 
        path="/dashboard" 
        element={user ? <Dashboard /> : <Navigate to="/auth" />} 
      />
      <Route 
        path="/card" 
        element={user ? <MemberCard /> : <Navigate to="/auth" />} 
      />
      <Route 
        path="/admin" 
        element={user ? <AdminDashboard /> : <Navigate to="/auth" />} 
      />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <SubscriptionProvider>
        <div className="min-h-screen bg-registry-black">
          <AppRoutes />
        </div>
      </SubscriptionProvider>
    </AuthProvider>
  )
}

export default App