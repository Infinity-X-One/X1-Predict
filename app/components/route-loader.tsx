"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { PageLoader } from "./lazy-wrapper"

export function RouteLoader() {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsLoading(true)

    // Simulate route loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [pathname])

  if (!isLoading) return null

  const getLoadingMessage = (path: string) => {
    switch (path) {
      case "/predict":
        return "Loading AI Prediction Engine"
      case "/proof":
        return "Loading Proof System"
      case "/ai-agents":
        return "Loading AI Agent Builder"
      case "/analytics":
        return "Loading Advanced Analytics"
      case "/learn-more":
        return "Loading AI Research"
      case "/paper-trading":
        return "Loading Trading Platform"
      case "/prompts":
        return "Loading Prompt Library"
      case "/my-ai":
        return "Loading AI Customization"
      case "/mobile":
        return "Loading Mobile Experience"
      default:
        return "Loading..."
    }
  }

  return <PageLoader message={getLoadingMessage(pathname)} />
}
