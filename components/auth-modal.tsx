"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { X, Eye, EyeOff } from "lucide-react"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)

  const { signIn, signUp, isConfigured } = useAuth()
  const router = useRouter()

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setIsLoading(true)

    try {
      if (!isConfigured) {
        setError("Authentication service is not configured. Please contact support.")
        return
      }

      // Validation
      if (isSignUp && password !== confirmPassword) {
        setError("Passwords do not match")
        return
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters long")
        return
      }

      if (isSignUp) {
        const { error } = await signUp(email, password)
        if (error) {
          setError(error.message)
        } else {
          setSuccess("Account created! Please check your email for verification.")
          setEmail("")
          setPassword("")
          setConfirmPassword("")
        }
      } else {
        const { error } = await signIn(email, password)
        if (error) {
          setError(error.message)
        } else {
          onClose()
          router.push("/predict")
        }
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const toggleMode = () => {
    setIsSignUp(!isSignUp)
    setError(null)
    setSuccess(null)
    setEmail("")
    setPassword("")
    setConfirmPassword("")
  }

  return (
    <div className="fixed inset-0 z-50 min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white relative overflow-hidden">
      {/* Exact same animated background as home screen */}
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
          {/* Close Button */}
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </div>

          {/* Logo Section - Same as home */}
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

            {/* Enhanced Chrome Silver Tagline with Neon Green - Same as home */}
            <div className="w-full">
              <div className="text-center space-y-1">
                <p className="text-2xl sm:text-3xl font-bold tracking-[0.2em] sm:tracking-[0.3em] leading-tight bet-on-intelligence-line-1 bet-on-intelligence-dramatic-pulse bet-on-intelligence-chrome-green bet-on-intelligence-mobile-dramatic">
                  {isSignUp ? "JOIN THE" : "WELCOME"}
                </p>
                <p className="text-2xl sm:text-3xl font-bold tracking-[0.2em] sm:tracking-[0.3em] leading-tight bet-on-intelligence-line-2 bet-on-intelligence-dramatic-pulse bet-on-intelligence-chrome-green bet-on-intelligence-mobile-dramatic">
                  {isSignUp ? "FUTURE" : "BACK"}
                </p>
              </div>
            </div>
          </div>

          {/* Configuration Warning */}
          {!isConfigured && (
            <div className="p-4 bg-red-500/20 border-2 border-red-500/30 rounded-2xl text-red-300 backdrop-blur-md">
              <p className="text-sm font-medium mb-2">⚠️ Authentication Not Configured</p>
              <p className="text-xs">Please add your Supabase credentials to enable authentication.</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-500/20 border-2 border-red-500/30 rounded-2xl text-red-300 backdrop-blur-md animate-fade-in">
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="p-4 bg-green-500/20 border-2 border-green-500/30 rounded-2xl text-green-300 backdrop-blur-md animate-fade-in">
              <p className="text-sm font-medium">{success}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2 shimmer-text-subtle">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className="w-full h-12 bg-slate-900/60 backdrop-blur-md border-2 border-green-400 text-white placeholder-gray-400 rounded-2xl focus:border-green-300 focus:ring-2 focus:ring-green-400/20 transition-all duration-300 shadow-[0_0_25px_rgba(34,197,94,0.4)] hover:shadow-[0_0_35px_rgba(34,197,94,0.6)] glassmorphic-dark-button"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2 shimmer-text-subtle">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full h-12 bg-slate-900/60 backdrop-blur-md border-2 border-green-400 text-white placeholder-gray-400 rounded-2xl focus:border-green-300 focus:ring-2 focus:ring-green-400/20 transition-all duration-300 shadow-[0_0_25px_rgba(34,197,94,0.4)] hover:shadow-[0_0_35px_rgba(34,197,94,0.6)] glassmorphic-dark-button pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-400 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field - Only for Sign Up */}
            {isSignUp && (
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-300 mb-2 shimmer-text-subtle"
                >
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full h-12 bg-slate-900/60 backdrop-blur-md border-2 border-green-400 text-white placeholder-gray-400 rounded-2xl focus:border-green-300 focus:ring-2 focus:ring-green-400/20 transition-all duration-300 shadow-[0_0_25px_rgba(34,197,94,0.4)] hover:shadow-[0_0_35px_rgba(34,197,94,0.6)] glassmorphic-dark-button"
                />
              </div>
            )}

            {/* Submit Button - Same style as home screen buttons */}
            <Button
              type="submit"
              disabled={isLoading || !isConfigured}
              className="w-full h-16 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-xl sm:text-2xl font-bold tracking-widest rounded-2xl border-2 border-blue-400 hover:border-blue-300 shadow-[0_0_40px_rgba(34,197,94,0.6),0_0_25px_rgba(59,130,246,0.4)] hover:shadow-[0_0_60px_rgba(34,197,94,0.8),0_0_35px_rgba(59,130,246,0.6)] transition-all duration-300 backdrop-blur-sm glassmorphic-button relative overflow-hidden predict-now-green-button predict-now-blue-border disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span className="relative z-10 predict-now-navy-text text-2xl tracking-widest">PROCESSING...</span>
                </div>
              ) : (
                <span className="relative z-10 predict-now-navy-text text-2xl tracking-widest">
                  {isSignUp ? "CREATE ACCOUNT" : "SIGN IN"}
                </span>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-40 rounded-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-25 rounded-2xl"></div>
            </Button>
          </form>

          {/* Toggle Mode Button - Same style as other buttons */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="lg"
              onClick={toggleMode}
              className="w-full h-14 bg-slate-900/60 backdrop-blur-md border-2 border-green-400 text-white text-xl font-semibold rounded-2xl hover:bg-slate-800/70 hover:border-green-300 shadow-[0_0_25px_rgba(34,197,94,0.4)] hover:shadow-[0_0_35px_rgba(34,197,94,0.6)] transition-all duration-300 glassmorphic-dark-button"
            >
              <span className="shimmer-text-subtle">
                {isSignUp ? "Already have an account? Sign In" : "Need an account? Sign Up"}
              </span>
            </Button>
          </div>

          {/* Footer Text with Neon Green X - Same as home */}
          <div className="text-center mt-8">
            <p className="text-lg font-sans font-light tracking-wide leading-relaxed">
              Built by Infinity <span className="text-green-400 font-medium glow-text-green">X</span>
              One — Powered by Agentic Intelligence
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
