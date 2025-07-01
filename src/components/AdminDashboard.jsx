import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Crown, Users, MapPin, DollarSign, TrendingUp, ArrowLeft } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const AdminDashboard = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalMembers: 0,
    activeSubscriptions: 0,
    monthlyRevenue: 0,
    locations: 0
  })

  // Mock admin check - in production, this would be a proper role check
  const isAdmin = user?.email === 'admin@theregistry.com'

  useEffect(() => {
    if (isAdmin) {
      loadStats()
    }
  }, [isAdmin])

  const loadStats = async () => {
    // Mock data for demo
    setStats({
      totalMembers: 127,
      activeSubscriptions: 89,
      monthlyRevenue: 88911,
      locations: 23
    })
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-registry-black flex items-center justify-center">
        <div className="text-center">
          <Crown className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-gray-400 mb-6">You don't have permission to access the admin dashboard.</p>
          <Link to="/dashboard" className="premium-button">
            Back to Dashboard
          </Link>
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
              <h1 className="text-2xl font-serif font-bold text-white">Admin Dashboard</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="glass-panel p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Members</p>
                <p className="text-3xl font-bold text-white">{stats.totalMembers}</p>
              </div>
              <Users className="w-8 h-8 text-gold-500" />
            </div>
          </div>

          <div className="glass-panel p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Subscriptions</p>
                <p className="text-3xl font-bold text-white">{stats.activeSubscriptions}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="glass-panel p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Monthly Revenue</p>
                <p className="text-3xl font-bold text-white">${stats.monthlyRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-gold-500" />
            </div>
          </div>

          <div className="glass-panel p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Exclusive Locations</p>
                <p className="text-3xl font-bold text-white">{stats.locations}</p>
              </div>
              <MapPin className="w-8 h-8 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Management Sections */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Member Management */}
          <div className="glass-panel p-8">
            <h2 className="text-2xl font-serif font-bold text-white mb-6">Member Management</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-registry-dark rounded-lg">
                <div>
                  <div className="font-semibold text-white">John Doe</div>
                  <div className="text-sm text-gray-400">john@example.com • Active</div>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors">
                    Suspend
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-registry-dark rounded-lg">
                <div>
                  <div className="font-semibold text-white">Jane Smith</div>
                  <div className="text-sm text-gray-400">jane@example.com • Active</div>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors">
                    Suspend
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-registry-dark rounded-lg opacity-60">
                <div>
                  <div className="font-semibold text-white">Mike Johnson</div>
                  <div className="text-sm text-gray-400">mike@example.com • Suspended</div>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors">
                    Restore
                  </button>
                </div>
              </div>
            </div>

            <button className="w-full mt-6 premium-button">
              View All Members
            </button>
          </div>

          {/* Location Management */}
          <div className="glass-panel p-8">
            <h2 className="text-2xl font-serif font-bold text-white mb-6">Exclusive Locations</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-registry-dark rounded-lg">
                <div>
                  <div className="font-semibold text-white">The Platinum Lounge</div>
                  <div className="text-sm text-gray-400">New York, NY • Active</div>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                    Edit
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-registry-dark rounded-lg">
                <div>
                  <div className="font-semibold text-white">Elite Club Monaco</div>
                  <div className="text-sm text-gray-400">Monaco • Active</div>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                    Edit
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-registry-dark rounded-lg">
                <div>
                  <div className="font-semibold text-white">Sky Terrace Tokyo</div>
                  <div className="text-sm text-gray-400">Tokyo, Japan • Active</div>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                    Edit
                  </button>
                </div>
              </div>
            </div>

            <button className="w-full mt-6 premium-button">
              Add New Location
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 glass-panel p-8">
          <h2 className="text-2xl font-serif font-bold text-white mb-6">Recent Activity</h2>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border-b border-gray-700">
              <span className="text-white">New member registration: john@example.com</span>
              <span className="text-gray-400 text-sm">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-3 border-b border-gray-700">
              <span className="text-white">Subscription renewed: jane@example.com</span>
              <span className="text-gray-400 text-sm">5 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-3 border-b border-gray-700">
              <span className="text-white">New location added: Elite Club Monaco</span>
              <span className="text-gray-400 text-sm">1 day ago</span>
            </div>
            <div className="flex items-center justify-between p-3">
              <span className="text-white">Member suspended: mike@example.com</span>
              <span className="text-gray-400 text-sm">2 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard