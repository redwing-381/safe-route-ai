"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Shield, Navigation, Leaf } from "lucide-react"

export default function WelcomePage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleGetStarted = () => {
    window.location.href = "/home"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div
        className={`text-center max-w-md mx-auto transition-all duration-1000 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="mb-8 relative">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <Navigation className="w-12 h-12 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
            <Shield className="w-4 h-4 text-yellow-800" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-4">SafeRoute AI</h1>

        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Navigate with confidence. Get the safest, smartest routes powered by real-time safety data and AI.
        </p>

        <div className="flex justify-center space-x-6 mb-8">
          <div className="flex flex-col items-center">
            <Shield className="w-8 h-8 text-green-500 mb-2" />
            <span className="text-sm text-gray-600">Safety First</span>
          </div>
          <div className="flex flex-col items-center">
            <Navigation className="w-8 h-8 text-blue-500 mb-2" />
            <span className="text-sm text-gray-600">Smart Routes</span>
          </div>
          <div className="flex flex-col items-center">
            <Leaf className="w-8 h-8 text-green-600 mb-2" />
            <span className="text-sm text-gray-600">Eco-Friendly</span>
          </div>
        </div>

        <Button
          onClick={handleGetStarted}
          className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white py-3 text-lg font-semibold rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105"
        >
          Get Started
        </Button>
      </div>
    </div>
  )
}
