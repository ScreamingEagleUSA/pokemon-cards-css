import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import { dbHelpers } from '../lib/supabase'

const SubscriptionContext = createContext({})

export const useSubscription = () => {
  const context = useContext(SubscriptionContext)
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider')
  }
  return context
}

export const SubscriptionProvider = ({ children }) => {
  const { user } = useAuth()
  const [subscription, setSubscription] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      loadSubscription()
    } else {
      setSubscription(null)
    }
  }, [user])

  const loadSubscription = async () => {
    if (!user) return
    
    setLoading(true)
    try {
      const sub = await dbHelpers.getSubscription(user.id)
      setSubscription(sub)
    } catch (error) {
      console.error('Error loading subscription:', error)
    } finally {
      setLoading(false)
    }
  }

  const isActive = subscription?.status === 'active' && 
    new Date(subscription.current_period_end) > new Date()

  const value = {
    subscription,
    loading,
    isActive,
    loadSubscription
  }

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  )
}