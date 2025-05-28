"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Activity } from "lucide-react"

interface PerformanceMetrics {
  loadTime: number
  memoryUsage: number
  renderTime: number
  bundleSize: number
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV === "development") {
      setIsVisible(true)

      const measurePerformance = () => {
        const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
        const memory = (performance as any).memory

        setMetrics({
          loadTime: Math.round(navigation.loadEventEnd - navigation.navigationStart),
          memoryUsage: memory ? Math.round(memory.usedJSHeapSize / 1024 / 1024) : 0,
          renderTime: Math.round(navigation.domContentLoadedEventEnd - navigation.navigationStart),
          bundleSize: 0, // This would need to be calculated differently
        })
      }

      // Measure after page load
      if (document.readyState === "complete") {
        measurePerformance()
      } else {
        window.addEventListener("load", measurePerformance)
      }

      return () => window.removeEventListener("load", measurePerformance)
    }
  }, [])

  if (!isVisible || !metrics) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="bg-slate-900/95 backdrop-blur-md border border-green-400/20 text-xs">
        <CardContent className="p-3">
          <div className="flex items-center space-x-2 mb-2">
            <Activity className="w-3 h-3 text-green-400" />
            <span className="text-green-400 font-semibold">Performance</span>
          </div>
          <div className="space-y-1 text-gray-300">
            <div className="flex justify-between">
              <span>Load:</span>
              <span className="text-white">{metrics.loadTime}ms</span>
            </div>
            <div className="flex justify-between">
              <span>Render:</span>
              <span className="text-white">{metrics.renderTime}ms</span>
            </div>
            <div className="flex justify-between">
              <span>Memory:</span>
              <span className="text-white">{metrics.memoryUsage}MB</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
