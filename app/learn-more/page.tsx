"use client"

import { Button } from "@/components/ui/button"
import {
  Brain,
  Zap,
  Shield,
  Network,
  Cpu,
  Database,
  GitBranch,
  Layers,
  Infinity,
  Target,
  BarChart3,
} from "lucide-react"
import Link from "next/link"
import HamburgerMenu from "../components/hamburger-menu"

export default function LearnMorePage() {
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

      {/* Header Navigation */}
      <header className="relative z-20 w-full px-4 sm:px-6 lg:px-12 py-4 sm:py-6 safe-area-top">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo - Top Left */}
          <div className="flex items-center">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight infinity-logo">
              <span className="text-white shimmer-text">Infinity</span>
              <span className="text-green-400 mx-1 sm:mx-2 shimmer-green-text">X</span>
              <span className="text-white shimmer-text">One</span>
            </h1>
          </div>

          {/* Right Side - Hamburger Menu */}
          <div className="flex items-center">
            <HamburgerMenu />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-20">
          {/* Hero Section */}
          <div className="text-center space-y-6 sm:space-y-8">
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-green-400 via-white to-blue-400 bg-clip-text text-transparent">
                Autonomous Recursive
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-green-400 to-green-500 bg-clip-text text-transparent">
                Intelligence Data System
              </span>
            </h1>
            <p className="text-base sm:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Experience the next evolution of artificial intelligence through our revolutionary Agentic AI technology
              that learns, adapts, and evolves autonomously.
            </p>
          </div>

          {/* Core Technology Section */}
          <section className="space-y-8 sm:space-y-12">
            <div className="text-center">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-6">
                <span className="predict-now-navy-text">Core Technology Architecture</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              {/* Left Side - Description */}
              <div className="space-y-6 sm:space-y-8">
                <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-green-400/20 glassmorphic-feature-card">
                  <div className="flex items-center mb-4 sm:mb-6">
                    <Infinity className="w-8 h-8 sm:w-12 sm:h-12 text-green-400 mr-3 sm:mr-4" />
                    <h3 className="text-xl sm:text-3xl font-bold text-white">Recursive Learning Engine</h3>
                  </div>
                  <p className="text-sm sm:text-lg text-gray-300 leading-relaxed">
                    Our autonomous system continuously analyzes its own decision-making processes, creating recursive
                    feedback loops that exponentially enhance prediction accuracy. Each iteration builds upon previous
                    learnings, creating an ever-evolving intelligence matrix.
                  </p>
                </div>

                <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-green-400/20 glassmorphic-feature-card">
                  <div className="flex items-center mb-4 sm:mb-6">
                    <Network className="w-8 h-8 sm:w-12 sm:h-12 text-green-400 mr-3 sm:mr-4" />
                    <h3 className="text-xl sm:text-3xl font-bold text-white">Neural Network Synthesis</h3>
                  </div>
                  <p className="text-sm sm:text-lg text-gray-300 leading-relaxed">
                    Advanced multi-dimensional neural networks process vast data streams in real-time, identifying
                    patterns invisible to traditional analysis methods. Our quantum-inspired algorithms operate at the
                    intersection of machine learning and predictive intelligence.
                  </p>
                </div>
              </div>

              {/* Right Side - Visual Representation */}
              <div className="relative">
                <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/60 backdrop-blur-md border-2 border-green-400/30 glassmorphic-feature-card">
                  <div className="grid grid-cols-3 gap-4 sm:gap-6">
                    {/* Data Flow Visualization */}
                    <div className="col-span-3 flex justify-center mb-6 sm:mb-8">
                      <div className="relative">
                        <Database className="w-12 h-12 sm:w-16 sm:h-16 text-green-400 animate-pulse" />
                        <div className="absolute -top-2 -right-2 w-4 h-4 sm:w-6 sm:h-6 bg-green-400 rounded-full animate-ping"></div>
                      </div>
                    </div>

                    {/* Processing Nodes */}
                    <div className="flex flex-col items-center space-y-3 sm:space-y-4">
                      <Cpu className="w-8 h-8 sm:w-12 sm:h-12 text-cyan-400 animate-pulse" />
                      <div className="w-1 h-6 sm:w-2 sm:h-8 bg-gradient-to-b from-cyan-400 to-green-400 rounded-full animate-pulse"></div>
                      <Brain className="w-8 h-8 sm:w-12 sm:h-12 text-green-400 animate-pulse" />
                    </div>

                    <div className="flex flex-col items-center space-y-3 sm:space-y-4">
                      <GitBranch className="w-8 h-8 sm:w-12 sm:h-12 text-blue-400 animate-pulse" />
                      <div className="w-1 h-6 sm:w-2 sm:h-8 bg-gradient-to-b from-blue-400 to-green-400 rounded-full animate-pulse"></div>
                      <Layers className="w-8 h-8 sm:w-12 sm:h-12 text-green-400 animate-pulse" />
                    </div>

                    <div className="flex flex-col items-center space-y-3 sm:space-y-4">
                      <Target className="w-8 h-8 sm:w-12 sm:h-12 text-purple-400 animate-pulse" />
                      <div className="w-1 h-6 sm:w-2 sm:h-8 bg-gradient-to-b from-purple-400 to-green-400 rounded-full animate-pulse"></div>
                      <BarChart3 className="w-8 h-8 sm:w-12 sm:h-12 text-green-400 animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Agentic AI Features */}
          <section className="space-y-8 sm:space-y-12">
            <div className="text-center">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-green-400 via-white to-blue-400 bg-clip-text text-transparent">
                  Agentic AI Capabilities
                </span>
              </h2>
              <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto">
                Our Agentic AI operates as an autonomous entity, making intelligent decisions and adapting strategies
                without human intervention.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Feature 1 */}
              <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-green-400/20 hover:border-green-400/40 transition-all duration-300 glassmorphic-feature-card group">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="p-3 sm:p-4 rounded-xl bg-green-400/10 group-hover:bg-green-400/20 transition-all duration-300">
                    <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
                  </div>
                </div>
                <h3 className="text-lg sm:text-2xl font-bold text-white mb-3 sm:mb-4">Autonomous Decision Making</h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  Self-governing AI agents that analyze market conditions, assess risk factors, and execute trading
                  strategies with quantum-speed precision, operating 24/7 without human oversight.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-green-400/20 hover:border-green-400/40 transition-all duration-300 glassmorphic-feature-card group">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="p-3 sm:p-4 rounded-xl bg-cyan-400/10 group-hover:bg-cyan-400/20 transition-all duration-300">
                    <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
                  </div>
                </div>
                <h3 className="text-lg sm:text-2xl font-bold text-white mb-3 sm:mb-4">Recursive Self-Improvement</h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  Advanced algorithms that continuously optimize their own performance, creating exponential learning
                  curves that surpass traditional machine learning limitations.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-green-400/20 hover:border-green-400/40 transition-all duration-300 glassmorphic-feature-card group">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="p-3 sm:p-4 rounded-xl bg-purple-400/10 group-hover:bg-purple-400/20 transition-all duration-300">
                    <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
                  </div>
                </div>
                <h3 className="text-lg sm:text-2xl font-bold text-white mb-3 sm:mb-4">Quantum Security Matrix</h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  Military-grade encryption protocols combined with quantum-resistant security measures ensure absolute
                  protection of data and decision-making processes.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-green-400/20 hover:border-green-400/40 transition-all duration-300 glassmorphic-feature-card group">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="p-3 sm:p-4 rounded-xl bg-blue-400/10 group-hover:bg-blue-400/20 transition-all duration-300">
                    <Network className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
                  </div>
                </div>
                <h3 className="text-lg sm:text-2xl font-bold text-white mb-3 sm:mb-4">Multi-Dimensional Analysis</h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  Simultaneous processing of thousands of data variables across multiple timeframes, creating
                  comprehensive market intelligence that predicts future movements with unprecedented accuracy.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-green-400/20 hover:border-green-400/40 transition-all duration-300 glassmorphic-feature-card group">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="p-3 sm:p-4 rounded-xl bg-orange-400/10 group-hover:bg-orange-400/20 transition-all duration-300">
                    <Layers className="w-6 h-6 sm:w-8 sm:h-8 text-orange-400" />
                  </div>
                </div>
                <h3 className="text-lg sm:text-2xl font-bold text-white mb-3 sm:mb-4">Adaptive Learning Protocols</h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  Dynamic neural pathways that evolve based on market conditions, creating personalized intelligence
                  models that adapt to changing financial landscapes in real-time.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-green-400/20 hover:border-green-400/40 transition-all duration-300 glassmorphic-feature-card group">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="p-3 sm:p-4 rounded-xl bg-pink-400/10 group-hover:bg-pink-400/20 transition-all duration-300">
                    <Target className="w-6 h-6 sm:w-8 sm:h-8 text-pink-400" />
                  </div>
                </div>
                <h3 className="text-lg sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                  Predictive Intelligence Engine
                </h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  Advanced forecasting algorithms that analyze historical patterns, current trends, and emerging signals
                  to predict market movements with quantum-level precision.
                </p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center space-y-6 sm:space-y-8 py-12 sm:py-20 safe-area-bottom">
            <h2 className="text-2xl sm:text-4xl lg:text-6xl font-bold">
              <span className="predict-now-navy-text">Experience the Future</span>
            </h2>
            <p className="text-base sm:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto">
              Join the revolution of autonomous intelligence and unlock the power of recursive AI systems.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8 pt-6 sm:pt-8 px-4">
              <Button
                size="lg"
                className="w-full sm:w-auto h-14 sm:h-16 lg:h-20 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-lg sm:text-2xl lg:text-3xl font-bold tracking-widest rounded-2xl shadow-[0_0_40px_rgba(34,197,94,0.6)] hover:shadow-[0_0_60px_rgba(34,197,94,0.8)] transition-all duration-300 border-0 backdrop-blur-sm glassmorphic-button relative overflow-hidden predict-now-green-button px-6 sm:px-8 lg:px-12"
              >
                <span className="relative z-10 predict-now-navy-text">PREDICT NOW</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-40 rounded-2xl"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-25 rounded-2xl"></div>
              </Button>

              <Link href="/mobile" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-14 sm:h-16 lg:h-20 bg-slate-900/60 backdrop-blur-md border-2 border-green-400 text-white text-lg sm:text-xl lg:text-2xl font-semibold rounded-2xl hover:bg-slate-800/70 hover:border-green-300 shadow-[0_0_25px_rgba(34,197,94,0.4)] hover:shadow-[0_0_35px_rgba(34,197,94,0.6)] transition-all duration-300 glassmorphic-dark-button px-6 sm:px-8 lg:px-12"
                >
                  Mobile Experience
                </Button>
              </Link>
            </div>

            <div className="pt-6 sm:pt-8 px-4">
              <p className="text-2xl sm:text-4xl lg:text-7xl font-bold tracking-[0.2em] sm:tracking-[0.3em] lg:tracking-[0.5em] bg-gradient-to-r from-green-400 via-white to-blue-400 bg-clip-text text-transparent leading-tight bet-on-intelligence-slide-left bet-on-intelligence-continuous">
                BET ON INTELLIGENCE
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
