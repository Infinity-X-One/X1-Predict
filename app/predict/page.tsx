"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  BookOpen,
  BarChart3,
  MessageSquare,
  Brain,
  RefreshCw,
  Settings,
  Send,
  TrendingUp,
  TrendingDown,
  Info,
  BarChart,
  Star,
  Activity,
  Eye,
  AlertTriangle,
  Cpu,
  Network,
  DollarSign,
} from "lucide-react"
import Link from "next/link"

interface AIAgent {
  id: string
  name: string
  type: "momentum" | "value" | "growth" | "risk" | "sentiment" | "technical"
  status: "active" | "learning" | "optimizing" | "idle"
  accuracy: number
  predictions: number
  lastUpdate: Date
  specialization: string
  confidence: number
}

interface RecursiveLoop {
  id: string
  name: string
  iterations: number
  improvement: number
  status: "running" | "converging" | "optimized"
  lastImprovement: Date
  targetAccuracy: number
  currentAccuracy: number
}

interface PredictionCard {
  id: string
  symbol: string
  name: string
  confidence: number
  aiAgents: string[]
  recursiveScore: number
  realTimePrice: number
  priceChange: number
  priceChangePercent: number
  holdTime: string
  holdTimeCategory: "short" | "medium" | "long"
  estimatedGrowth: string
  riskScore: number
  rewardRatio: number
  aiSays: string
  factors: string[]
  trend: "up" | "down"
  action: "BUY" | "HOLD" | "SELL"
  timeLeft?: string
  sector: string
  volume: number
  marketCap: string
  accuracy: number
  successRate: number
  lastUpdated: Date
  alerts: string[]
  technicalIndicators: {
    rsi: number
    macd: "bullish" | "bearish"
    support: number
    resistance: number
  }
}

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  followUpQuestions?: string[]
  aiAgent?: string
}

