"use client"

import { Button } from "@/components/ui/button"
import { Menu, X, Home, Brain, Layers, Phone, BookOpen, Shield, LogIn, Smartphone } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const menuItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Learn", href: "/learn-more", icon: BookOpen },
    { label: "Apps", href: "/mobile", icon: Smartphone },
    { label: "Agentic AI", href: "/learn-more", icon: Brain },
    { label: "Recursive Systems", href: "/learn-more", icon: Layers },
    { label: "Contact Us", href: "#", icon: Phone },
    { label: "Proof", href: "#", icon: Shield },
    { label: "Login", href: "#", icon: LogIn },
  ]

  return (
    <>
      {/* Hamburger Button */}
      <Button
        onClick={toggleMenu}
        className="bg-slate-900/60 backdrop-blur-md border-2 border-green-400 text-white text-lg font-semibold rounded-xl hover:bg-slate-800/70 hover:border-green-300 shadow-[0_0_25px_rgba(34,197,94,0.4)] hover:shadow-[0_0_35px_rgba(34,197,94,0.6)] transition-all duration-300 glassmorphic-dark-button p-3"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </Button>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={toggleMenu} />}

      {/* Menu Panel - Made Thinner */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-slate-900/95 backdrop-blur-md border-l-2 border-green-400/50 shadow-[0_0_50px_rgba(34,197,94,0.3)] z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Menu Header */}
        <div className="p-4 border-b border-green-400/20 flex-shrink-0">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">
              <span className="text-white shimmer-text">Infinity</span>
              <span className="text-green-400 mx-1 shimmer-green-text">X</span>
              <span className="text-white shimmer-text">One</span>
            </h2>
            <Button onClick={toggleMenu} variant="ghost" className="text-white hover:text-green-400 p-1">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Scrollable Menu Items Container */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-green-400/30 scrollbar-track-slate-800/50">
          <div className="p-4 space-y-1">
            {menuItems.map((item, index) => {
              const IconComponent = item.icon
              return (
                <Link
                  key={index}
                  href={item.href}
                  onClick={toggleMenu}
                  className="flex items-center space-x-3 w-full p-3 text-white rounded-lg transition-all duration-300 group hover:bg-green-400/10 hover:border-green-400/30 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] border border-transparent hover:text-green-400"
                >
                  <IconComponent className="w-4 h-4 group-hover:text-green-400 transition-colors duration-300" />
                  <span className="text-base font-medium group-hover:text-green-400 transition-colors duration-300">
                    {item.label}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Menu Footer */}
        <div className="p-4 flex-shrink-0">
          <div className="bg-slate-800/50 rounded-lg p-3 border border-green-400/20">
            <p className="text-xs text-gray-300 text-center">Experience the future of AI-powered investing</p>
          </div>
        </div>
      </div>
    </>
  )
}
