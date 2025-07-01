import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_key')

export const stripe = {
  async createCheckoutSession(priceId, userId) {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          userId,
          successUrl: `${window.location.origin}/dashboard?success=true`,
          cancelUrl: `${window.location.origin}/dashboard?canceled=true`,
        }),
      })

      const session = await response.json()
      
      if (session.error) {
        throw new Error(session.error)
      }

      const stripeInstance = await stripePromise
      const { error } = await stripeInstance.redirectToCheckout({
        sessionId: session.id,
      })

      if (error) {
        throw error
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
      throw error
    }
  },

  async createPortalSession(customerId) {
    try {
      const response = await fetch('/api/create-portal-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customerId }),
      })

      const session = await response.json()
      
      if (session.error) {
        throw new Error(session.error)
      }

      window.location.href = session.url
    } catch (error) {
      console.error('Error creating portal session:', error)
      throw error
    }
  }
}

// Mock implementation for demo purposes
export const mockStripe = {
  async createCheckoutSession() {
    // Simulate payment success
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true })
      }, 2000)
    })
  }
}