import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Crown, ArrowLeft, Download, Share2, QrCode } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useSubscription } from '../contexts/SubscriptionContext'
import { dbHelpers } from '../lib/supabase'
import { generateMemberQR } from '../lib/qrcode'

const MemberCard = () => {
  const { user } = useAuth()
  const { isActive } = useSubscription()
  const [memberCard, setMemberCard] = useState(null)
  const [qrCode, setQrCode] = useState('')
  const [profile, setProfile] = useState(null)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const cardRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isActive) {
      navigate('/dashboard')
      return
    }
    
    loadMemberCard()
    loadProfile()
  }, [user, isActive])

  const loadMemberCard = async () => {
    if (!user) return
    
    try {
      const card = await dbHelpers.getMemberCard(user.id)
      setMemberCard(card)
      
      if (card) {
        const qr = await generateMemberQR(card.member_id)
        setQrCode(qr)
      }
    } catch (error) {
      console.error('Error loading member card:', error)
    }
  }

  const loadProfile = async () => {
    if (!user) return
    
    try {
      const profileData = await dbHelpers.getUserProfile(user.id)
      setProfile(profileData)
    } catch (error) {
      console.error('Error loading profile:', error)
    }
  }

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    
    setMousePosition({ x, y })
  }

  const handleShare = async () => {
    if (navigator.share && memberCard) {
      try {
        await navigator.share({
          title: 'The Registry - Member Verification',
          text: 'Verify my Registry membership',
          url: `${window.location.origin}/verify/${memberCard.member_id}`
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    }
  }

  if (!memberCard) {
    return (
      <div className="min-h-screen bg-registry-black flex items-center justify-center">
        <div className="text-center">
          <Crown className="w-16 h-16 text-gold-500 mx-auto mb-4 animate-spin" />
          <div className="text-white">Loading your membership card...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-registry-black">
      {/* Header */}
      <header className="bg-registry-dark border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link 
              to="/dashboard"
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </Link>
            
            <div className="flex-1 text-center">
              <h1 className="text-2xl font-serif font-bold text-white">Your Membership Card</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        {/* Member Card */}
        <div className="flex justify-center mb-12">
          <div 
            ref={cardRef}
            className="relative w-96 h-64 holographic-card rounded-2xl p-8 cursor-pointer transform hover:scale-105 transition-all duration-500"
            onMouseMove={handleMouseMove}
            style={{
              '--mouse-x': `${mousePosition.x}%`,
              '--mouse-y': `${mousePosition.y}%`
            }}
          >
            {/* Card Background Effects */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(245, 158, 11, 0.3) 0%, transparent 50%)`
                }}
              />
            </div>

            {/* Card Content */}
            <div className="relative z-10 h-full flex flex-col">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <Crown className="w-10 h-10 text-gold-500" />
                <div className="text-right">
                  <div className="text-xs text-gray-400 font-medium">MEMBER</div>
                  <div className="text-lg font-bold text-white">#{memberCard.member_id}</div>
                </div>
              </div>

              {/* Member Info */}
              <div className="flex-1 flex flex-col justify-end">
                <div className="mb-4">
                  <div className="text-2xl font-serif font-bold text-white mb-1">
                    {profile?.full_name || 'Elite Member'}
                  </div>
                  <div className="text-sm text-gray-300">The Registry</div>
                </div>

                {/* Status */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-400 font-medium">ACTIVE</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    Since {new Date(memberCard.issued_at).getFullYear()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card Actions */}
        <div className="flex justify-center space-x-4 mb-12">
          <button
            onClick={handleShare}
            className="flex items-center space-x-2 glass-panel px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
          >
            <Share2 className="w-5 h-5 text-gold-500" />
            <span className="text-white">Share</span>
          </button>
          
          <button className="flex items-center space-x-2 glass-panel px-6 py-3 rounded-lg hover:bg-white/10 transition-colors">
            <Download className="w-5 h-5 text-gold-500" />
            <span className="text-white">Download</span>
          </button>
        </div>

        {/* QR Code Section */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-panel p-8">
            <h3 className="text-xl font-serif font-bold text-white mb-6">Verification QR Code</h3>
            <div className="text-center">
              {qrCode && (
                <div className="inline-block p-4 bg-white rounded-xl mb-4">
                  <img src={qrCode} alt="Member verification QR code" className="w-32 h-32" />
                </div>
              )}
              <p className="text-gray-400 text-sm">
                Scan this QR code to verify your membership status publicly
              </p>
            </div>
          </div>

          <div className="glass-panel p-8">
            <h3 className="text-xl font-serif font-bold text-white mb-6">Membership Details</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Member ID</span>
                <span className="text-white font-mono">{memberCard.member_id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Status</span>
                <span className="text-green-400">Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Issued</span>
                <span className="text-white">
                  {new Date(memberCard.issued_at).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Verification URL</span>
                <a 
                  href={`/verify/${memberCard.member_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-500 hover:text-gold-400 transition-colors text-sm"
                >
                  View Public Page
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 glass-panel p-6 border-l-4 border-gold-500">
          <div className="flex items-start space-x-3">
            <QrCode className="w-6 h-6 text-gold-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Security & Anti-Fraud</h4>
              <p className="text-gray-300 text-sm">
                Your membership card is cryptographically secured and tied to your authenticated account. 
                The QR code links to a public verification page that confirms your active membership status. 
                Expired or fraudulent cards will fail verification.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemberCard