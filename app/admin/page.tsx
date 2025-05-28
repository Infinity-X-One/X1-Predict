"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useDemoAuth } from "@/contexts/demo-auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Shield,
  Users,
  Database,
  Settings,
  Activity,
  TrendingUp,
  AlertTriangle,
  Server,
  GitBranch,
  Webhook,
  Bot,
  Zap,
  Eye,
  Lock,
  UserCheck,
} from "lucide-react"

export default function AdminPage() {
  const { user, isAdmin, isLoading, signOut } = useDemoAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      router.push("/")
    }
  }, [user, isAdmin, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!user || !isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950"></div>
        <div className="absolute inset-0">
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <defs>
              <linearGradient id="adminWave1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#dc2626" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#22c55e" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#1e293b" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <path
              d="M0,0 Q200,100 400,80 T800,60 Q900,80 1000,0 L1000,300 Q800,250 600,280 T200,320 Q100,300 0,280 Z"
              fill="url(#adminWave1)"
              className="animate-wave-vertical-slow"
            />
          </svg>
        </div>
      </div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-red-400 via-orange-400 to-red-500 bg-clip-text text-transparent">
                ADMIN
              </span>
              <span className="text-white ml-2 font-light">CONTROL CENTER</span>
            </h1>
            <p className="text-gray-300 mt-2">Welcome back, {user.displayName}</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => router.push("/")}
              variant="outline"
              className="border-green-400/50 text-green-400 hover:bg-green-400/10"
            >
              Home
            </Button>
            <Button onClick={signOut} variant="outline" className="border-red-400/50 text-red-400 hover:bg-red-400/10">
              Sign Out
            </Button>
          </div>
        </div>

        {/* System Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/60 backdrop-blur-md border-green-400/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">System Status</p>
                  <p className="text-2xl font-bold text-green-400">ONLINE</p>
                </div>
                <Server className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/60 backdrop-blur-md border-blue-400/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Active Users</p>
                  <p className="text-2xl font-bold text-blue-400">1,247</p>
                </div>
                <Users className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/60 backdrop-blur-md border-purple-400/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">AI Predictions</p>
                  <p className="text-2xl font-bold text-purple-400">94.2%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/60 backdrop-blur-md border-orange-400/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Security Alerts</p>
                  <p className="text-2xl font-bold text-orange-400">3</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User Management */}
          <Card className="bg-slate-800/60 backdrop-blur-md border-green-400/30 hover:border-green-400/50 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <UserCheck className="h-5 w-5" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-green-600/20 hover:bg-green-600/30 border border-green-400/30 text-green-300">
                <Users className="mr-2 h-4 w-4" />
                View All Users
              </Button>
              <Button className="w-full bg-blue-600/20 hover:bg-blue-600/30 border border-blue-400/30 text-blue-300">
                <Eye className="mr-2 h-4 w-4" />
                Monitor Activity
              </Button>
              <Button className="w-full bg-red-600/20 hover:bg-red-600/30 border border-red-400/30 text-red-300">
                <Lock className="mr-2 h-4 w-4" />
                Security Logs
              </Button>
            </CardContent>
          </Card>

          {/* System Configuration */}
          <Card className="bg-slate-800/60 backdrop-blur-md border-blue-400/30 hover:border-blue-400/50 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Settings className="h-5 w-5" />
                System Config
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-blue-600/20 hover:bg-blue-600/30 border border-blue-400/30 text-blue-300">
                <Database className="mr-2 h-4 w-4" />
                Database Settings
              </Button>
              <Button className="w-full bg-purple-600/20 hover:bg-purple-600/30 border border-purple-400/30 text-purple-300">
                <Webhook className="mr-2 h-4 w-4" />
                API Configuration
              </Button>
              <Button className="w-full bg-orange-600/20 hover:bg-orange-600/30 border border-orange-400/30 text-orange-300">
                <Server className="mr-2 h-4 w-4" />
                Server Management
              </Button>
            </CardContent>
          </Card>

          {/* AI & Automation */}
          <Card className="bg-slate-800/60 backdrop-blur-md border-purple-400/30 hover:border-purple-400/50 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Bot className="h-5 w-5" />
                AI & Automation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-purple-600/20 hover:bg-purple-600/30 border border-purple-400/30 text-purple-300">
                <Bot className="mr-2 h-4 w-4" />
                Manage AI Agents
              </Button>
              <Button className="w-full bg-green-600/20 hover:bg-green-600/30 border border-green-400/30 text-green-300">
                <GitBranch className="mr-2 h-4 w-4" />
                Recursive Systems
              </Button>
              <Button className="w-full bg-yellow-600/20 hover:bg-yellow-600/30 border border-yellow-400/30 text-yellow-300">
                <Zap className="mr-2 h-4 w-4" />
                Workflow Builder
              </Button>
            </CardContent>
          </Card>

          {/* Security & Monitoring */}
          <Card className="bg-slate-800/60 backdrop-blur-md border-red-400/30 hover:border-red-400/50 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-400">
                <Shield className="h-5 w-5" />
                Security Center
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-red-600/20 hover:bg-red-600/30 border border-red-400/30 text-red-300">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Threat Detection
              </Button>
              <Button className="w-full bg-orange-600/20 hover:bg-orange-600/30 border border-orange-400/30 text-orange-300">
                <Activity className="mr-2 h-4 w-4" />
                System Monitoring
              </Button>
              <Button className="w-full bg-blue-600/20 hover:bg-blue-600/30 border border-blue-400/30 text-blue-300">
                <Lock className="mr-2 h-4 w-4" />
                Access Control
              </Button>
            </CardContent>
          </Card>

          {/* Data & Analytics */}
          <Card className="bg-slate-800/60 backdrop-blur-md border-cyan-400/30 hover:border-cyan-400/50 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-cyan-400">
                <TrendingUp className="h-5 w-5" />
                Data & Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-400/30 text-cyan-300">
                <Database className="mr-2 h-4 w-4" />
                Data Management
              </Button>
              <Button className="w-full bg-green-600/20 hover:bg-green-600/30 border border-green-400/30 text-green-300">
                <TrendingUp className="mr-2 h-4 w-4" />
                Performance Metrics
              </Button>
              <Button className="w-full bg-purple-600/20 hover:bg-purple-600/30 border border-purple-400/30 text-purple-300">
                <Activity className="mr-2 h-4 w-4" />
                Usage Analytics
              </Button>
            </CardContent>
          </Card>

          {/* Emergency Controls */}
          <Card className="bg-slate-800/60 backdrop-blur-md border-yellow-400/30 hover:border-yellow-400/50 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-400">
                <Zap className="h-5 w-5" />
                Emergency Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-red-600/20 hover:bg-red-600/30 border border-red-400/30 text-red-300">
                <AlertTriangle className="mr-2 h-4 w-4" />
                System Shutdown
              </Button>
              <Button className="w-full bg-orange-600/20 hover:bg-orange-600/30 border border-orange-400/30 text-orange-300">
                <Server className="mr-2 h-4 w-4" />
                Maintenance Mode
              </Button>
              <Button className="w-full bg-yellow-600/20 hover:bg-yellow-600/30 border border-yellow-400/30 text-yellow-300">
                <Zap className="mr-2 h-4 w-4" />
                Force Restart
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* System Information */}
        <Card className="mt-8 bg-slate-800/60 backdrop-blur-md border-gray-400/30">
          <CardHeader>
            <CardTitle className="text-gray-300">System Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <p className="text-gray-400 mb-2">Server Status</p>
                <p className="text-green-400 font-mono">✓ All systems operational</p>
                <p className="text-gray-300 font-mono">Uptime: 99.97%</p>
                <p className="text-gray-300 font-mono">Load: 0.23</p>
              </div>
              <div>
                <p className="text-gray-400 mb-2">Database</p>
                <p className="text-blue-400 font-mono">✓ Connected</p>
                <p className="text-gray-300 font-mono">Records: 2.4M</p>
                <p className="text-gray-300 font-mono">Size: 847 GB</p>
              </div>
              <div>
                <p className="text-gray-400 mb-2">AI Systems</p>
                <p className="text-purple-400 font-mono">✓ Active</p>
                <p className="text-gray-300 font-mono">Models: 12</p>
                <p className="text-gray-300 font-mono">Accuracy: 94.2%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
