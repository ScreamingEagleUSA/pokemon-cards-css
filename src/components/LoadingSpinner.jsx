import React from 'react'

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-registry-black">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gold-500/20 border-t-gold-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-gold-400 rounded-full animate-spin animation-delay-150"></div>
      </div>
    </div>
  )
}

export default LoadingSpinner