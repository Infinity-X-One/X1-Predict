"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Activity,
  Database,
  Cpu,
  Network,
  Brain,
  TrendingUp,
  BarChart3,
  Clock,
  Shield,
  Target,
  Eye,
  Settings,
  Play,
  Pause,
} from "lucide-react"
import Link from "next/link"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

interface CronJob {
  id: string
  name: string
  status: "running" | "paused" | "error" | "completed"
  lastRun: Date
  nextRun: Date
  frequency: string
  dataPoints: number
  accuracy: number
  type: "scraper" | "predictor" | "analyzer" | "optimizer"
  target: string
  performance: number[]
}

interface MarketData {
  timestamp: Date
  price: number
  volume: number
  predicted?: boolean
}

interface AIAgent {
  id: string
  name: string
  status: "active" | "learning" | "idle"
  accuracy: number
  dataProcessed: number
  predictions: number
  specialty: string
}

export default function ProofPage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isLiveMode, setIsLiveMode] = useState(true)
  const chartRef = useRef<any>(null)

  // Cron Jobs State
  const [cronJobs, setCronJobs] = useState<CronJob[]>([
    {
      id: "price-scraper",
      name: "Real-time Price Scraper",
      status: "running",
      lastRun: new Date(),
      nextRun: new Date(Date.now() + 5000),
      frequency: "Every 5 seconds",
      dataPoints: 15847,
      accuracy: 99.8,
      type: "scraper",
      target: "NYSE, NASDAQ, CRYPTO",
      performance: [98.2, 98.7, 99.1, 99.3, 99.8],
    },
    {
      id: "sentiment-analyzer",
      name: "Social Sentiment Analyzer",
      status: "running",
      lastRun: new Date(),
      nextRun: new Date(Date.now() + 30000),
      frequency: "Every 30 seconds",
      dataPoints: 8934,
      accuracy: 94.5,
      type: "analyzer",
      target: "Twitter, Reddit, News",
      performance: [92.1, 93.4, 94.1, 94.3, 94.5],
    },
    {
      id: "pattern-predictor",
      name: "Pattern Recognition Engine",
      status: "running",
      lastRun: new Date(),
      nextRun: new Date(Date.now() + 60000),
      frequency: "Every 1 minute",
      dataPoints: 23456,
      accuracy: 96.7,
      type: "predictor",
      target: "Chart Patterns",
      performance: [94.2, 95.1, 95.8, 96.2, 96.7],
    },
    {
      id: "risk-optimizer",
      name: "Risk Optimization Bot",
      status: "running",
      lastRun: new Date(),
      nextRun: new Date(Date.now() + 120000),
      frequency: "Every 2 minutes",
      dataPoints: 12789,
      accuracy: 98.2,
      type: "optimizer",
      target: "Portfolio Risk",
      performance: [96.8, 97.2, 97.6, 98.0, 98.2],
    },
    {
      id: "news-scraper",
      name: "Financial News Scraper",
      status: "running",
      lastRun: new Date(),
      nextRun: new Date(Date.now() + 15000),
      frequency: "Every 15 seconds",
      dataPoints: 34567,
      accuracy: 97.3,
      type: "scraper",
      target: "Bloomberg, Reuters, WSJ",
      performance: [95.1, 96.2, 96.8, 97.0, 97.3],
    },
    {
      id: "volume-analyzer",
      name: "Volume Flow Analyzer",
      status: "running",
      lastRun: new Date(),
      nextRun: new Date(Date.now() + 10000),
      frequency: "Every 10 seconds",
      dataPoints: 45678,
      accuracy: 95.8,
      type: "analyzer",
      target: "Trading Volume",
      performance: [93.4, 94.1, 94.8, 95.2, 95.8],
    },
  ])

  // AI Agents State
  const [aiAgents] = useState<AIAgent[]>([
    {
      id: "finsynapse",
      name: "FinSynapse Master AI",
      status: "active",
      accuracy: 98.7,
      dataProcessed: 2847593,
      predictions: 15847,
      specialty: "Master Coordinator & Decision Engine",
    },
    {
      id: "quantum-predictor",
      name: "Quantum Price Predictor",
      status: "active",
      accuracy: 96.4,
      dataProcessed: 1847293,
      predictions: 8934,
      specialty: "Quantum Algorithm Price Prediction",
    },
    {
      id: "neural-sentiment",
      name: "Neural Sentiment Bot",
      status: "active",
      accuracy: 94.8,
      dataProcessed: 3847592,
      predictions: 23456,
      specialty: "Deep Learning Sentiment Analysis",
    },
    {
      id: "pattern-hunter",
      name: "Pattern Hunter AI",
      status: "learning",
      accuracy: 97.2,
      dataProcessed: 1234567,
      predictions: 12789,
      specialty: "Advanced Pattern Recognition",
    },
  ])

  // Market Data with Predictions
  const [marketData, setMarketData] = useState<MarketData[]>(() => {
    const data: MarketData[] = []
    const now = new Date()

    // Historical data (last 30 points)
    for (let i = 29; i >= 0; i--) {
      const timestamp = new Date(now.getTime() - i * 60000) // 1 minute intervals
      const basePrice = 875 + Math.sin(i * 0.1) * 20
      const noise = (Math.random() - 0.5) * 10
      data.push({
        timestamp,
        price: basePrice + noise,
        volume: Math.floor(Math.random() * 1000000) + 500000,
        predicted: false,
      })
    }

    // Predicted data (next 10 points)
    const lastPrice = data[data.length - 1].price
    for (let i = 1; i <= 10; i++) {
      const timestamp = new Date(now.getTime() + i * 60000)
      const trend = 1.02 // 2% growth trend
      const predictedPrice = lastPrice * Math.pow(trend, i * 0.1) + (Math.random() - 0.5) * 5
      data.push({
        timestamp,
        price: predictedPrice,
        volume: Math.floor(Math.random() * 800000) + 400000,
        predicted: true,
      })
    }

    return data
  })

  // Portfolio Performance Data
  const [portfolioData] = useState({
    totalValue: 2847593.45,
    dayChange: 127834.67,
    dayChangePercent: 4.69,
    positions: 47,
    winRate: 89.7,
    sharpeRatio: 2.34,
    maxDrawdown: -3.2,
    alpha: 15.8,
  })

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())

      if (isLiveMode) {
        // Update cron job statuses
        setCronJobs((prev) =>
          prev.map((job) => ({
            ...job,
            lastRun: new Date(),
            nextRun: new Date(Date.now() + Number.parseInt(job.frequency.match(/\d+/)?.[0] || "5") * 1000),
            dataPoints: job.dataPoints + Math.floor(Math.random() * 10) + 1,
            accuracy: Math.min(99.9, job.accuracy + (Math.random() - 0.5) * 0.1),
          })),
        )

        // Update market data
        setMarketData((prev) => {
          const newData = [...prev]
          const lastHistorical = newData.filter((d) => !d.predicted).pop()
          if (lastHistorical) {
            const newPrice = lastHistorical.price + (Math.random() - 0.5) * 2
            const newPoint: MarketData = {
              timestamp: new Date(),
              price: newPrice,
              volume: Math.floor(Math.random() * 1000000) + 500000,
              predicted: false,
            }

            // Remove oldest point and add new one
            const historicalData = newData.filter((d) => !d.predicted)
            const predictedData = newData.filter((d) => d.predicted)

            if (historicalData.length >= 30) {
              historicalData.shift()
            }
            historicalData.push(newPoint)

            // Update predictions based on new data
            const lastPrice = newPoint.price
            const updatedPredictions = predictedData.map((point, index) => ({
              ...point,
              price: lastPrice * Math.pow(1.02, (index + 1) * 0.1) + (Math.random() - 0.5) * 5,
            }))

            return [...historicalData, ...updatedPredictions]
          }
          return prev
        })
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [isLiveMode])

  // Chart configuration
  const chartData = {
    labels: marketData.map((d) => d.timestamp.toLocaleTimeString()),
    datasets: [
      {
        label: "Historical Price",
        data: marketData.filter((d) => !d.predicted).map((d) => d.price),
        borderColor: "#22c55e",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
      },
      {
        label: "AI Prediction",
        data: [
          ...Array(marketData.filter((d) => !d.predicted).length - 1).fill(null),
          marketData.filter((d) => !d.predicted).pop()?.price,
          ...marketData.filter((d) => d.predicted).map((d) => d.price),
        ],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderWidth: 3,
        borderDash: [10, 5],
        fill: false,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#ffffff",
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderColor: "#22c55e",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          color: "rgba(34, 197, 94, 0.1)",
        },
        ticks: {
          color: "#94a3b8",
          maxTicksLimit: 10,
        },
      },
      y: {
        display: true,
        grid: {
          color: "rgba(34, 197, 94, 0.1)",
        },
        ticks: {
          color: "#94a3b8",
          callback: (value: any) => "$" + value.toFixed(2),
        },
      },
    },
    interaction: {
      mode: "nearest" as const,
      axis: "x" as const,
      intersect: false,
    },
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "text-green-400 bg-green-400/20"
      case "paused":
        return "text-yellow-400 bg-yellow-400/20"
      case "error":
        return "text-red-400 bg-red-400/20"
      case "completed":
        return "text-blue-400 bg-blue-400/20"
      default:
        return "text-gray-400 bg-gray-400/20"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "scraper":
        return <Database className="w-4 h-4" />
      case "predictor":
        return <Brain className="w-4 h-4" />
      case "analyzer":
        return <BarChart3 className="w-4 h-4" />
      case "optimizer":
        return <Target className="w-4 h-4" />
      default:
        return <Cpu className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse-medium"></div>
      </div>

      {/* Header */}
      <header className="relative z-20 p-6 border-b border-green-400/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/predict">
              <Button variant="ghost" className="text-white hover:text-green-400">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Proof of Concept</h1>
              <p className="text-green-400">Advanced Cron Jobs & Real-time Analytics</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setIsLiveMode(!isLiveMode)}
              className={`${isLiveMode ? "bg-green-600 hover:bg-green-700" : "bg-gray-600 hover:bg-gray-700"}`}
            >
              {isLiveMode ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isLiveMode ? "Live Mode" : "Paused"}
            </Button>
            <Badge className="bg-green-600 text-white">{currentTime.toLocaleTimeString()}</Badge>
          </div>
        </div>
      </header>

      <div className="relative z-10 p-6">
        {/* System Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-900/60 backdrop-blur-md border border-green-400/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Portfolio Value</p>
                  <p className="text-2xl font-bold text-green-400">${portfolioData.totalValue.toLocaleString()}</p>
                  <p className="text-sm text-green-400">
                    +${portfolioData.dayChange.toLocaleString()} ({portfolioData.dayChangePercent}%)
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/60 backdrop-blur-md border border-cyan-400/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Active Cron Jobs</p>
                  <p className="text-2xl font-bold text-cyan-400">
                    {cronJobs.filter((job) => job.status === "running").length}
                  </p>
                  <p className="text-sm text-cyan-400">
                    {cronJobs.reduce((sum, job) => sum + job.dataPoints, 0).toLocaleString()} data points
                  </p>
                </div>
                <Activity className="w-8 h-8 text-cyan-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/60 backdrop-blur-md border border-yellow-400/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">AI Agents</p>
                  <p className="text-2xl font-bold text-yellow-400">
                    {aiAgents.filter((agent) => agent.status === "active").length}
                  </p>
                  <p className="text-sm text-yellow-400">
                    {(aiAgents.reduce((sum, agent) => sum + agent.accuracy, 0) / aiAgents.length).toFixed(1)}% avg
                    accuracy
                  </p>
                </div>
                <Brain className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/60 backdrop-blur-md border border-purple-400/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Win Rate</p>
                  <p className="text-2xl font-bold text-purple-400">{portfolioData.winRate}%</p>
                  <p className="text-sm text-purple-400">Sharpe: {portfolioData.sharpeRatio}</p>
                </div>
                <Shield className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Chart */}
        <Card className="bg-slate-900/60 backdrop-blur-md border-2 border-green-400/30 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-2xl font-bold text-green-400">Real-time Price Prediction</span>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-sm">Historical</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-sm">AI Prediction</span>
                </div>
                <Badge className="bg-green-600 text-white">
                  NVDA $
                  {marketData
                    .filter((d) => !d.predicted)
                    .pop()
                    ?.price.toFixed(2)}
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <Line ref={chartRef} data={chartData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>

        {/* Cron Jobs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-slate-900/60 backdrop-blur-md border border-green-400/20">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-green-400 flex items-center">
                <Clock className="w-6 h-6 mr-2" />
                Active Cron Jobs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cronJobs.map((job) => (
                <div key={job.id} className="bg-slate-800/50 rounded-lg p-4 border border-green-400/10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getTypeIcon(job.type)}
                      <div>
                        <h4 className="font-semibold text-white">{job.name}</h4>
                        <p className="text-xs text-gray-400">{job.target}</p>
                      </div>
                    </div>
                    <Badge className={`text-xs px-2 py-1 ${getStatusColor(job.status)}`}>
                      {job.status.toUpperCase()}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Frequency</p>
                      <p className="text-white font-mono">{job.frequency}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Data Points</p>
                      <p className="text-cyan-400 font-mono">{job.dataPoints.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Accuracy</p>
                      <p className="text-green-400 font-mono">{job.accuracy.toFixed(1)}%</p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Performance Trend</span>
                      <span>Last 5 runs</span>
                    </div>
                    <div className="flex space-x-1">
                      {job.performance.map((perf, index) => (
                        <div key={index} className="flex-1 bg-slate-700 rounded-sm h-2 relative overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-green-400 to-cyan-400 h-full transition-all duration-300"
                            style={{ width: `${perf}%` }}
                          ></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 flex justify-between text-xs">
                    <span className="text-gray-400">Last: {job.lastRun.toLocaleTimeString()}</span>
                    <span className="text-green-400">Next: {job.nextRun.toLocaleTimeString()}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* AI Agents Status */}
          <Card className="bg-slate-900/60 backdrop-blur-md border border-cyan-400/20">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-cyan-400 flex items-center">
                <Brain className="w-6 h-6 mr-2" />
                AI Agent Network
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiAgents.map((agent) => (
                <div key={agent.id} className="bg-slate-800/50 rounded-lg p-4 border border-cyan-400/10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-lg flex items-center justify-center">
                        <Brain className="w-5 h-5 text-slate-900" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{agent.name}</h4>
                        <p className="text-xs text-gray-400">{agent.specialty}</p>
                      </div>
                    </div>
                    <Badge
                      className={`text-xs px-2 py-1 ${
                        agent.status === "active"
                          ? "text-green-400 bg-green-400/20"
                          : agent.status === "learning"
                            ? "text-yellow-400 bg-yellow-400/20"
                            : "text-gray-400 bg-gray-400/20"
                      }`}
                    >
                      {agent.status.toUpperCase()}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Accuracy</p>
                      <p className="text-green-400 font-mono">{agent.accuracy}%</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Data Processed</p>
                      <p className="text-cyan-400 font-mono">{agent.dataProcessed.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Predictions</p>
                      <p className="text-blue-400 font-mono">{agent.predictions.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-cyan-400 to-green-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${agent.accuracy}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-6">
                <Link href="/ai-agents">
                  <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3">
                    <Settings className="w-5 h-5 mr-2" />
                    Manage AI Agents
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Real-time Data Feed */}
        <Card className="bg-slate-900/60 backdrop-blur-md border border-yellow-400/20">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-yellow-400 flex items-center justify-between">
              <div className="flex items-center">
                <Network className="w-6 h-6 mr-2" />
                Live Data Stream
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-400">STREAMING</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-800/50 rounded-lg p-4 border border-green-400/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Price Updates</span>
                  <Eye className="w-4 h-4 text-green-400" />
                </div>
                <p className="text-2xl font-bold text-green-400">
                  {cronJobs.find((j) => j.id === "price-scraper")?.dataPoints.toLocaleString()}
                </p>
                <p className="text-xs text-green-400">+{Math.floor(Math.random() * 10) + 1}/sec</p>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4 border border-cyan-400/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Sentiment Data</span>
                  <BarChart3 className="w-4 h-4 text-cyan-400" />
                </div>
                <p className="text-2xl font-bold text-cyan-400">
                  {cronJobs.find((j) => j.id === "sentiment-analyzer")?.dataPoints.toLocaleString()}
                </p>
                <p className="text-xs text-cyan-400">+{Math.floor(Math.random() * 5) + 1}/30sec</p>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4 border border-yellow-400/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">News Articles</span>
                  <Database className="w-4 h-4 text-yellow-400" />
                </div>
                <p className="text-2xl font-bold text-yellow-400">
                  {cronJobs.find((j) => j.id === "news-scraper")?.dataPoints.toLocaleString()}
                </p>
                <p className="text-xs text-yellow-400">+{Math.floor(Math.random() * 3) + 1}/15sec</p>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4 border border-purple-400/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Volume Analysis</span>
                  <TrendingUp className="w-4 h-4 text-purple-400" />
                </div>
                <p className="text-2xl font-bold text-purple-400">
                  {cronJobs.find((j) => j.id === "volume-analyzer")?.dataPoints.toLocaleString()}
                </p>
                <p className="text-xs text-purple-400">+{Math.floor(Math.random() * 8) + 1}/10sec</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
