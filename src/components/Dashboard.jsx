import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Crown, CreditCard, MapPin, Settings, LogOut, AlertTriangle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useSubscription } from '../contexts/SubscriptionContext'
import { mockStripe } from '../lib/stripe'
import { dbHelpers } from '../lib/supabase'

const Dashboard = () => {
  const { user, signOut } = useAuth()
  const { subscription, isActive, loadSubscription } = useSubscription()
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    loadProfile()
  }, [user])

  const loadProfile = async () => {
    if (!user) return
    
    try {
      const profileData = await dbHelpers.getUserProfile(user.id)
      setProfile(profileData)
    } catch (error) {
      console.error('Error loading profile:', error)
    }
  }

  const handleSubscribe = async () => {
    setLoading(true)
    try {
      // Mock subscription creation for demo
      await mockStripe.createCheckoutSession()
      
      // Create subscription record
      await dbHelpers.createSubscription({
        user_id: user.id,
        status: 'active',
        current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        stripe_customer_id: 'cus_mock_' + user.id,
        stripe_subscription_id: 'sub_mock_' + user.id
      })

      // Create member card
      const memberId = `REG${Date.now().toString().slice(-6)}`
      await dbHelpers.createMemberCard({
        user_id: user.id,
        member_id: memberId,
        status: 'active',
        issued_at: new Date().toISOString()
      })

      await loadSubscription()
    } catch (error) {
      console.error('Error subscribing:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-registry-black">
      {/* Header */}
      <header className="bg-registry-dark border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Crown className="w-8 h-8 text-gold-500" />
              <span className="text-2xl font-serif font-bold text-white">The Registry</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Welcome, {profile?.full_name || user?.email}</span>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Subscription Status */}
        {!isActive && (
          <div className="glass-panel p-6 mb-8 border-l-4 border-gold-500">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-gold-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Activate Your Membership
                </h3>
                <p className="text-gray-300 mb-4">
                  Subscribe to The Registry for $999/month to unlock your exclusive membership card and access to elite venues.
                </p>
                <button
                  onClick={handleSubscribe}
                  disabled={loading}
                  className="premium-button disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Subscribe Now - $999/month'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Member Card Preview */}
          <div className="lg:col-span-2">
            <div className="glass-panel p-8">
              <h2 className="text-2xl font-serif font-bold text-white mb-6">Your Membership</h2>
              
              {isActive ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-semibold text-white">Status: Active</div>
                      <div className="text-gray-400">
                        Expires: {subscription ? new Date(subscription.current_period_end).toLocaleDateString() : 'N/A'}
                      </div>
                    </div>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  
                  <Link
                    to="/card"
                    className="block holographic-card p-6 rounded-xl hover:scale-105 transition-transform duration-300"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <Crown className="w-8 h-8 text-gold-500" />
                      <div className="text-right">
                        <div className="text-xs text-gray-400">MEMBER</div>
                        <div className="text-sm font-semibold text-white">#001</div>
                      </div>
                    </div>
                    <div className="mt-8">
                      <div className="text-xl font-serif font-semibold text-white">
                        {profile?.full_name || 'Elite Member'}
                      </div>
                      <div className="text-sm text-gray-400">The Registry</div>
                    </div>
                    <div className="mt-4 text-center">
                      <div className="text-sm text-gold-500">Tap to view full card</div>
                    </div>
                  </Link>
                </div>
              ) : (
                <div className="text-center py-12">
                  <CreditCard className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No Active Membership</h3>
                  <p className="text-gray-400">Subscribe to unlock your exclusive membership card</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="glass-panel p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/card"
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'hover:bg-white/10 text-white' 
                      : 'text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span>View Member Card</span>
                </Link>
                
                <button
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors w-full text-left ${
                    isActive 
                      ? 'hover:bg-white/10 text-white' 
                      : 'text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!isActive}
                >
                  <MapPin className="w-5 h-5" />
                  <span>Exclusive Locations</span>
                </button>
                
                <button className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors text-white w-full text-left">
                  <Settings className="w-5 h-5" />
                  <span>Account Settings</span>
                </button>
              </div>
            </div>

            {/* Membership Stats */}
            {isActive && (
              <div className="glass-panel p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Membership Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Member Since</span>
                    <span className="text-white">
                      {subscription ? new Date(subscription.created_at).toLocaleDateString() : 'Today'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Locations Visited</span>
                    <span className="text-white">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Events Attended</span>
                    <span className="text-white">0</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard