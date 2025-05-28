"use client"

import dynamic from "next/dynamic"
import { ComponentLoader, PageLoader } from "./lazy-wrapper"

// Lazy load heavy components with custom loading states
export const LazyPredictPage = dynamic(() => import("../predict/page"), {
  loading: () => <PageLoader message="Loading AI Prediction Engine" />,
  ssr: false,
})

export const LazyProofPage = dynamic(() => import("../proof/page"), {
  loading: () => <PageLoader message="Loading Proof System" />,
  ssr: false,
})

export const LazyAIAgentsPage = dynamic(() => import("../ai-agents/page"), {
  loading: () => <PageLoader message="Loading AI Agent Builder" />,
  ssr: false,
})

export const LazyAnalyticsPage = dynamic(() => import("../analytics/page"), {
  loading: () => <PageLoader message="Loading Advanced Analytics" />,
  ssr: false,
})

export const LazyLearnMorePage = dynamic(() => import("../learn-more/page"), {
  loading: () => <PageLoader message="Loading AI Research" />,
  ssr: false,
})

export const LazyPaperTradingPage = dynamic(() => import("../paper-trading/page"), {
  loading: () => <PageLoader message="Loading Trading Platform" />,
  ssr: false,
})

export const LazyPromptsPage = dynamic(() => import("../prompts/page"), {
  loading: () => <PageLoader message="Loading Prompt Library" />,
  ssr: false,
})

export const LazyMyAIPage = dynamic(() => import("../my-ai/page"), {
  loading: () => <PageLoader message="Loading AI Customization" />,
  ssr: false,
})

// Lazy load mobile pages
export const LazyMobilePage = dynamic(() => import("../mobile/page"), {
  loading: () => <PageLoader message="Loading Mobile Experience" />,
  ssr: false,
})

export const LazyMobileAskAI = dynamic(() => import("../mobile/ask-ai/page"), {
  loading: () => <PageLoader message="Loading AI Assistant" />,
  ssr: false,
})

export const LazyMobileStockRecommendations = dynamic(() => import("../mobile/stock-recommendations/page"), {
  loading: () => <PageLoader message="Loading Stock Recommendations" />,
  ssr: false,
})

export const LazyMobileGettingStarted = dynamic(() => import("../mobile/getting-started/page"), {
  loading: () => <PageLoader message="Loading Getting Started" />,
  ssr: false,
})

export const LazyMobileTopPicks = dynamic(() => import("../mobile/top-picks/page"), {
  loading: () => <PageLoader message="Loading Top Picks" />,
  ssr: false,
})

// Lazy load chart components (heavy dependencies)
export const LazyChartComponent = dynamic(() => import("react-chartjs-2").then((mod) => ({ default: mod.Line })), {
  loading: () => <ComponentLoader size="lg" />,
  ssr: false,
})

export const LazyBarChart = dynamic(() => import("react-chartjs-2").then((mod) => ({ default: mod.Bar })), {
  loading: () => <ComponentLoader size="lg" />,
  ssr: false,
})

export const LazyDoughnutChart = dynamic(() => import("react-chartjs-2").then((mod) => ({ default: mod.Doughnut })), {
  loading: () => <ComponentLoader size="md" />,
  ssr: false,
})

// Lazy load heavy UI components
export const LazyHamburgerMenu = dynamic(() => import("./hamburger-menu"), {
  loading: () => <ComponentLoader size="sm" />,
  ssr: false,
})

export const LazyServiceWorkerRegister = dynamic(() => import("./sw-register"), {
  loading: () => null,
  ssr: false,
})

export const LazyOfflineIndicator = dynamic(() => import("./offline-indicator"), {
  loading: () => null,
  ssr: false,
})
