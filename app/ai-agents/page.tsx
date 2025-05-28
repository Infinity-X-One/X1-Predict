"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Brain,
  Upload,
  Settings,
  Play,
  Pause,
  Trash2,
  Plus,
  Database,
  Cpu,
  Network,
  Zap,
  Target,
  FileText,
  ImageIcon,
  Video,
  Music,
  Archive,
  Code,
  BookOpen,
} from "lucide-react"
import Link from "next/link"

interface KnowledgeFile {
  id: string
  name: string
  type: "document" | "image" | "video" | "audio" | "code" | "data"
  size: number
  uploadDate: Date
  processed: boolean
  accuracy: number
}

interface AIAgent {
  id: string
  name: string
  description: string
  specialty: string
  status: "active" | "training" | "idle" | "error"
  accuracy: number
  knowledgeFiles: KnowledgeFile[]
  trainingData: number
  predictions: number
  lastTrained: Date
  version: string
  parentAgent?: string
}

export default function AIAgentsPage() {
  const [agents, setAgents] = useState<AIAgent[]>([
    {
      id: "finsynapse",
      name: "FinSynapse Master AI",
      description: "Primary financial intelligence coordinator with advanced decision-making capabilities",
      specialty: "Master Coordination & Strategic Decision Making",
      status: "active",
      accuracy: 98.7,
      knowledgeFiles: [
        {
          id: "1",
          name: "Financial_Markets_Encyclopedia.pdf",
          type: "document",
          size: 45000000,
          uploadDate: new Date(),
          processed: true,
          accuracy: 99.2,
        },
        {
          id: "2",
          name: "Trading_Strategies_Database.json",
          type: "data",
          size: 12000000,
          uploadDate: new Date(),
          processed: true,
          accuracy: 97.8,
        },
      ],
      trainingData: 2847593,
      predictions: 15847,
      lastTrained: new Date(),
      version: "v3.2.1",
    },
    {
      id: "quantum-predictor",
      name: "Quantum Price Predictor",
      description: "Advanced quantum algorithm-based price prediction system",
      specialty: "Quantum Price Prediction & Market Timing",
      status: "active",
      accuracy: 96.4,
      knowledgeFiles: [
        {
          id: "3",
          name: "Quantum_Algorithms.py",
          type: "code",
          size: 2500000,
          uploadDate: new Date(),
          processed: true,
          accuracy: 98.1,
        },
      ],
      trainingData: 1847293,
      predictions: 8934,
      lastTrained: new Date(),
      version: "v2.1.0",
      parentAgent: "finsynapse",
    },
    {
      id: "neural-sentiment",
      name: "Neural Sentiment Bot",
      description: "Deep learning sentiment analysis from social media and news",
      specialty: "Social Sentiment & News Analysis",
      status: "training",
      accuracy: 94.8,
      knowledgeFiles: [],
      trainingData: 3847592,
      predictions: 23456,
      lastTrained: new Date(),
      version: "v1.8.3",
      parentAgent: "finsynapse",
    },
  ])

  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const [isCreatingAgent, setIsCreatingAgent] = useState(false)
  const [newAgent, setNewAgent] = useState({
    name: "",
    description: "",
    specialty: "",
    parentAgent: "",
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-400 bg-green-400/20"
      case "training":
        return "text-yellow-400 bg-yellow-400/20"
      case "idle":
        return "text-gray-400 bg-gray-400/20"
      case "error":
        return "text-red-400 bg-red-400/20"
      default:
        return "text-gray-400 bg-gray-400/20"
    }
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="w-4 h-4" />
      case "image":
        return <ImageIcon className="w-4 h-4" />
      case "video":
        return <Video className="w-4 h-4" />
      case "audio":
        return <Music className="w-4 h-4" />
      case "code":
        return <Code className="w-4 h-4" />
      case "data":
        return <Database className="w-4 h-4" />
      default:
        return <Archive className="w-4 h-4" />
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleFileUpload = (agentId: string) => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleCreateAgent = () => {
    if (newAgent.name && newAgent.description && newAgent.specialty) {
      const agent: AIAgent = {
        id: Date.now().toString(),
        name: newAgent.name,
        description: newAgent.description,
        specialty: newAgent.specialty,
        status: "idle",
        accuracy: 0,
        knowledgeFiles: [],
        trainingData: 0,
        predictions: 0,
        lastTrained: new Date(),
        version: "v1.0.0",
        parentAgent: newAgent.parentAgent || undefined,
      }

      setAgents((prev) => [...prev, agent])
      setNewAgent({ name: "", description: "", specialty: "", parentAgent: "" })
      setIsCreatingAgent(false)
    }
  }

  const toggleAgentStatus = (agentId: string) => {
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === agentId ? { ...agent, status: agent.status === "active" ? "idle" : ("active" as any) } : agent,
      ),
    )
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
            <Link href="/proof">
              <Button variant="ghost" className="text-white hover:text-green-400">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">AI Agent Builder</h1>
              <p className="text-green-400">Create & Manage Specialized AI Agents</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setIsCreatingAgent(true)}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Agent
            </Button>
            <Badge className="bg-cyan-600 text-white">{agents.length} Active Agents</Badge>
          </div>
        </div>
      </header>

      <div className="relative z-10 p-6">
        {/* Agent Creation Modal */}
        {isCreatingAgent && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <Card className="bg-slate-900/95 backdrop-blur-md border-2 border-green-400/30 w-full max-w-2xl mx-4">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-green-400">Create New AI Agent</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Agent Name</label>
                  <Input
                    value={newAgent.name}
                    onChange={(e) => setNewAgent((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Risk Assessment Bot"
                    className="bg-slate-800/50 border-green-400/30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <Textarea
                    value={newAgent.description}
                    onChange={(e) => setNewAgent((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe what this agent does..."
                    className="bg-slate-800/50 border-green-400/30"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Specialty</label>
                  <Input
                    value={newAgent.specialty}
                    onChange={(e) => setNewAgent((prev) => ({ ...prev, specialty: e.target.value }))}
                    placeholder="e.g., Risk Management & Portfolio Optimization"
                    className="bg-slate-800/50 border-green-400/30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Parent Agent (Optional)</label>
                  <select
                    value={newAgent.parentAgent}
                    onChange={(e) => setNewAgent((prev) => ({ ...prev, parentAgent: e.target.value }))}
                    className="w-full bg-slate-800/50 border border-green-400/30 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="">No Parent Agent</option>
                    {agents.map((agent) => (
                      <option key={agent.id} value={agent.id}>
                        {agent.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={handleCreateAgent} className="flex-1 bg-green-600 hover:bg-green-700">
                    Create Agent
                  </Button>
                  <Button
                    onClick={() => setIsCreatingAgent(false)}
                    variant="outline"
                    className="flex-1 border-gray-400/30"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Agents Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <Card
              key={agent.id}
              className="bg-slate-900/60 backdrop-blur-md border border-green-400/20 hover:border-green-400/40 transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-green-400 rounded-lg flex items-center justify-center">
                      <Brain className="w-6 h-6 text-slate-900" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-white">{agent.name}</CardTitle>
                      <p className="text-xs text-gray-400">{agent.version}</p>
                    </div>
                  </div>
                  <Badge className={`text-xs px-2 py-1 ${getStatusColor(agent.status)}`}>
                    {agent.status.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-gray-300">{agent.description}</p>

                <div className="bg-slate-800/50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-1">Specialty</p>
                  <p className="text-sm text-cyan-400">{agent.specialty}</p>
                </div>

                {agent.parentAgent && (
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <p className="text-xs text-gray-400 mb-1">Parent Agent</p>
                    <p className="text-sm text-yellow-400">{agents.find((a) => a.id === agent.parentAgent)?.name}</p>
                  </div>
                )}

                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div className="text-center">
                    <p className="text-gray-400">Accuracy</p>
                    <p className="text-green-400 font-bold">{agent.accuracy}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400">Training Data</p>
                    <p className="text-cyan-400 font-bold">{agent.trainingData.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400">Predictions</p>
                    <p className="text-blue-400 font-bold">{agent.predictions.toLocaleString()}</p>
                  </div>
                </div>

                {/* Knowledge Files */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-gray-300">Knowledge Base</p>
                    <Button
                      size="sm"
                      onClick={() => handleFileUpload(agent.id)}
                      className="bg-green-600 hover:bg-green-700 text-xs px-2 py-1"
                    >
                      <Upload className="w-3 h-3 mr-1" />
                      Upload
                    </Button>
                  </div>

                  {agent.knowledgeFiles.length > 0 ? (
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {agent.knowledgeFiles.map((file) => (
                        <div key={file.id} className="bg-slate-800/30 rounded p-2 flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {getFileIcon(file.type)}
                            <div>
                              <p className="text-xs text-white truncate max-w-32">{file.name}</p>
                              <p className="text-xs text-gray-400">{formatFileSize(file.size)}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {file.processed && (
                              <Badge className="text-xs bg-green-600 text-white">{file.accuracy}%</Badge>
                            )}
                            <Button size="sm" variant="ghost" className="p-1">
                              <Trash2 className="w-3 h-3 text-red-400" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-slate-800/30 rounded p-4 text-center">
                      <BookOpen className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-xs text-gray-400">No knowledge files uploaded</p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button
                    onClick={() => toggleAgentStatus(agent.id)}
                    className={`flex-1 ${
                      agent.status === "active"
                        ? "bg-yellow-600 hover:bg-yellow-700"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {agent.status === "active" ? (
                      <>
                        <Pause className="w-4 h-4 mr-1" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-1" />
                        Activate
                      </>
                    )}
                  </Button>
                  <Button variant="outline" className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10">
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" className="border-red-400/30 text-red-400 hover:bg-red-400/10">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.txt,.json,.csv,.py,.js,.ts,.jpg,.png,.mp4,.mp3"
          className="hidden"
          onChange={(e) => {
            // Handle file upload logic here
            console.log("Files selected:", e.target.files)
          }}
        />

        {/* Agent Network Visualization */}
        <Card className="mt-8 bg-slate-900/60 backdrop-blur-md border border-cyan-400/20">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-cyan-400 flex items-center">
              <Network className="w-6 h-6 mr-2" />
              Agent Network Topology
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                <Brain className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-white">Master Agents</p>
                <p className="text-2xl font-bold text-green-400">{agents.filter((a) => !a.parentAgent).length}</p>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                <Cpu className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-white">Sub Agents</p>
                <p className="text-2xl font-bold text-cyan-400">{agents.filter((a) => a.parentAgent).length}</p>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-white">Active Agents</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {agents.filter((a) => a.status === "active").length}
                </p>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                <Target className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-white">Avg Accuracy</p>
                <p className="text-2xl font-bold text-purple-400">
                  {(agents.reduce((sum, a) => sum + a.accuracy, 0) / agents.length).toFixed(1)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
