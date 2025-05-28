"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useDemoAuth } from "@/contexts/demo-auth-context"
import { DemoAuthModal } from "@/components/demo-auth-modal"
import { useRouter } from "next/navigation"

export default function MobilePage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const { user, isLoading, signOut } = useDemoAuth()
  const router = useRouter()

  const handleAuthClick = () => {
    if (user) {
      // If user is logged in, go directly to predict page
      router.push("/predict")
    } else {
      // If not logged in, open auth modal
      setIsAuthModalOpen(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white relative overflow-hidden">
      {/* Animated Background with Top-to-Bottom Waves */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base dark background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950"></div>

        {/* Animated holographic waves - Top to Bottom */}
        <div className="absolute inset-0">
          <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <defs>
              <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" stopOpacity="0.8" />
                <stop offset="30%" stopColor="#22c55e" stopOpacity="0.2" />
                <stop offset="70%" stopColor="#0f172a" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#1e293b" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0f172a" stopOpacity="0.9" />
                <stop offset="40%" stopColor="#22c55e" stopOpacity="0.15" />
                <stop offset="60%" stopColor="#06b6d4" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#1e293b" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="waveGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#22c55e" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {/* Wave 1 - Flowing top to bottom */}
            <path
              d="M0,0 Q200,100 400,80 T800,60 Q900,80 1000,0 L1000,300 Q800,250 600,280 T200,320 Q100,300 0,280 Z"
              fill="url(#waveGradient1)"
              className="animate-wave-vertical-slow"
            />

            {/* Wave 2 - Flowing top to bottom */}
            <path
              d="M0,100 Q300,200 600,150 T1000,120 L1000,500 Q700,450 400,480 T0,520 Z"
              fill="url(#waveGradient2)"
              className="animate-wave-vertical-medium"
            />

            {/* Wave 3 - Flowing top to bottom */}
            <path
              d="M0,200 Q250,300 500,250 T1000,220 L1000,700 Q750,650 500,680 T0,720 Z"
              fill="url(#waveGradient3)"
              className="animate-wave-vertical-fast"
            />
          </svg>
        </div>

        {/* Animated floating particles */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse-medium"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/3 rounded-full blur-3xl animate-pulse-fast"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8 safe-area-inset">
        <div className="w-full max-w-sm mx-auto space-y-6">
          {/* Logo Section */}
          <div className="text-center space-y-4">
            {/* X1 Predict Logo */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-green-400 to-green-500 bg-clip-text text-transparent">
                  X1
                </span>
                <span className="text-white ml-2 font-light">Predict</span>
              </h1>
            </div>

            {/* Neon Green Glassmorphic Predict Now Button with Blue Border */}
            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={() => router.push("/predict")}
                className="w-full h-16 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-xl sm:text-2xl font-bold tracking-widest rounded-2xl border-2 border-blue-400 hover:border-blue-300 shadow-[0_0_40px_rgba(34,197,94,0.6),0_0_25px_rgba(59,130,246,0.4)] hover:shadow-[0_0_60px_rgba(34,197,94,0.8),0_0_35px_rgba(59,130,246,0.6)] transition-all duration-300 backdrop-blur-sm glassmorphic-button relative overflow-hidden predict-now-green-button predict-now-blue-border"
              >
                <span className="relative z-10 predict-now-navy-text text-4xl tracking-widest">PREDICT NOW</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-40 rounded-2xl"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-25 rounded-2xl"></div>
              </Button>
            </div>

            {/* Enhanced Chrome Silver Tagline with Neon Green - Split into Two Lines */}
            <div className="w-full">
              <div className="text-center space-y-1">
                <p className="text-2xl sm:text-3xl font-bold tracking-[0.2em] sm:tracking-[0.3em] leading-tight bet-on-intelligence-line-1 bet-on-intelligence-dramatic-pulse bet-on-intelligence-chrome-green bet-on-intelligence-mobile-dramatic">
                  BET ON
                </p>
                <p className="text-2xl sm:text-3xl font-bold tracking-[0.2em] sm:tracking-[0.3em] leading-tight bet-on-intelligence-line-2 bet-on-intelligence-dramatic-pulse bet-on-intelligence-chrome-green bet-on-intelligence-mobile-dramatic">
                  INTELLIGENCE
                </p>
              </div>
            </div>
          </div>

          {/* Sign In/Sign Up Button - Only show if not logged in */}
          {!isLoading && !user && (
            <div className="flex justify-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsAuthModalOpen(true)}
                className="w-full h-14 bg-gradient-to-r from-blue-900 to-slate-900 backdrop-blur-md border-2 border-blue-400 text-white text-xl font-bold rounded-2xl hover:bg-gradient-to-r hover:from-blue-800 hover:to-slate-800 hover:border-blue-300 shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:shadow-[0_0_35px_rgba(59,130,246,0.6)] transition-all duration-300 glassmorphic-phone-button flex items-center justify-center gap-3"
              >
                <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent font-bold shimmer-text-subtle">
                  Sign In / Sign Up
                </span>
              </Button>
            </div>
          )}

          {/* User info if logged in */}
          {!isLoading && user && (
            <div className="flex justify-center">
              <div className="w-full p-4 bg-slate-800/60 backdrop-blur-md border-2 border-green-400/30 rounded-xl text-center shadow-[0_0_25px_rgba(34,197,94,0.3)]">
                <p className="text-green-300 mb-3 font-medium">Welcome back, {user.displayName}!</p>
                <div className="flex gap-3">
                  <Button
                    onClick={() => router.push("/predict")}
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold rounded-xl border border-green-400/30"
                  >
                    Dashboard
                  </Button>
                  <Button
                    variant="outline"
                    onClick={signOut}
                    className="px-4 border-2 border-green-400/30 text-green-400 hover:bg-green-400/10 rounded-xl"
                  >
                    Sign Out
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons - Enhanced for Mobile */}
          <div className="space-y-3 flex flex-col items-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => router.push("/my-ai")}
              className="w-full h-14 bg-slate-900/60 backdrop-blur-md border-2 border-green-400 text-white text-2xl font-semibold rounded-2xl hover:bg-slate-800/70 hover:border-green-300 shadow-[0_0_25px_rgba(34,197,94,0.4)] hover:shadow-[0_0_35px_rgba(34,197,94,0.6)] transition-all duration-300 glassmorphic-dark-button tracking-wider"
            >
              <span className="shimmer-text-subtle">Ask My AI</span>
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => router.push("/crypto")}
              className="w-full h-14 bg-slate-900/60 backdrop-blur-md border-2 border-green-400 text-white text-xl font-semibold rounded-2xl hover:bg-slate-800/70 hover:border-green-300 shadow-[0_0_25px_rgba(34,197,94,0.4)] hover:shadow-[0_0_35px_rgba(34,197,94,0.6)] transition-all duration-300 glassmorphic-dark-button"
            >
              <span className="shimmer-text-subtle">What is the hottest Crypto?</span>
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => router.push("/portfolio")}
              className="w-full h-14 bg-slate-900/60 backdrop-blur-md border-2 border-green-400 text-white text-xl font-semibold rounded-2xl hover:bg-slate-800/70 hover:border-green-300 shadow-[0_0_25px_rgba(34,197,94,0.4)] hover:shadow-[0_0_35px_rgba(34,197,94,0.6)] transition-all duration-300 glassmorphic-dark-button"
            >
              <span className="shimmer-text-subtle">Show me my portfolio</span>
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => router.push("/getting-started")}
              className="w-full h-14 bg-slate-900/60 backdrop-blur-md border-2 border-green-400 text-white text-xl font-semibold rounded-2xl hover:bg-slate-800/70 hover:border-green-300 shadow-[0_0_25px_rgba(34,197,94,0.4)] hover:shadow-[0_0_35px_rgba(34,197,94,0.6)] transition-all duration-300 glassmorphic-dark-button"
            >
              <span className="shimmer-text-subtle">How do I get started?</span>
            </Button>
          </div>

          {/* Footer Text with Neon Green X - Enhanced for Mobile */}
          <div className="text-center mt-8">
            <p className="text-lg font-sans font-light tracking-wide leading-relaxed">
              Built by Infinity <span className="text-green-400 font-medium glow-text-green">X</span>
              One — Powered by Agentic Intelligence
            </p>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <DemoAuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  )
}
