"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { authenticateUser, type DemoUser } from "@/lib/demo-auth"

interface DemoAuthContextType {
  user: DemoUser | null
  isLoading: boolean
  signIn: (username: string, password: string) => Promise<{ success: boolean; error?: string }>
  signOut: () => void
  isAdmin: boolean
}

const DemoAuthContext = createContext<DemoAuthContextType | undefined>(undefined)

export function DemoAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("demo-user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Error parsing stored user:", error)
        localStorage.removeItem("demo-user")
      }
    }
    setIsLoading(false)
  }, [])

  const signIn = async (username: string, password: string) => {
    setIsLoading(true)

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const authenticatedUser = authenticateUser(username, password)

    if (authenticatedUser) {
      setUser(authenticatedUser)
      localStorage.setItem("demo-user", JSON.stringify(authenticatedUser))
      setIsLoading(false)
      return { success: true }
    } else {
      setIsLoading(false)
      return { success: false, error: "Invalid username or password" }
    }
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("demo-user")
  }

  return (
    <DemoAuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signOut,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </DemoAuthContext.Provider>
  )
}

export const useDemoAuth = () => {
  const context = useContext(DemoAuthContext)
  if (context === undefined) {
    throw new Error("useDemoAuth must be used within a DemoAuthProvider")
  }
  return context
}
