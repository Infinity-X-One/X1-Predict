"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, TrendingUp, BarChart3, Target, Brain, Zap, Shield, Copy } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function PromptsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const promptCategories = [
    {
      title: "Market Analysis",
      icon: TrendingUp,
      prompts: [
        "What are the current market trends for tech stocks?",
        "Analyze the sentiment around renewable energy stocks",
        "What sectors are showing the most growth potential?",
        "How is the current economic climate affecting the market?",
      ],
    },
    {
      title: "Stock Research",
      icon: BarChart3,
      prompts: [
        "Give me a detailed analysis of [STOCK SYMBOL]",
        "What are the key financial metrics for [COMPANY]?",
        "Compare [STOCK A] vs [STOCK B] for investment potential",
        "What are the risks associated with investing in [SECTOR]?",
      ],
    },
    {
      title: "Portfolio Strategy",
      icon: Target,
      prompts: [
        "How should I diversify my portfolio for long-term growth?",
        "What's the optimal asset allocation for my risk tolerance?",
        "Should I rebalance my portfolio based on current market conditions?",
        "How can I hedge against market volatility?",
      ],
    },
    {
      title: "AI Insights",
      icon: Brain,
      prompts: [
        "What does your AI model predict for the next quarter?",
        "Explain the reasoning behind your top stock recommendations",
        "How confident are you in your current market predictions?",
        "What data sources influence your investment recommendations?",
      ],
    },
    {
      title: "Quick Actions",
      icon: Zap,
      prompts: [
        "What stocks should I buy today?",
        "Give me 3 quick trading opportunities",
        "Is now a good time to buy or sell?",
        "Show me the most volatile stocks right now",
      ],
    },
    {
      title: "Risk Management",
      icon: Shield,
      prompts: [
        "How can I minimize risk in my current portfolio?",
        "What are the warning signs I should watch for?",
        "How do I set appropriate stop-loss levels?",
        "What's my portfolio's risk-to-reward ratio?",
      ],
    },
  ]

  const filteredCategories = promptCategories
    .map((category) => ({
      ...category,
      prompts: category.prompts.filter((prompt) => prompt.toLowerCase().includes(searchTerm.toLowerCase())),
    }))
    .filter((category) => category.prompts.length > 0)

  const copyToClipboard = (prompt: string) => {
    navigator.clipboard.writeText(prompt)
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
            <h1 className="text-3xl font-bold">Prompt Library</h1>
          </div>
          <Badge className="bg-green-600 text-white">
            {promptCategories.reduce((total, cat) => total + cat.prompts.length, 0)} Prompts
          </Badge>
        </div>
      </header>

      <div className="p-6">
        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search prompts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-800/50 border-green-400/30 text-white placeholder-gray-400"
            />
          </div>
        </div>

        {/* Prompt Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredCategories.map((category) => {
            const IconComponent = category.icon
            return (
              <Card
                key={category.title}
                className="bg-slate-900/60 backdrop-blur-md border border-green-400/20 rounded-2xl glassmorphic-feature-card"
              >
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-green-400">
                    <IconComponent className="w-6 h-6" />
                    <span>{category.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {category.prompts.map((prompt, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-slate-800/50 border border-green-400/10 hover:border-green-400/30 transition-all duration-300 group"
                    >
                      <div className="flex items-start justify-between">
                        <p className="text-sm text-gray-300 flex-1 pr-4">{prompt}</p>
                        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(prompt)}
                            className="p-2 hover:bg-green-400/10"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Link href={`/predict?prompt=${encodeURIComponent(prompt)}`}>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-xs">
                              Use
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No prompts found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
