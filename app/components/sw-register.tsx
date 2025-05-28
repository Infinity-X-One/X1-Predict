"use client"

import { useEffect, useState } from "react"

export default function ServiceWorkerRegister() {
  const [swStatus, setSwStatus] = useState<"loading" | "ready" | "error" | "unsupported" | "disabled">("loading")
  const [updateAvailable, setUpdateAvailable] = useState(false)
  const [installPrompt, setInstallPrompt] = useState<any>(null)

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === "undefined") {
      return
    }

    // Check if we're in a preview environment (v0, Vercel preview, etc.)
    const isPreviewEnvironment =
      window.location.hostname.includes("vusercontent.net") ||
      window.location.hostname.includes("vercel.app") ||
      window.location.hostname.includes("localhost") ||
      window.location.hostname.includes("127.0.0.1")

    if (isPreviewEnvironment) {
      console.log("Preview environment detected - Service Worker disabled")
      setSwStatus("disabled")
      return
    }

    // Check for service worker support
    if (!("serviceWorker" in navigator)) {
      console.log("Service Worker not supported")
      setSwStatus("unsupported")
      return
    }

    // Register service worker only in production
    registerServiceWorker()

    // Listen for install prompt
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault()
      setInstallPrompt(e)
    })
  }, [])

  const registerServiceWorker = async () => {
    try {
      console.log("Attempting to register service worker...")

      // Wait for page to load
      if (document.readyState !== "complete") {
        await new Promise((resolve) => {
          window.addEventListener("load", resolve)
        })
      }

      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
        updateViaCache: "none",
      })

      console.log("SW registered successfully:", registration.scope)
      setSwStatus("ready")

      // Check for updates
      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing
        if (newWorker) {
          console.log("New service worker found")
          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              console.log("New service worker installed")
              setUpdateAvailable(true)
            }
          })
        }
      })

      // Check if there's already an update waiting
      if (registration.waiting) {
        setUpdateAvailable(true)
      }

      // Listen for controller change (new SW activated)
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        console.log("Service worker controller changed")
        window.location.reload()
      })
    } catch (error) {
      console.error("SW registration failed:", error)
      setSwStatus("error")
    }
  }

  const updateApp = async () => {
    try {
      const registration = await navigator.serviceWorker.getRegistration()
      if (registration?.waiting) {
        registration.waiting.postMessage({ type: "SKIP_WAITING" })
      }
    } catch (error) {
      console.error("Update failed:", error)
      window.location.reload()
    }
  }

  const installApp = async () => {
    if (installPrompt) {
      installPrompt.prompt()
      const { outcome } = await installPrompt.userChoice
      console.log("Install prompt outcome:", outcome)
      setInstallPrompt(null)
    }
  }

  const requestNotificationPermission = async () => {
    if ("Notification" in window && Notification.permission === "default") {
      const permission = await Notification.requestPermission()
      console.log("Notification permission:", permission)

      if (permission === "granted") {
        // Show a test notification
        new Notification("X1 Predict", {
          body: "Notifications enabled! You'll receive market alerts.",
          icon: "/icon-192x192.png",
        })
      }
    }
  }

  // Simulate offline functionality in preview mode
  const simulateOfflineFeatures = () => {
    // Store some data in localStorage to simulate caching
    const mockData = {
      predictions: [
        { id: 1, stock: "TSLA", confidence: 92, prediction: "BUY" },
        { id: 2, stock: "AAPL", confidence: 88, prediction: "HOLD" },
        { id: 3, stock: "GOOGL", confidence: 85, prediction: "BUY" },
      ],
      portfolio: {
        totalValue: "$125,430",
        dayChange: "+2.4%",
        stocks: ["TSLA", "AAPL", "GOOGL", "MSFT"],
      },
      lastUpdated: new Date().toISOString(),
    }

    localStorage.setItem("x1-predict-cache", JSON.stringify(mockData))
    console.log("Mock offline data cached")
  }

  useEffect(() => {
    if (swStatus === "disabled") {
      // Simulate offline features in preview mode
      simulateOfflineFeatures()
    }
  }, [swStatus])

  return (
    <>
      {/* Update Available Banner */}
      {updateAvailable && (
        <div className="fixed top-4 left-4 right-4 z-50 bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-lg shadow-lg animate-in slide-in-from-top">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold">Update Available</h3>
              <p className="text-sm opacity-90">A new version of X1 Predict is ready!</p>
            </div>
            <button
              onClick={updateApp}
              className="bg-white text-green-600 px-4 py-2 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Update
            </button>
          </div>
        </div>
      )}

      {/* Install App Banner */}
      {installPrompt && (
        <div className="fixed top-4 left-4 right-4 z-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-lg shadow-lg animate-in slide-in-from-top">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold">Install X1 Predict</h3>
              <p className="text-sm opacity-90">Add to your home screen for quick access!</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setInstallPrompt(null)}
                className="bg-white/20 text-white px-3 py-2 rounded-lg font-bold hover:bg-white/30 transition-colors"
              >
                Later
              </button>
              <button
                onClick={installApp}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold hover:bg-gray-100 transition-colors"
              >
                Install
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Permission Button */}
      {(swStatus === "ready" || swStatus === "disabled") &&
        "Notification" in window &&
        Notification.permission === "default" && (
          <div className="fixed bottom-20 right-4 z-40">
            <button
              onClick={requestNotificationPermission}
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors"
              title="Enable Notifications"
            >
              🔔
            </button>
          </div>
        )}

      {swStatus === "error" && (
        <div className="fixed bottom-4 left-4 right-4 z-50 bg-red-600/80 backdrop-blur-sm text-white p-3 rounded-lg">
          <p className="text-sm">Service Worker registration failed. App will work but without offline features.</p>
        </div>
      )}

      {swStatus === "unsupported" && (
        <div className="fixed bottom-4 left-4 right-4 z-50 bg-yellow-600/80 backdrop-blur-sm text-white p-3 rounded-lg">
          <p className="text-sm">Service Workers not supported. App will work but without offline features.</p>
        </div>
      )}
    </>
  )
}
