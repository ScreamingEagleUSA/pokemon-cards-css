import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Crown, CheckCircle, XCircle, AlertTriangle, Calendar, User } from 'lucide-react'
import { dbHelpers } from '../lib/supabase'

const VerificationPage = () => {
  const { memberId } = useParams()
  const [member, setMember] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    verifyMember()
  }, [memberId])

  const verifyMember = async () => {
    setLoading(true)
    setError('')

    try {
      const memberData = await dbHelpers.verifyMember(memberId)
      setMember(memberData)
    } catch (error) {
      console.error('Error verifying member:', error)
      setError('Member not found or verification failed')
    } finally {
      setLoading(false)
    }
  }

  const isActive = member?.subscriptions?.status === 'active' && 
    new Date(member.subscriptions.current_period_end) > new Date()

  if (loading) {
    return (
      <div className="min-h-screen bg-registry-black flex items-center justify-center">
        <div className="text-center">
          <Crown className="w-16 h-16 text-gold-500 mx-auto mb-4 animate-spin" />
          <div className="text-white">Verifying membership...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-registry-black">
      {/* Header */}
      <header className="bg-registry-dark border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="text-center">
            <Link to="/" className="inline-flex items-center space-x-2 mb-4">
              <Crown className="w-8 h-8 text-gold-500" />
              <span className="text-2xl font-serif font-bold text-white">The Registry</span>
            </Link>
            <h1 className="text-3xl font-serif font-bold text-white">Membership Verification</h1>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 lg:px-8 py-12">
        {error ? (
          /* Error State */
          <div className="glass-panel p-8 text-center">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Verification Failed</h2>
            <p className="text-gray-400 mb-6">{error}</p>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <p className="text-red-400 text-sm">
                This membership ID could not be verified. The member may not exist, 
                or their membership may have expired.
              </p>
            </div>
          </div>
        ) : (
          /* Success State */
          <div className="space-y-8">
            {/* Verification Status */}
            <div className="glass-panel p-8 text-center">
              {isActive ? (
                <>
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-white mb-2">Verified Member</h2>
                  <p className="text-green-400 font-semibold">Active Membership Confirmed</p>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-white mb-2">Membership Expired</h2>
                  <p className="text-yellow-400 font-semibold">This membership is no longer active</p>
                </>
              )}
            </div>

            {/* Member Information */}
            <div className="glass-panel p-8">
              <h3 className="text-xl font-serif font-bold text-white mb-6">Member Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-700">
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-400">Member Name</span>
                  </div>
                  <span className="text-white font-semibold">
                    {member.profiles?.full_name || 'Elite Member'}
                  </span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-700">
                  <div className="flex items-center space-x-3">
                    <Crown className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-400">Member ID</span>
                  </div>
                  <span className="text-white font-mono">{member.member_id}</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-700">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-400">Member Since</span>
                  </div>
                  <span className="text-white">
                    {new Date(member.issued_at).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
                    <span className="text-gray-400">Status</span>
                  </div>
                  <span className={`font-semibold ${isActive ? 'text-green-400' : 'text-gray-400'}`}>
                    {isActive ? 'Active' : 'Expired'}
                  </span>
                </div>

                {member.subscriptions?.current_period_end && (
                  <div className="flex items-center justify-between py-3">
                    <span className="text-gray-400">
                      {isActive ? 'Expires' : 'Expired'}
                    </span>
                    <span className="text-white">
                      {new Date(member.subscriptions.current_period_end).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Security Information */}
            <div className="glass-panel p-6 border-l-4 border-gold-500">
              <h4 className="text-lg font-semibold text-white mb-3">Verification Details</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <p>• This verification is cryptographically secured and tamper-proof</p>
                <p>• Membership status is checked in real-time against our secure database</p>
                <p>• Only active, paid memberships will show as verified</p>
                <p>• Verification timestamp: {new Date().toLocaleString()}</p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <Link 
                to="/" 
                className="premium-button inline-block"
              >
                Learn About The Registry
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-registry-dark border-t border-gray-800 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Crown className="w-6 h-6 text-gold-500" />
            <span className="text-xl font-serif font-bold text-white">The Registry</span>
          </div>
          <p className="text-gray-400 text-sm">
            Secure membership verification system. All verifications are logged and monitored.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default VerificationPage