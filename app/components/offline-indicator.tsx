"use client"

import { useEffect, useState } from "react"

export default function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true)
  const [showOfflineMessage, setShowOfflineMessage] = useState(false)

  useEffect(() => {
    // Check initial online status
    setIsOnline(navigator.onLine)

    const handleOnline = () => {
      setIsOnline(true)
      setShowOfflineMessage(false)
    }

    const handleOffline = () => {
      setIsOnline(false)
      setShowOfflineMessage(true)
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  // Auto-hide offline message after 5 seconds
  useEffect(() => {
    if (showOfflineMessage) {
      const timer = setTimeout(() => {
        setShowOfflineMessage(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [showOfflineMessage])

  if (!showOfflineMessage && isOnline) {
    return null
  }

  return (
    <>
      {/* Offline Banner */}
      {!isOnline && showOfflineMessage && (
        <div className="fixed top-4 left-4 right-4 z-50 bg-gradient-to-r from-orange-600 to-red-600 text-white p-4 rounded-lg shadow-lg animate-in slide-in-from-top">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📡</span>
              <div>
                <h3 className="font-bold">You're Offline</h3>
                <p className="text-sm opacity-90">Some features may be limited</p>
              </div>
            </div>
            <button
              onClick={() => setShowOfflineMessage(false)}
              className="bg-white/20 text-white px-3 py-2 rounded-lg font-bold hover:bg-white/30 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Connection Restored Banner */}
      {isOnline && showOfflineMessage && (
        <div className="fixed top-4 left-4 right-4 z-50 bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-lg shadow-lg animate-in slide-in-from-top">
          <div className="flex items-center gap-3">
            <span className="text-2xl">✅</span>
            <div>
              <h3 className="font-bold">Connection Restored</h3>
              <p className="text-sm opacity-90">All features are now available</p>
            </div>
          </div>
        </div>
      )}

      {/* Persistent Offline Indicator */}
      {!isOnline && (
        <div className="fixed bottom-4 left-4 z-40 bg-orange-600/20 backdrop-blur-sm text-orange-400 p-2 rounded-lg text-xs border border-orange-400/20">
          📡 Offline Mode
        </div>
      )}
    </>
  )
}
