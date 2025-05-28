"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Brain, Zap, Target, TrendingUp, Shield, Clock, Check } from "lucide-react"
import Link from "next/link"

export default function MyAIPage() {
  const [selectedPersonality, setSelectedPersonality] = useState("balanced")

  const aiPersonalities = [
    {
      id: "aggressive",
      name: "Aggressive Trader",
      icon: Zap,
      description: "High-risk, high-reward strategies with quick decision making",
      traits: ["Day trading focus", "High volatility tolerance", "Quick profit targets", "Momentum-based"],
      riskLevel: "High",
      timeframe: "Minutes to Hours",
      color: "red",
    },
    {
      id: "balanced",
      name: "Balanced Investor",
      icon: Target,
      description: "Moderate risk with diversified portfolio approach",
      traits: ["Diversified strategies", "Medium-term outlook", "Risk-adjusted returns", "Fundamental analysis"],
      riskLevel: "Medium",
      timeframe: "Weeks to Months",
      color: "green",
    },
    {
      id: "conservative",
      name: "Conservative Advisor",
      icon: Shield,
      description: "Low-risk, steady growth with capital preservation focus",
      traits: ["Capital preservation", "Dividend focus", "Blue-chip stocks", "Long-term stability"],
      riskLevel: "Low",
      timeframe: "Months to Years",
      color: "blue",
    },
    {
      id: "growth",
      name: "Growth Hunter",
      icon: TrendingUp,
      description: "Focus on high-growth potential stocks and emerging sectors",
      traits: ["Growth stock focus", "Tech and innovation", "Emerging markets", "Future trends"],
      riskLevel: "Medium-High",
      timeframe: "Months to Years",
      color: "purple",
    },
    {
      id: "analytical",
      name: "Data Analyst",
      icon: Brain,
      description: "Deep technical and fundamental analysis with data-driven decisions",
      traits: ["Technical analysis", "Chart patterns", "Financial metrics", "Quantitative approach"],
      riskLevel: "Medium",
      timeframe: "Days to Weeks",
      color: "cyan",
    },
    {
      id: "scalper",
      name: "Speed Scalper",
      icon: Clock,
      description: "Ultra-fast trading with micro-profit strategies",
      traits: ["Micro-timeframes", "High frequency", "Small profits", "Technical precision"],
      riskLevel: "Very High",
      timeframe: "Seconds to Minutes",
      color: "orange",
    },
  ]

  const getColorClasses = (color: string, selected: boolean) => {
    const baseClasses = selected ? "border-2" : "border"
    switch (color) {
      case "red":
        return `${baseClasses} ${selected ? "border-red-400 bg-red-400/10" : "border-red-400/20"}`
      case "green":
        return `${baseClasses} ${selected ? "border-green-400 bg-green-400/10" : "border-green-400/20"}`
      case "blue":
        return `${baseClasses} ${selected ? "border-blue-400 bg-blue-400/10" : "border-blue-400/20"}`
      case "purple":
        return `${baseClasses} ${selected ? "border-purple-400 bg-purple-400/10" : "border-purple-400/20"}`
      case "cyan":
        return `${baseClasses} ${selected ? "border-cyan-400 bg-cyan-400/10" : "border-cyan-400/20"}`
      case "orange":
        return `${baseClasses} ${selected ? "border-orange-400 bg-orange-400/10" : "border-orange-400/20"}`
      default:
        return `${baseClasses} ${selected ? "border-green-400 bg-green-400/10" : "border-green-400/20"}`
    }
  }

  const getIconColor = (color: string) => {
    switch (color) {
      case "red":
        return "text-red-400"
      case "green":
        return "text-green-400"
      case "blue":
        return "text-blue-400"
      case "purple":
        return "text-purple-400"
      case "cyan":
        return "text-cyan-400"
      case "orange":
        return "text-orange-400"
      default:
        return "text-green-400"
    }
  }

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
            <h1 className="text-3xl font-bold">Customize My AI</h1>
          </div>
          <Badge className="bg-green-600 text-white">
            Current: {aiPersonalities.find((p) => p.id === selectedPersonality)?.name}
          </Badge>
        </div>
      </header>

      <div className="p-6">
        {/* Description */}
        <div className="mb-8">
          <Card className="bg-slate-900/60 backdrop-blur-md border border-green-400/20 rounded-2xl">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Choose Your AI Trading Personality</h2>
              <p className="text-gray-300">
                Select an AI personality that matches your trading style and risk tolerance. Each personality has unique
                characteristics that will influence the recommendations, analysis, and strategies provided by your AI
                assistant.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* AI Personalities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {aiPersonalities.map((personality) => {
            const IconComponent = personality.icon
            const isSelected = selectedPersonality === personality.id

            return (
              <Card
                key={personality.id}
                onClick={() => setSelectedPersonality(personality.id)}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 bg-slate-900/60 backdrop-blur-md rounded-2xl glassmorphic-feature-card ${getColorClasses(personality.color, isSelected)}`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <IconComponent className={`w-8 h-8 ${getIconColor(personality.color)}`} />
                      <CardTitle className="text-lg">{personality.name}</CardTitle>
                    </div>
                    {isSelected && <Check className="w-6 h-6 text-green-400" />}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-300">{personality.description}</p>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-400">Risk Level:</span>
                      <Badge variant="outline" className={`text-xs ${getIconColor(personality.color)} border-current`}>
                        {personality.riskLevel}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-400">Timeframe:</span>
                      <span className="text-xs text-gray-300">{personality.timeframe}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Key Traits:</h4>
                    <div className="space-y-1">
                      {personality.traits.map((trait, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div
                            className={`w-2 h-2 rounded-full ${getIconColor(personality.color).replace("text-", "bg-")}`}
                          ></div>
                          <span className="text-xs text-gray-300">{trait}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Selected Personality Details */}
        {selectedPersonality && (
          <Card className="bg-slate-900/60 backdrop-blur-md border-2 border-green-400 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl text-green-400">
                Selected: {aiPersonalities.find((p) => p.id === selectedPersonality)?.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-300">{aiPersonalities.find((p) => p.id === selectedPersonality)?.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-800/50 border border-green-400/20">
                  <h4 className="font-semibold mb-2">What to Expect</h4>
                  <p className="text-sm text-gray-300">
                    Your AI will provide recommendations and analysis tailored to this personality's approach and risk
                    tolerance.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/50 border border-green-400/20">
                  <h4 className="font-semibold mb-2">Communication Style</h4>
                  <p className="text-sm text-gray-300">
                    Responses will match the urgency and detail level appropriate for this trading style.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/50 border border-green-400/20">
                  <h4 className="font-semibold mb-2">Recommendation Focus</h4>
                  <p className="text-sm text-gray-300">
                    Stock picks and strategies will align with this personality's timeframe and risk profile.
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <Button className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3">
                  Apply AI Personality
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
