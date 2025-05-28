"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, TrendingUp, BarChart3, Activity, Target, Brain, Zap, Eye, RefreshCw } from "lucide-react"
import Link from "next/link"
import { Line, Bar, Doughnut } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
)

interface ChartData {
  labels: string[]
  historical: number[]
  predicted: number[]
  volume: number[]
  sentiment: number[]
}

export default function AnalyticsPage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedTimeframe, setSelectedTimeframe] = useState("1D")
  const [isLiveMode, setIsLiveMode] = useState(true)

  // Generate realistic market data with predictions
  const [chartData, setChartData] = useState<ChartData>(() => {
    const labels: string[] = []
    const historical: number[] = []
    const predicted: number[] = []
    const volume: number[] = []
    const sentiment: number[] = []

    const now = new Date()
    const basePrice = 875

    // Historical data (70% of chart)
    for (let i = 49; i >= 0; i--) {
      const timestamp = new Date(now.getTime() - i * 60000)
      labels.push(timestamp.toLocaleTimeString())

      const trend = Math.sin(i * 0.1) * 20
      const noise = (Math.random() - 0.5) * 15
      const price = basePrice + trend + noise
      historical.push(price)

      volume.push(Math.floor(Math.random() * 2000000) + 500000)
      sentiment.push(Math.random() * 100)
    }

    // Predicted data (30% of chart - last 15 points)
    const lastPrice = historical[historical.length - 1]
    for (let i = 1; i <= 15; i++) {
      const timestamp = new Date(now.getTime() + i * 60000)
      labels.push(timestamp.toLocaleTimeString())

      // AI prediction with upward trend
      const growthFactor = 1.02 // 2% growth trend
      const aiNoise = (Math.random() - 0.3) * 8 // Slightly optimistic bias
      const predictedPrice = lastPrice * Math.pow(growthFactor, i * 0.1) + aiNoise

      predicted.push(predictedPrice)
      volume.push(Math.floor(Math.random() * 1500000) + 400000)
      sentiment.push(60 + Math.random() * 35) // More positive sentiment in predictions
    }

    return { labels, historical, predicted, volume, sentiment }
  })

  // Portfolio performance data
  const [portfolioMetrics] = useState({
    totalReturn: 34.7,
    sharpeRatio: 2.34,
    maxDrawdown: -8.2,
    winRate: 89.7,
    alpha: 15.8,
    beta: 0.87,
    volatility: 12.3,
    sortino: 3.21,
  })

  // AI Performance data
  const [aiMetrics] = useState({
    accuracy: 94.2,
    precision: 91.8,
    recall: 96.5,
    f1Score: 94.1,
    confidence: 87.3,
    learningRate: 0.023,
    iterations: 47892,
    dataPoints: 2847593,
  })

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())

      if (isLiveMode) {
        setChartData((prev) => {
          const newData = { ...prev }

          // Update last historical point
          const lastHistoricalIndex = prev.historical.length - 1
          const currentPrice = prev.historical[lastHistoricalIndex]
          const priceChange = (Math.random() - 0.5) * 3
          newData.historical[lastHistoricalIndex] = Math.max(0, currentPrice + priceChange)

          // Update predictions based on new data
          const newLastPrice = newData.historical[lastHistoricalIndex]
          newData.predicted = newData.predicted.map((_, index) => {
            const growthFactor = 1.02
            const aiNoise = (Math.random() - 0.3) * 8
            return newLastPrice * Math.pow(growthFactor, (index + 1) * 0.1) + aiNoise
          })

          return newData
        })
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [isLiveMode])

  // Chart configurations
  const priceChartData = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Historical Price",
        data: [...chartData.historical, ...Array(chartData.predicted.length).fill(null)],
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
          ...Array(chartData.historical.length - 1).fill(null),
          chartData.historical[chartData.historical.length - 1],
          ...chartData.predicted,
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

  const volumeChartData = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Volume",
        data: [...chartData.volume, ...Array(chartData.predicted.length).fill(null)],
        backgroundColor: "rgba(34, 197, 94, 0.6)",
        borderColor: "#22c55e",
        borderWidth: 1,
      },
    ],
  }

  const sentimentChartData = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Market Sentiment",
        data: chartData.sentiment,
        borderColor: "#f59e0b",
        backgroundColor: "rgba(245, 158, 11, 0.1)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 1,
        pointHoverRadius: 4,
      },
    ],
  }

  const portfolioDistributionData = {
    labels: ["NVDA", "TSLA", "MSFT", "AAPL", "GOOGL", "Others"],
    datasets: [
      {
        data: [28, 22, 18, 15, 12, 5],
        backgroundColor: ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#6b7280"],
        borderColor: "#1e293b",
        borderWidth: 2,
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
          font: { size: 12 },
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
        grid: { color: "rgba(34, 197, 94, 0.1)" },
        ticks: { color: "#94a3b8", maxTicksLimit: 10 },
      },
      y: {
        display: true,
        grid: { color: "rgba(34, 197, 94, 0.1)" },
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

  const volumeChartOptions = {
    ...chartOptions,
    scales: {
      ...chartOptions.scales,
      y: {
        ...chartOptions.scales.y,
        ticks: {
          color: "#94a3b8",
          callback: (value: any) => (value / 1000000).toFixed(1) + "M",
        },
      },
    },
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
              <h1 className="text-3xl font-bold">Advanced Analytics</h1>
              <p className="text-green-400">Real-time Performance & Prediction Analytics</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              {["1H", "1D", "1W", "1M"].map((timeframe) => (
                <Button
                  key={timeframe}
                  onClick={() => setSelectedTimeframe(timeframe)}
                  className={`px-3 py-1 text-sm ${
                    selectedTimeframe === timeframe
                      ? "bg-green-600 text-white"
                      : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                  }`}
                >
                  {timeframe}
                </Button>
              ))}
            </div>
            <Button
              onClick={() => setIsLiveMode(!isLiveMode)}
              className={`${isLiveMode ? "bg-green-600 hover:bg-green-700" : "bg-gray-600 hover:bg-gray-700"}`}
            >
              <Activity className="w-4 h-4 mr-2" />
              {isLiveMode ? "Live" : "Paused"}
            </Button>
            <Badge className="bg-green-600 text-white">{currentTime.toLocaleTimeString()}</Badge>
          </div>
        </div>
      </header>

      <div className="relative z-10 p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
          <Card className="bg-slate-900/60 backdrop-blur-md border border-green-400/20">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Total Return</p>
              <p className="text-xl font-bold text-green-400">{portfolioMetrics.totalReturn}%</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/60 backdrop-blur-md border border-cyan-400/20">
            <CardContent className="p-4 text-center">
              <Target className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Sharpe Ratio</p>
              <p className="text-xl font-bold text-cyan-400">{portfolioMetrics.sharpeRatio}</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/60 backdrop-blur-md border border-yellow-400/20">
            <CardContent className="p-4 text-center">
              <BarChart3 className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Win Rate</p>
              <p className="text-xl font-bold text-yellow-400">{portfolioMetrics.winRate}%</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/60 backdrop-blur-md border border-purple-400/20">
            <CardContent className="p-4 text-center">
              <Brain className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <p className="text-sm text-gray-400">AI Accuracy</p>
              <p className="text-xl font-bold text-purple-400">{aiMetrics.accuracy}%</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/60 backdrop-blur-md border border-red-400/20">
            <CardContent className="p-4 text-center">
              <Activity className="w-6 h-6 text-red-400 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Max Drawdown</p>
              <p className="text-xl font-bold text-red-400">{portfolioMetrics.maxDrawdown}%</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/60 backdrop-blur-md border border-blue-400/20">
            <CardContent className="p-4 text-center">
              <Zap className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Alpha</p>
              <p className="text-xl font-bold text-blue-400">{portfolioMetrics.alpha}%</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/60 backdrop-blur-md border border-orange-400/20">
            <CardContent className="p-4 text-center">
              <Eye className="w-6 h-6 text-orange-400 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Volatility</p>
              <p className="text-xl font-bold text-orange-400">{portfolioMetrics.volatility}%</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/60 backdrop-blur-md border border-pink-400/20">
            <CardContent className="p-4 text-center">
              <RefreshCw className="w-6 h-6 text-pink-400 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Sortino</p>
              <p className="text-xl font-bold text-pink-400">{portfolioMetrics.sortino}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Price Prediction Chart */}
          <Card className="bg-slate-900/60 backdrop-blur-md border-2 border-green-400/30">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-xl font-bold text-green-400">Price Prediction Analysis</span>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-sm">Historical</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <span className="text-sm">AI Prediction</span>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <Line data={priceChartData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>

          {/* Volume Analysis */}
          <Card className="bg-slate-900/60 backdrop-blur-md border-2 border-cyan-400/30">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-cyan-400">Volume Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <Bar data={volumeChartData} options={volumeChartOptions} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Market Sentiment */}
          <Card className="bg-slate-900/60 backdrop-blur-md border-2 border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-yellow-400">Market Sentiment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <Line data={sentimentChartData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>

          {/* Portfolio Distribution */}
          <Card className="bg-slate-900/60 backdrop-blur-md border-2 border-purple-400/30">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-purple-400">Portfolio Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <Doughnut
                  data={portfolioDistributionData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "right" as const,
                        labels: {
                          color: "#ffffff",
                          font: { size: 12 },
                        },
                      },
                    },
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Performance Metrics */}
        <Card className="bg-slate-900/60 backdrop-blur-md border-2 border-green-400/30">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-green-400 flex items-center">
              <Brain className="w-6 h-6 mr-2" />
              AI Performance Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-400 mb-2">Accuracy</p>
                <p className="text-3xl font-bold text-green-400">{aiMetrics.accuracy}%</p>
                <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                  <div
                    className="bg-green-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${aiMetrics.accuracy}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-400 mb-2">Precision</p>
                <p className="text-3xl font-bold text-cyan-400">{aiMetrics.precision}%</p>
                <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                  <div
                    className="bg-cyan-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${aiMetrics.precision}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-400 mb-2">Recall</p>
                <p className="text-3xl font-bold text-yellow-400">{aiMetrics.recall}%</p>
                <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${aiMetrics.recall}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-400 mb-2">F1 Score</p>
                <p className="text-3xl font-bold text-purple-400">{aiMetrics.f1Score}%</p>
                <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                  <div
                    className="bg-purple-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${aiMetrics.f1Score}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
              <div className="bg-slate-800/50 rounded-lg p-4">
                <p className="text-sm text-gray-400">Confidence Level</p>
                <p className="text-2xl font-bold text-blue-400">{aiMetrics.confidence}%</p>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4">
                <p className="text-sm text-gray-400">Learning Rate</p>
                <p className="text-2xl font-bold text-orange-400">{aiMetrics.learningRate}</p>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4">
                <p className="text-sm text-gray-400">Iterations</p>
                <p className="text-2xl font-bold text-pink-400">{aiMetrics.iterations.toLocaleString()}</p>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4">
                <p className="text-sm text-gray-400">Data Points</p>
                <p className="text-2xl font-bold text-red-400">{aiMetrics.dataPoints.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
