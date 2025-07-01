import React from 'react'
import { Link } from 'react-router-dom'
import { Crown, Shield, MapPin, Users } from 'lucide-react'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-registry-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-900/20 via-registry-black to-registry-black"></div>
        
        <nav className="relative z-10 flex justify-between items-center p-6 lg:p-8">
          <div className="flex items-center space-x-2">
            <Crown className="w-8 h-8 text-gold-500" />
            <span className="text-2xl font-serif font-bold">The Registry</span>
          </div>
          <Link 
            to="/auth" 
            className="premium-button"
          >
            Join Now
          </Link>
        </nav>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            <h1 className="text-5xl lg:text-7xl font-serif font-bold mb-8 bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
              The Registry
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              An exclusive membership for the discerning elite. Access to the world's most 
              prestigious venues, events, and experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <div className="text-center">
                <div className="text-4xl font-serif font-bold text-gold-500">$999</div>
                <div className="text-gray-400">per month</div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-gray-600"></div>
              <div className="text-center">
                <div className="text-4xl font-serif font-bold text-white">∞</div>
                <div className="text-gray-400">possibilities</div>
              </div>
            </div>

            <Link 
              to="/auth" 
              className="inline-block premium-button text-lg px-12 py-4"
            >
              Begin Your Journey
            </Link>
          </div>
        </div>

        {/* Floating holographic card preview */}
        <div className="absolute top-1/2 right-10 transform -translate-y-1/2 hidden xl:block">
          <div className="holographic-card w-64 h-40 rounded-xl p-6 animate-float">
            <div className="flex justify-between items-start mb-4">
              <Crown className="w-8 h-8 text-gold-500" />
              <div className="text-right">
                <div className="text-xs text-gray-400">MEMBER</div>
                <div className="text-sm font-semibold">#001</div>
              </div>
            </div>
            <div className="mt-auto">
              <div className="text-lg font-serif font-semibold">Elite Member</div>
              <div className="text-xs text-gray-400">The Registry</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-registry-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">Exclusive Benefits</h2>
            <p className="text-xl text-gray-400">What your membership unlocks</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="glass-panel p-8 text-center group hover:bg-white/10 transition-all duration-300">
              <Crown className="w-12 h-12 text-gold-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-3">Digital Membership Card</h3>
              <p className="text-gray-400">Holographic digital card with secure QR verification</p>
            </div>

            <div className="glass-panel p-8 text-center group hover:bg-white/10 transition-all duration-300">
              <MapPin className="w-12 h-12 text-gold-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-3">Exclusive Locations</h3>
              <p className="text-gray-400">Access to secret lounges, clubs, and private events</p>
            </div>

            <div className="glass-panel p-8 text-center group hover:bg-white/10 transition-all duration-300">
              <Shield className="w-12 h-12 text-gold-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-3">Verified Status</h3>
              <p className="text-gray-400">Publicly verifiable membership with anti-fraud protection</p>
            </div>

            <div className="glass-panel p-8 text-center group hover:bg-white/10 transition-all duration-300">
              <Users className="w-12 h-12 text-gold-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-3">Elite Network</h3>
              <p className="text-gray-400">Connect with like-minded individuals worldwide</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-registry-black via-registry-dark to-registry-black">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-8">
            Ready to Join the Elite?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Membership is limited and by invitation only. Secure your place among the distinguished few.
          </p>
          <Link 
            to="/auth" 
            className="premium-button text-lg px-12 py-4 animate-glow"
          >
            Apply for Membership
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-registry-black border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Crown className="w-6 h-6 text-gold-500" />
            <span className="text-xl font-serif font-bold">The Registry</span>
          </div>
          <p className="text-gray-400">
            © 2024 The Registry. All rights reserved. Membership is a privilege, not a right.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage