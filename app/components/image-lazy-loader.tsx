"use client"

import { useState, useRef, useEffect } from "react"
import { Loader2 } from "lucide-react"

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  placeholder?: string
  width?: number
  height?: number
}

export function LazyImage({ src, alt, className, placeholder, width, height }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [error, setError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setError(true)
    setIsLoaded(true)
  }

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className || ""}`} style={{ width, height }}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-800/50 flex items-center justify-center">
          <Loader2 className="w-6 h-6 text-green-400 animate-spin" />
        </div>
      )}

      {isInView && !error && (
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          className={`transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"} ${className || ""}`}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          width={width}
          height={height}
        />
      )}

      {error && (
        <div className="absolute inset-0 bg-slate-800/50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center mb-2">
              <span className="text-gray-400">📷</span>
            </div>
            <p className="text-xs text-gray-400">Image unavailable</p>
          </div>
        </div>
      )}

      {placeholder && !isInView && (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-700 animate-pulse" />
      )}
    </div>
  )
}
