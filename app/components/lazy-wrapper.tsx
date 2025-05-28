"use client"

import type React from "react"

import { Suspense } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Loader2 } from "lucide-react"

interface LazyWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  className?: string
}

export function LazyWrapper({ children, fallback, className }: LazyWrapperProps) {
  const defaultFallback = (
    <div className={`min-h-[400px] flex items-center justify-center ${className || ""}`}>
      <Card className="bg-slate-900/60 backdrop-blur-md border border-green-400/20 p-8">
        <CardContent className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Brain className="w-12 h-12 text-green-400 animate-pulse" />
            <Loader2 className="w-6 h-6 text-cyan-400 animate-spin absolute -top-1 -right-1" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Loading AI System</h3>
            <p className="text-sm text-gray-400">Initializing neural networks...</p>
          </div>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return <Suspense fallback={fallback || defaultFallback}>{children}</Suspense>
}

export function PageLoader({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto">
            <Brain className="w-10 h-10 text-slate-900 animate-pulse" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-ping"></div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">{message}</h2>
          <p className="text-gray-400">Initializing AI systems...</p>
        </div>
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>
      </div>
    </div>
  )
}

export function ComponentLoader({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "h-32",
    md: "h-64",
    lg: "h-96",
  }

  return (
    <div
      className={`${sizeClasses[size]} flex items-center justify-center bg-slate-900/40 backdrop-blur-md border border-green-400/20 rounded-xl`}
    >
      <div className="text-center space-y-3">
        <Loader2 className="w-8 h-8 text-green-400 animate-spin mx-auto" />
        <p className="text-sm text-gray-400">Loading component...</p>
      </div>
    </div>
  )
}
