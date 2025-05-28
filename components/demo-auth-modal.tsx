"use client"

import type React from "react"
import { useState } from "react"
import { useDemoAuth } from "@/contexts/demo-auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { X, Eye, EyeOff } from "lucide-react"
import { demoUsers } from "@/lib/demo-auth"

interface DemoAuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DemoAuthModal({ isOpen, onClose }: DemoAuthModalProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const { signIn } = useDemoAuth()
  const router = useRouter()

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const result = await signIn(username, password)
      if (result.success) {
        onClose()
        router.push("/predict")
      } else {
        setError(result.error || "Login failed")
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = async (demoUsername: string, demoPassword: string) => {
    setError(null)
    setIsLoading(true)
    setUsername(demoUsername)
    setPassword(demoPassword)

    try {
      const result = await signIn(demoUsername, demoPassword)
      if (result.success) {
        onClose()
        router.push("/predict")
      } else {
        setError(result.error || "Login failed")
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white relative overflow-hidden">
      {/* Exact same animated background as home screen */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base dark background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950"></div>

        {/* Animated holographic waves - Top to Bottom */}
        <div className="absolute inset-0">
          <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <defs>
              <linearGradient id="authWaveGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" stopOpacity="0.8" />
                <stop offset="30%" stopColor="#22c55e" stopOpacity="0.2" />
                <stop offset="70%" stopColor="#0f172a" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#1e293b" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="authWaveGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0f172a" stopOpacity="0.9" />
                <stop offset="40%" stopColor="#22c55e" stopOpacity="0.15" />
                <stop offset="60%" stopColor="#06b6d4" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#1e293b" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="authWaveGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#22c55e" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {/* Wave 1 - Flowing top to bottom */}
            <path
              d="M0,0 Q200,100 400,80 T800,60 Q900,80 1000,0 L1000,300 Q800,250 600,280 T200,320 Q100,300 0,280 Z"
              fill="url(#authWaveGradient1)"
              className="animate-wave-vertical-slow"
            />

            {/* Wave 2 - Flowing top to bottom */}
            <path
              d="M0,100 Q300,200 600,150 T1000,120 L1000,500 Q700,450 400,480 T0,520 Z"
              fill="url(#authWaveGradient2)"
              className="animate-wave-vertical-medium"
            />

            {/* Wave 3 - Flowing top to bottom */}
            <path
              d="M0,200 Q250,300 500,250 T1000,220 L1000,700 Q750,650 500,680 T0,720 Z"
              fill="url(#authWaveGradient3)"
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
        <div className="w-full max-w-md mx-auto space-y-6">
          {/* Close Button */}
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10 z-20"
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

            {/* Enhanced Chrome Silver Tagline with Neon Green */}
            <div className="w-full">
              <div className="text-center space-y-1">
                <p className="text-2xl sm:text-3xl font-bold tracking-[0.2em] sm:tracking-[0.3em] leading-tight bet-on-intelligence-line-1 bet-on-intelligence-dramatic-pulse bet-on-intelligence-chrome-green bet-on-intelligence-mobile-dramatic">
                  DEMO
                </p>
                <p className="text-2xl sm:text-3xl font-bold tracking-[0.2em] sm:tracking-[0.3em] leading-tight bet-on-intelligence-line-2 bet-on-intelligence-dramatic-pulse bet-on-intelligence-chrome-green bet-on-intelligence-mobile-dramatic">
                  SIGN IN
                </p>
              </div>
            </div>
          </div>

          {/* Quick Demo Login Buttons */}
          <div className="space-y-3">
            <p className="text-center text-green-400 font-medium text-lg">Quick Demo Login:</p>
            <div className="grid grid-cols-2 gap-3">
              {demoUsers.map((user) => (
                <Button
                  key={user.username}
                  onClick={() => handleDemoLogin(user.username, user.password)}
                  disabled={isLoading}
                  className={`h-12 text-sm font-bold rounded-xl transition-all duration-300 backdrop-blur-md border-2 ${
                    user.role === "admin"
                      ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border-red-400 hover:border-red-300 shadow-[0_0_25px_rgba(239,68,68,0.4)] hover:shadow-[0_0_35px_rgba(239,68,68,0.6)]"
                      : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 border-blue-400 hover:border-blue-300 shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:shadow-[0_0_35px_rgba(59,130,246,0.6)]"
                  }`}
                >
                  {user.displayName}
                  {user.role === "admin" && <span className="ml-1 text-xs">👑</span>}
                </Button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center space-x-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent"></div>
            <span className="text-green-400 font-medium">OR</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent"></div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-500/20 border-2 border-red-500/30 rounded-2xl text-red-300 backdrop-blur-md animate-fade-in">
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Manual Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2 shimmer-text-subtle">
                Username
              </label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter username"
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
                  placeholder="Enter password"
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

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-16 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-xl sm:text-2xl font-bold tracking-widest rounded-2xl border-2 border-blue-400 hover:border-blue-300 shadow-[0_0_40px_rgba(34,197,94,0.6),0_0_25px_rgba(59,130,246,0.4)] hover:shadow-[0_0_60px_rgba(34,197,94,0.8),0_0_35px_rgba(59,130,246,0.6)] transition-all duration-300 backdrop-blur-sm glassmorphic-button relative overflow-hidden predict-now-green-button predict-now-blue-border disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span className="relative z-10 predict-now-navy-text text-2xl tracking-widest">SIGNING IN...</span>
                </div>
              ) : (
                <span className="relative z-10 predict-now-navy-text text-2xl tracking-widest">SIGN IN</span>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-40 rounded-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-25 rounded-2xl"></div>
            </Button>
          </form>

          {/* Demo Credentials Info */}
          <div className="p-4 bg-slate-800/60 backdrop-blur-md border-2 border-green-400/30 rounded-xl">
            <p className="text-green-300 font-medium mb-2 text-center">Demo Credentials:</p>
            <div className="text-sm text-gray-300 space-y-1">
              <p>
                <strong>Regular Users:</strong> demo/demo123, test/test123, user1/password
              </p>
              <p>
                <strong>Admin:</strong> admin/admin123 👑
              </p>
            </div>
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
