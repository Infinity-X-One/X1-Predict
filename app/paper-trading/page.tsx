"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, TrendingUp, DollarSign, Plus, Minus, Target, Clock, Star, Bell } from "lucide-react"
import Link from "next/link"

export default function PaperTradingPage() {
  const [portfolio] = useState([
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      shares: 50,
      avgPrice: 180.25,
      currentPrice: 185.4,
      type: "Long term",
      change: 2.86,
    },
    {
      symbol: "NVDA",
      name: "NVIDIA Corp.",
      shares: 25,
      avgPrice: 850.0,
      currentPrice: 875.3,
      type: "Short term",
      change: 2.98,
    },
    {
      symbol: "TSLA",
      name: "Tesla Inc.",
      shares: 30,
      avgPrice: 240.0,
      currentPrice: 248.5,
      type: "Long term",
      change: 3.54,
    },
  ])

  const [topPicks] = useState([
    {
      symbol: "GOOG",
      name: "Alphabet Inc.",
      action: "Try now",
      confidence: 82,
      timeLeft: "2 hours",
      urgency: "medium",
    },
    {
      symbol: "AMD",
      name: "Advanced Micro Devices",
      action: "Quick pop",
      confidence: 76,
      timeLeft: "30m left",
      urgency: "high",
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corp.",
      action: "Long term",
      confidence: 88,
      timeLeft: "3 days",
      urgency: "low",
    },
  ])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white">
      {/* Header */}
      <header className="p-6 border-b border-green-400/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/predict">
              <Button variant="ghost" className="text-white hover:text-green-400">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Paper Trading Portfolio</h1>
          </div>
          <Badge className="bg-green-600 text-white">Portfolio Value: $125,430</Badge>
        </div>
      </header>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* My Portfolio */}
          <Card className="bg-slate-900/60 backdrop-blur-md border-2 border-green-400 rounded-2xl shadow-[0_0_40px_rgba(34,197,94,0.3)]">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-green-400 flex items-center gap-3">
                <Target className="w-8 h-8" />
                MY PORTFOLIO
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {portfolio.map((stock) => (
                <div
                  key={stock.symbol}
                  className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 border border-green-400/20"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-400 to-blue-400 flex items-center justify-center">
                      <span className="font-bold text-slate-900">{stock.symbol.slice(0, 2)}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{stock.symbol}</h3>
                      <p className="text-sm text-gray-400">{stock.name}</p>
                      <Badge
                        variant="outline"
                        className={`mt-1 ${
                          stock.type === "Long term"
                            ? "text-green-400 border-green-400"
                            : "text-blue-400 border-blue-400"
                        }`}
                      >
                        {stock.type}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">${stock.currentPrice}</p>
                    <div className="flex items-center text-green-400">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span className="text-sm">+{stock.change}%</span>
                    </div>
                    <p className="text-xs text-gray-400">{stock.shares} shares</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Top Picks */}
          <Card className="bg-slate-900/60 backdrop-blur-md border-2 border-cyan-400 rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.3)]">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-cyan-400 flex items-center gap-3">
                <Star className="w-8 h-8" />
                TOP PICKS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {topPicks.map((pick) => (
                <div key={pick.symbol} className="p-4 rounded-xl bg-slate-800/50 border border-cyan-400/20">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-400 flex items-center justify-center">
                        <span className="font-bold text-slate-900 text-sm">{pick.symbol.slice(0, 2)}</span>
                      </div>
                      <div>
                        <h3 className="font-bold">{pick.symbol}</h3>
                        <p className="text-sm text-gray-400">{pick.name}</p>
                      </div>
                    </div>
                    {pick.urgency === "high" && <Bell className="w-5 h-5 text-red-400" />}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Badge
                        variant="outline"
                        className={`${
                          pick.action === "Try now"
                            ? "text-green-400 border-green-400"
                            : pick.action === "Quick pop"
                              ? "text-red-400 border-red-400"
                              : "text-blue-400 border-blue-400"
                        }`}
                      >
                        {pick.action}
                      </Badge>
                      <div className="flex items-center space-x-2 text-sm">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">{pick.timeLeft}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Confidence</p>
                      <p className="text-lg font-bold text-green-400">{pick.confidence}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Trading Interface */}
        <Card className="mt-8 bg-slate-900/60 backdrop-blur-md border-2 border-yellow-400 rounded-2xl shadow-[0_0_40px_rgba(251,191,36,0.3)]">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-yellow-400 flex items-center gap-3">
              <DollarSign className="w-8 h-8" />
              Execute Trades
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">
                    <Plus className="w-5 h-5 mr-2" />
                    Buy
                  </Button>
                  <Button className="flex-1 bg-red-600 hover:bg-red-700">
                    <Minus className="w-5 h-5 mr-2" />
                    Sell
                  </Button>
                </div>
                <Input placeholder="Stock Symbol" className="bg-slate-800/50 border-yellow-400/30" />
                <Input placeholder="Number of Shares" className="bg-slate-800/50 border-yellow-400/30" />
                <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-slate-900 font-bold">
                  Execute Order
                </Button>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-800/50 border border-yellow-400/20">
                  <h4 className="font-bold mb-3">Portfolio Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Value</span>
                      <span className="text-green-400 font-bold">$125,430</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Day Change</span>
                      <span className="text-green-400 font-bold">+$3,240 (+2.65%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Available Cash</span>
                      <span className="text-white font-bold">$24,570</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