export default function PredictPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // AI Agents State
  const [aiAgents] = useState<AIAgent[]>([
    {
      id: "momentum-ai",
      name: "Momentum Hunter",
      type: "momentum",
      status: "active",
      accuracy: 94.2,
      predictions: 1247,
      lastUpdate: new Date(),
      specialization: "High-velocity price movements",
      confidence: 96,
    },
    {
      id: "value-ai",
      name: "Value Detector",
      type: "value",
      status: "learning",
      accuracy: 87.8,
      predictions: 892,
      lastUpdate: new Date(),
      specialization: "Undervalued asset identification",
      confidence: 89,
    },
    {
      id: "growth-ai",
      name: "Growth Predictor",
      type: "growth",
      status: "optimizing",
      accuracy: 91.5,
      predictions: 1056,
      lastUpdate: new Date(),
      specialization: "Long-term growth potential",
      confidence: 93,
    },
    {
      id: "risk-ai",
      name: "Risk Guardian",
      type: "risk",
      status: "active",
      accuracy: 96.7,
      predictions: 2341,
      lastUpdate: new Date(),
      specialization: "Risk assessment & mitigation",
      confidence: 98,
    },
    {
      id: "sentiment-ai",
      name: "Sentiment Analyzer",
      type: "sentiment",
      status: "active",
      accuracy: 88.9,
      predictions: 3456,
      lastUpdate: new Date(),
      specialization: "Market sentiment & social signals",
      confidence: 91,
    },
    {
      id: "technical-ai",
      name: "Technical Master",
      type: "technical",
      status: "active",
      accuracy: 92.3,
      predictions: 1789,
      lastUpdate: new Date(),
      specialization: "Chart patterns & indicators",
      confidence: 94,
    },
  ])

  // Recursive Loops State
  const [recursiveLoops] = useState<RecursiveLoop[]>([
    {
      id: "pattern-recognition",
      name: "Pattern Recognition Loop",
      iterations: 15847,
      improvement: 2.3,
      status: "running",
      lastImprovement: new Date(),
      targetAccuracy: 95.0,
      currentAccuracy: 92.7,
    },
    {
      id: "risk-optimization",
      name: "Risk Optimization Loop",
      iterations: 23156,
      improvement: 1.8,
      status: "converging",
      lastImprovement: new Date(),
      targetAccuracy: 98.0,
      currentAccuracy: 96.2,
    },
    {
      id: "sentiment-correlation",
      name: "Sentiment Correlation Loop",
      iterations: 8934,
      improvement: 3.1,
      status: "optimized",
      lastImprovement: new Date(),
      targetAccuracy: 90.0,
      currentAccuracy: 91.4,
    },
  ])

  // Top 10 Assets with Real-time Data
  const [predictions, setPredictions] = useState<PredictionCard[]>([
    {
      id: "1",
      symbol: "NVDA",
      name: "NVIDIA Corporation",
      confidence: 96.8,
      aiAgents: ["momentum-ai", "growth-ai", "technical-ai"],
      recursiveScore: 94.2,
      realTimePrice: 875.3,
      priceChange: 73.45,
      priceChangePercent: 9.17,
      holdTime: "3-6 months",
      holdTimeCategory: "long",
      estimatedGrowth: "+35-50%",
      riskScore: 3.2,
      rewardRatio: 4.8,
      aiSays: "Recursive AI identifies unprecedented AI chip demand surge with 96.8% confidence",
      factors: ["AI infrastructure boom", "Data center expansion", "Gaming recovery", "Automotive AI"],
      trend: "up",
      action: "BUY",
      sector: "Technology",
      volume: 45678900,
      marketCap: "$2.15T",
      accuracy: 94.2,
      successRate: 89.7,
      lastUpdated: new Date(),
      alerts: ["Breaking resistance at $870", "Volume surge detected"],
      technicalIndicators: {
        rsi: 67.8,
        macd: "bullish",
        support: 845.0,
        resistance: 890.0,
      },
    },
    {
      id: "2",
      symbol: "TSLA",
      name: "Tesla Inc.",
      confidence: 94.5,
      aiAgents: ["momentum-ai", "growth-ai", "sentiment-ai"],
      recursiveScore: 91.8,
      realTimePrice: 248.5,
      priceChange: 12.85,
      priceChangePercent: 5.46,
      holdTime: "2-4 months",
      holdTimeCategory: "medium",
      estimatedGrowth: "+28-40%",
      riskScore: 4.1,
      rewardRatio: 3.9,
      aiSays: "Multi-agent consensus: EV leadership with autonomous driving breakthrough imminent",
      factors: ["FSD progress", "Cybertruck ramp", "Energy storage growth", "China expansion"],
      trend: "up",
      action: "BUY",
      sector: "Automotive",
      volume: 89234567,
      marketCap: "$791B",
      accuracy: 91.8,
      successRate: 87.3,
      lastUpdated: new Date(),
      alerts: ["Analyst upgrade", "Production milestone"],
      technicalIndicators: {
        rsi: 72.3,
        macd: "bullish",
        support: 235.0,
        resistance: 265.0,
      },
    },
    {
      id: "3",
      symbol: "MSFT",
      name: "Microsoft Corporation",
      confidence: 93.2,
      aiAgents: ["value-ai", "growth-ai", "risk-ai"],
      recursiveScore: 89.6,
      realTimePrice: 378.9,
      priceChange: 13.45,
      priceChangePercent: 3.68,
      holdTime: "4-8 months",
      holdTimeCategory: "long",
      estimatedGrowth: "+22-32%",
      riskScore: 2.1,
      rewardRatio: 5.2,
      aiSays: "Risk-adjusted AI model shows optimal risk-reward with Azure dominance",
      factors: ["Azure AI integration", "Office 365 growth", "Gaming expansion", "Enterprise adoption"],
      trend: "up",
      action: "BUY",
      sector: "Technology",
      volume: 23456789,
      marketCap: "$2.81T",
      accuracy: 89.6,
      successRate: 92.1,
      lastUpdated: new Date(),
      alerts: ["Earnings beat expected", "AI partnership announced"],
      technicalIndicators: {
        rsi: 58.9,
        macd: "bullish",
        support: 365.0,
        resistance: 395.0,
      },
    },
    {
      id: "4",
      symbol: "AAPL",
      name: "Apple Inc.",
      confidence: 91.7,
      aiAgents: ["value-ai", "momentum-ai", "technical-ai"],
      recursiveScore: 88.4,
      realTimePrice: 189.25,
      priceChange: 3.89,
      priceChangePercent: 2.1,
      holdTime: "3-6 weeks",
      holdTimeCategory: "short",
      estimatedGrowth: "+18-25%",
      riskScore: 1.8,
      rewardRatio: 4.1,
      aiSays: "Technical AI confirms iPhone supercycle with services momentum",
      factors: ["iPhone 15 demand", "Services growth", "Vision Pro launch", "India expansion"],
      trend: "up",
      action: "BUY",
      sector: "Technology",
      volume: 67890123,
      marketCap: "$2.95T",
      accuracy: 88.4,
      successRate: 85.9,
      lastUpdated: new Date(),
      alerts: ["Buyback program", "Dividend increase"],
      technicalIndicators: {
        rsi: 61.2,
        macd: "bullish",
        support: 182.0,
        resistance: 198.0,
      },
    },
    {
      id: "5",
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      confidence: 89.8,
      aiAgents: ["growth-ai", "sentiment-ai", "technical-ai"],
      recursiveScore: 86.7,
      realTimePrice: 142.8,
      priceChange: -1.85,
      priceChangePercent: -1.28,
      holdTime: "2-4 weeks",
      holdTimeCategory: "short",
      estimatedGrowth: "+15-22%",
      riskScore: 2.9,
      rewardRatio: 3.2,
      aiSays: "Sentiment AI detects oversold condition with Bard AI catalyst pending",
      factors: ["Search dominance", "Cloud growth", "AI development", "YouTube monetization"],
      trend: "up",
      action: "BUY",
      sector: "Technology",
      volume: 34567890,
      marketCap: "$1.78T",
      accuracy: 86.7,
      successRate: 83.5,
      lastUpdated: new Date(),
      alerts: ["Temporary dip", "AI announcement pending"],
      technicalIndicators: {
        rsi: 45.6,
        macd: "bearish",
        support: 138.0,
        resistance: 150.0,
      },
    },
    {
      id: "6",
      symbol: "AMZN",
      name: "Amazon.com Inc.",
      confidence: 88.9,
      aiAgents: ["value-ai", "growth-ai", "risk-ai"],
      recursiveScore: 85.3,
      realTimePrice: 155.4,
      priceChange: 2.78,
      priceChangePercent: 1.82,
      holdTime: "6-10 weeks",
      holdTimeCategory: "medium",
      estimatedGrowth: "+20-28%",
      riskScore: 3.5,
      rewardRatio: 3.8,
      aiSays: "Value AI identifies AWS margin expansion with e-commerce recovery",
      factors: ["AWS dominance", "Prime growth", "Logistics efficiency", "Advertising revenue"],
      trend: "up",
      action: "BUY",
      sector: "Technology",
      volume: 45678901,
      marketCap: "$1.61T",
      accuracy: 85.3,
      successRate: 81.7,
      lastUpdated: new Date(),
      alerts: ["Cost optimization", "Prime subscriber growth"],
      technicalIndicators: {
        rsi: 55.4,
        macd: "bullish",
        support: 148.0,
        resistance: 165.0,
      },
    },
    {
      id: "7",
      symbol: "META",
      name: "Meta Platforms Inc.",
      confidence: 87.6,
      aiAgents: ["momentum-ai", "sentiment-ai", "technical-ai"],
      recursiveScore: 84.1,
      realTimePrice: 485.2,
      priceChange: 19.67,
      priceChangePercent: 4.22,
      holdTime: "1-3 months",
      holdTimeCategory: "medium",
      estimatedGrowth: "+25-35%",
      riskScore: 4.2,
      rewardRatio: 3.5,
      aiSays: "Momentum AI tracks VR/AR breakthrough with advertising recovery",
      factors: ["VR momentum", "Ad revenue recovery", "Cost cutting", "Metaverse development"],
      trend: "up",
      action: "BUY",
      sector: "Technology",
      volume: 56789012,
      marketCap: "$1.23T",
      accuracy: 84.1,
      successRate: 79.8,
      lastUpdated: new Date(),
      alerts: ["VR sales surge", "Efficiency gains"],
      technicalIndicators: {
        rsi: 69.8,
        macd: "bullish",
        support: 465.0,
        resistance: 510.0,
      },
    },
    {
      id: "8",
      symbol: "PLTR",
      name: "Palantir Technologies",
      confidence: 86.4,
      aiAgents: ["growth-ai", "momentum-ai", "sentiment-ai"],
      recursiveScore: 83.7,
      realTimePrice: 28.9,
      priceChange: 1.95,
      priceChangePercent: 7.24,
      holdTime: "4-8 months",
      holdTimeCategory: "long",
      estimatedGrowth: "+40-60%",
      riskScore: 5.8,
      rewardRatio: 4.2,
      aiSays: "Growth AI predicts government AI contracts acceleration with commercial breakthrough",
      factors: ["Government contracts", "AI analytics", "Commercial growth", "Data security"],
      trend: "up",
      action: "BUY",
      sector: "Technology",
      volume: 78901234,
      marketCap: "$62.8B",
      accuracy: 83.7,
      successRate: 76.9,
      lastUpdated: new Date(),
      alerts: ["Contract wins", "Commercial traction"],
      technicalIndicators: {
        rsi: 74.2,
        macd: "bullish",
        support: 26.5,
        resistance: 32.0,
      },
    },
    {
      id: "9",
      symbol: "COIN",
      name: "Coinbase Global Inc.",
      confidence: 84.8,
      aiAgents: ["momentum-ai", "sentiment-ai", "risk-ai"],
      recursiveScore: 81.9,
      realTimePrice: 245.7,
      priceChange: 15.67,
      priceChangePercent: 6.81,
      holdTime: "2-6 weeks",
      holdTimeCategory: "short",
      estimatedGrowth: "+30-45%",
      riskScore: 7.2,
      rewardRatio: 3.1,
      aiSays: "Sentiment AI confirms crypto momentum with regulatory clarity catalyst",
      factors: ["Bitcoin momentum", "Trading volume", "Regulatory clarity", "Institutional adoption"],
      trend: "up",
      action: "BUY",
      sector: "Financial Services",
      volume: 89012345,
      marketCap: "$58.9B",
      accuracy: 81.9,
      successRate: 74.3,
      lastUpdated: new Date(),
      alerts: ["Volume spike", "Regulatory progress"],
      technicalIndicators: {
        rsi: 76.5,
        macd: "bullish",
        support: 225.0,
        resistance: 270.0,
      },
    },
    {
      id: "10",
      symbol: "SNOW",
      name: "Snowflake Inc.",
      confidence: 83.5,
      aiAgents: ["growth-ai", "value-ai", "technical-ai"],
      recursiveScore: 80.8,
      realTimePrice: 185.6,
      priceChange: 6.23,
      priceChangePercent: 3.47,
      holdTime: "3-5 months",
      holdTimeCategory: "long",
      estimatedGrowth: "+25-35%",
      riskScore: 4.6,
      rewardRatio: 3.7,
      aiSays: "Technical AI identifies cloud data platform expansion with enterprise adoption",
      factors: ["Data cloud growth", "Enterprise adoption", "AI integration", "Partner ecosystem"],
      trend: "up",
      action: "BUY",
      sector: "Technology",
      volume: 12345678,
      marketCap: "$59.7B",
      accuracy: 80.8,
      successRate: 72.1,
      lastUpdated: new Date(),
      alerts: ["Partnership deals", "Usage growth"],
      technicalIndicators: {
        rsi: 62.8,
        macd: "bullish",
        support: 175.0,
        resistance: 200.0,
      },
    },
  ])

  // Real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
      setPredictions((prev) =>
        prev.map((prediction) => {
          const volatility = prediction.riskScore * 0.001
          const randomChange = (Math.random() - 0.5) * volatility * prediction.realTimePrice
          const newPrice = Math.max(0.01, prediction.realTimePrice + randomChange)
          const priceChange = newPrice - prediction.realTimePrice
          const priceChangePercent = (priceChange / prediction.realTimePrice) * 100

          return {
            ...prediction,
            realTimePrice: Number(newPrice.toFixed(2)),
            priceChange: Number(priceChange.toFixed(2)),
            priceChangePercent: Number(priceChangePercent.toFixed(2)),
            lastUpdated: new Date(),
          }
        }),
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputMessage
    if (!textToSend.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: textToSend,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    // Simulate AI response with agent selection
    setTimeout(() => {
      const selectedAgent = aiAgents[Math.floor(Math.random() * aiAgents.length)]
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: `[${selectedAgent.name}] Based on recursive analysis across ${aiAgents.length} specialized AI agents, here's my assessment: The market shows strong momentum with our recursive loops achieving 94.2% accuracy. Current predictions are backed by ${recursiveLoops.length} active learning cycles with real-time optimization.`,
        timestamp: new Date(),
        aiAgent: selectedAgent.name,
        followUpQuestions: [
          "Show me the recursive learning progress",
          "Which AI agent has the highest accuracy?",
          "What's the risk-adjusted return for top picks?",
          "How are the specialized AIs performing?",
        ],
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  const getAgentStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-400 bg-green-400/20"
      case "learning":
        return "text-blue-400 bg-blue-400/20"
      case "optimizing":
        return "text-yellow-400 bg-yellow-400/20"
      default:
        return "text-gray-400 bg-gray-400/20"
    }
  }

  const getLoopStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "text-green-400"
      case "converging":
        return "text-yellow-400"
      case "optimized":
        return "text-blue-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white relative">
      {/* Fixed Animated Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950"></div>
        <div className="absolute inset-0">
          <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <defs>
              <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" stopOpacity="0.8" />
                <stop offset="30%" stopColor="#22c55e" stopOpacity="0.2" />
                <stop offset="70%" stopColor="#0f172a" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#1e293b" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <path
              d="M0,0 Q200,100 400,80 T800,60 Q900,80 1000,0 L1000,300 Q800,250 600,280 T200,320 Q100,300 0,280 Z"
              fill="url(#waveGradient1)"
              className="animate-wave-vertical-slow"
            />
          </svg>
        </div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse-medium"></div>
      </div>

      {/* Left Sidebar - Enhanced */}
      <div className="fixed left-0 top-0 w-64 h-full bg-slate-900/95 backdrop-blur-md border-r border-green-400/20 flex flex-col shadow-[0_0_30px_rgba(34,197,94,0.2)] z-50">
        {/* Logo */}
        <div className="p-4 border-b border-green-400/20 flex-shrink-0">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-green-400 rounded-lg flex items-center justify-center">
              <span className="text-slate-900 font-bold">X1</span>
            </div>
            <div>
              <span className="text-xl font-bold">Predict</span>
              <div className="text-xs text-green-400">AI RECURSIVE v2.0</div>
            </div>
          </Link>
        </div>

        {/* System Status */}
        <div className="p-3 border-b border-green-400/20">
          <div className="text-xs text-gray-400 mb-2">SYSTEM STATUS</div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-400">LIVE TRADING</span>
          </div>
          <div className="text-xs text-gray-300 mt-1">{currentTime.toLocaleTimeString()}</div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 p-3 space-y-2 overflow-y-auto">
          <Link href="/" className="block w-full">
            <Button className="w-full justify-start glassmorphic-dark-button text-white font-semibold py-3 px-4">
              <Home className="w-5 h-5 mr-3" />
              Dashboard
            </Button>
          </Link>

          <Link href="/proof" className="block w-full">
            <Button className="w-full justify-start glassmorphic-dark-button text-white font-semibold py-3 px-4 bg-gradient-to-r from-green-600/20 to-cyan-600/20 border border-green-400/30">
              <Activity className="w-5 h-5 mr-3" />
              Proof System
            </Button>
          </Link>

          <Link href="/ai-agents" className="block w-full">
            <Button className="w-full justify-start glassmorphic-dark-button text-white font-semibold py-3 px-4 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-400/30">
              <Brain className="w-5 h-5 mr-3" />
              AI Agent Builder
            </Button>
          </Link>

          <Link href="/analytics" className="block w-full">
            <Button className="w-full justify-start glassmorphic-dark-button text-white font-semibold py-3 px-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-400/30">
              <BarChart className="w-5 h-5 mr-3" />
              Advanced Analytics
            </Button>
          </Link>

          <Link href="/learn-more" className="block w-full">
            <Button className="w-full justify-start glassmorphic-dark-button text-white font-semibold py-3 px-4">
              <BookOpen className="w-5 h-5 mr-3" />
              AI Research
            </Button>
          </Link>

          <Link href="/paper-trading" className="block w-full">
            <Button className="w-full justify-start glassmorphic-dark-button text-white font-semibold py-3 px-4">
              <BarChart3 className="w-5 h-5 mr-3" />
              Live Trading
            </Button>
          </Link>

          <Link href="/prompts" className="block w-full">
            <Button className="w-full justify-start glassmorphic-dark-button text-white font-semibold py-3 px-4">
              <MessageSquare className="w-5 h-5 mr-3" />
              AI Prompts
            </Button>
          </Link>

          <Button className="w-full justify-start glassmorphic-dark-button text-white font-semibold py-3 px-4">
            <RefreshCw className="w-5 h-5 mr-3" />
            Refresh
          </Button>

          <Link href="/my-ai" className="block w-full">
            <Button className="w-full justify-start glassmorphic-dark-button text-white font-semibold py-3 px-4">
              <Brain className="w-5 h-5 mr-3" />
              My AI
            </Button>
          </Link>
        </div>

        {/* Settings */}
        <div className="p-3 border-t border-green-400/20 flex-shrink-0">
          <Button className="w-full justify-start glassmorphic-dark-button text-white font-semibold py-3 px-4">
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="ml-64 relative z-10">
        {/* Top Status Bar */}
        <div className="bg-slate-900/40 backdrop-blur-md border-b border-green-400/20 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-green-400" />
                <span className="text-sm font-semibold">MARKET OPEN</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div className="text-sm text-gray-300">
                {aiAgents.filter((a) => a.status === "active").length} AI Agents Active
              </div>
              <div className="text-sm text-gray-300">
                {recursiveLoops.filter((l) => l.status === "running").length} Recursive Loops Running
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-600 text-white">Portfolio: $2.4M</Badge>
              <Badge className="bg-blue-600 text-white">Today: +$127K (+5.6%)</Badge>
            </div>
          </div>
        </div>

        {/* AI Agents Dashboard */}
        <div className="p-6 border-b border-green-400/20">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Brain className="w-6 h-6 mr-2 text-green-400" />
            Specialized AI Agents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {aiAgents.map((agent) => (
              <Card key={agent.id} className="bg-slate-800/60 backdrop-blur-md border border-green-400/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Cpu className="w-5 h-5 text-cyan-400" />
                      <span className="font-semibold text-white">{agent.name}</span>
                    </div>
                    <Badge className={`text-xs px-2 py-1 ${getAgentStatusColor(agent.status)}`}>
                      {agent.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Accuracy:</span>
                      <span className="text-green-400 font-bold">{agent.accuracy}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Predictions:</span>
                      <span className="text-white">{agent.predictions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Confidence:</span>
                      <span className="text-blue-400">{agent.confidence}%</span>
                    </div>
                    <div className="text-xs text-gray-300 mt-2">{agent.specialization}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recursive Learning Loops */}
        <div className="p-6 border-b border-green-400/20">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Network className="w-6 h-6 mr-2 text-cyan-400" />
            Recursive Learning Loops
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {recursiveLoops.map((loop) => (
              <Card key={loop.id} className="bg-slate-800/60 backdrop-blur-md border border-cyan-400/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-white">{loop.name}</span>
                    <Badge className={`text-xs px-2 py-1 ${getLoopStatusColor(loop.status)}`}>
                      {loop.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Iterations:</span>
                      <span className="text-cyan-400 font-mono">{loop.iterations.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Accuracy:</span>
                      <span className="text-green-400">{loop.currentAccuracy}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Improvement:</span>
                      <span className="text-yellow-400">+{loop.improvement}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2 mt-3">
                      <div
                        className="bg-gradient-to-r from-cyan-400 to-green-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(loop.currentAccuracy / loop.targetAccuracy) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Chat Interface - Compact */}
        <div className="h-[300px] flex flex-col border-b border-green-400/20">
          <div className="p-4 border-b border-green-400/20 bg-slate-900/60">
            <h3 className="text-lg font-bold flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-green-400" />
              AI Command Center
            </h3>
          </div>

          <div className="flex-1 p-4 space-y-3 overflow-y-auto chat-scroll">
            {messages.map((message) => (
              <div key={message.id} className="space-y-2">
                <div className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-2xl p-3 rounded-lg text-sm ${
                      message.type === "user"
                        ? "bg-green-600 text-white"
                        : "bg-slate-800/60 backdrop-blur-md border border-green-400/20"
                    }`}
                  >
                    {message.aiAgent && <div className="text-xs text-green-400 mb-1">[{message.aiAgent}]</div>}
                    <p>{message.content}</p>
                  </div>
                </div>

                {message.type === "assistant" && message.followUpQuestions && (
                  <div className="flex justify-start">
                    <div className="max-w-2xl grid grid-cols-2 gap-2">
                      {message.followUpQuestions.map((question, index) => (
                        <Button
                          key={index}
                          onClick={() => handleSendMessage(question)}
                          variant="outline"
                          size="sm"
                          className="text-left justify-start h-auto py-2 px-3 bg-slate-700/40 border-green-400/30 text-green-400 hover:bg-green-400/10 text-xs"
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800/60 backdrop-blur-md border border-green-400/20 p-3 rounded-lg">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-green-400/20 bg-slate-900/80 backdrop-blur-md">
            <div className="flex space-x-3">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Command the AI..."
                className="flex-1 bg-slate-800/50 border-green-400/30 text-white placeholder-gray-400 rounded-xl h-10"
              />
              <Button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-green-600 hover:bg-green-700 rounded-xl px-4 h-10"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Top 10 Predictions - Enhanced */}
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold shimmer-text mb-4">Elite AI Predictions</h2>
            <p className="text-xl text-gray-300 mb-6">
              Top 10 opportunities powered by {aiAgents.length} specialized AI agents
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span>Real-time Analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                <span>Recursive Learning</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <span>Risk Optimized</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
            {predictions.map((prediction, index) => (
              <Card
                key={prediction.id}
                className="bg-slate-800/60 backdrop-blur-md border-2 border-green-400/30 rounded-2xl hover:border-green-400/60 transition-all duration-300 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] glassmorphic-feature-card hover:scale-[1.02] relative overflow-hidden"
              >
                {/* Rank Badge */}
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full flex items-center justify-center text-slate-900 font-bold shadow-lg z-10">
                  {index + 1}
                </div>

                {/* Real-time Price Indicator */}
                <div className="absolute top-4 right-4 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400 font-mono">LIVE</span>
                </div>

                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-2xl font-bold text-white">{prediction.symbol}</h3>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span className="text-lg font-bold text-green-400">{prediction.confidence}%</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-300 mb-2">{prediction.name}</p>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className="text-xs bg-slate-700/50 text-gray-300">{prediction.sector}</Badge>
                        <Badge
                          className={`text-xs ${
                            prediction.action === "BUY"
                              ? "bg-green-500/20 text-green-400"
                              : prediction.action === "HOLD"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {prediction.action}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2 text-xs">
                        {prediction.aiAgents.map((agentId, idx) => (
                          <span key={idx} className="bg-cyan-400/20 text-cyan-400 px-2 py-1 rounded">
                            {aiAgents.find((a) => a.id === agentId)?.name.split(" ")[0]}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-white font-mono">${prediction.realTimePrice.toFixed(2)}</p>
                      <div
                        className={`flex items-center justify-end ${
                          prediction.priceChangePercent >= 0 ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {prediction.priceChangePercent >= 0 ? (
                          <TrendingUp className="w-4 h-4 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 mr-1" />
                        )}
                        <span className="font-mono">
                          {prediction.priceChangePercent >= 0 ? "+" : ""}
                          {prediction.priceChangePercent.toFixed(2)}%
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 font-mono">${Math.abs(prediction.priceChange).toFixed(2)}</p>
                    </div>
                  </div>

                  {/* AI Analysis */}
                  <div className="bg-slate-700/40 rounded-lg p-4 mb-4 border border-green-400/20">
                    <div className="flex items-center space-x-2 mb-2">
                      <Brain className="w-4 h-4 text-green-400" />
                      <span className="text-xs font-semibold text-green-400">AI CONSENSUS:</span>
                    </div>
                    <p className="text-sm text-white leading-relaxed">{prediction.aiSays}</p>
                  </div>

                  {/* Advanced Metrics Grid */}
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    <div className="bg-slate-700/30 rounded-lg p-3 text-center border border-green-400/10">
                      <p className="text-xs text-gray-400 mb-1">Growth</p>
                      <p className="text-sm font-bold text-green-400">{prediction.estimatedGrowth}</p>
                    </div>
                    <div className="bg-slate-700/30 rounded-lg p-3 text-center border border-green-400/10">
                      <p className="text-xs text-gray-400 mb-1">Risk</p>
                      <p className="text-sm font-bold text-yellow-400">{prediction.riskScore}/10</p>
                    </div>
                    <div className="bg-slate-700/30 rounded-lg p-3 text-center border border-green-400/10">
                      <p className="text-xs text-gray-400 mb-1">R/R</p>
                      <p className="text-sm font-bold text-cyan-400">{prediction.rewardRatio}:1</p>
                    </div>
                    <div className="bg-slate-700/30 rounded-lg p-3 text-center border border-green-400/10">
                      <p className="text-xs text-gray-400 mb-1">Success</p>
                      <p className="text-sm font-bold text-blue-400">{prediction.successRate}%</p>
                    </div>
                  </div>

                  {/* Technical Indicators */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-slate-700/30 rounded-lg p-3 border border-green-400/10">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-400">RSI</span>
                        <span className="text-sm font-mono text-white">{prediction.technicalIndicators.rsi}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">MACD</span>
                        <span
                          className={`text-xs font-semibold ${
                            prediction.technicalIndicators.macd === "bullish" ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          {prediction.technicalIndicators.macd.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="bg-slate-700/30 rounded-lg p-3 border border-green-400/10">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-400">Support</span>
                        <span className="text-sm font-mono text-green-400">
                          ${prediction.technicalIndicators.support}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">Resistance</span>
                        <span className="text-sm font-mono text-red-400">
                          ${prediction.technicalIndicators.resistance}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Alerts */}
                  {prediction.alerts.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-400" />
                        <span className="text-xs font-semibold text-yellow-400">LIVE ALERTS:</span>
                      </div>
                      <div className="space-y-1">
                        {prediction.alerts.map((alert, idx) => (
                          <div key={idx} className="text-xs text-yellow-300 bg-yellow-400/10 px-2 py-1 rounded">
                            {alert}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 text-sm">
                      <DollarSign className="w-4 h-4 mr-1" />
                      Trade Now
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-green-400/30 text-green-400 hover:bg-green-400/10 py-2 text-sm"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Watch
                    </Button>
                    <Button
                      variant="outline"
                      className="px-3 border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 py-2"
                    >
                      <Info className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Recursive Score Indicator */}
                  <div className="mt-4 pt-3 border-t border-green-400/20">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Recursive Score:</span>
                      <span className="text-cyan-400 font-bold">{prediction.recursiveScore}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-1 mt-1">
                      <div
                        className="bg-gradient-to-r from-cyan-400 to-green-400 h-1 rounded-full transition-all duration-300"
                        style={{ width: `${prediction.recursiveScore}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Performance Summary */}
          <div className="mt-12 text-center">
            <Card className="bg-slate-800/60 backdrop-blur-md border border-green-400/20 max-w-4xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6">AI Performance Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">94.2%</div>
                    <div className="text-sm text-gray-400">Average Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">$2.4M</div>
                    <div className="text-sm text-gray-400">Assets Under Management</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">47,892</div>
                    <div className="text-sm text-gray-400">Recursive Iterations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">6</div>
                    <div className="text-sm text-gray-400">Active AI Agents</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
