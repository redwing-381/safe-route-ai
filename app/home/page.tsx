"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { MapPin, Navigation, Shield, Clock, Leaf, Search } from "lucide-react"

export default function HomePage() {
  const [startLocation, setStartLocation] = useState("")
  const [destination, setDestination] = useState("")
  const [preference, setPreference] = useState("safety")

  const handleFindRoute = () => {
    if (startLocation && destination) {
      // Store route data in localStorage for the results page
      localStorage.setItem(
        "routeData",
        JSON.stringify({
          start: startLocation,
          destination: destination,
          preference: preference,
        }),
      )
      window.location.href = "/results"
    }
  }

  const handleAutoDetect = () => {
    setStartLocation("Current Location (123 Main St, City)")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mb-4">
            <Navigation className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">SafeRoute AI</h1>
          <p className="text-gray-600">Plan your safest journey</p>
        </div>

        {/* Location Inputs */}
        <Card className="p-6 mb-6 shadow-lg">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  value={startLocation}
                  onChange={(e) => setStartLocation(e.target.value)}
                  placeholder="Enter start location"
                  className="pl-10"
                />
                <Button
                  onClick={handleAutoDetect}
                  variant="outline"
                  size="sm"
                  className="absolute right-2 top-1.5 text-xs"
                >
                  Auto-detect
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Where are you going?"
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Preferences */}
        <Card className="p-6 mb-6 shadow-lg">
          <h3 className="font-semibold text-gray-800 mb-4">Route Preferences</h3>
          <div className="space-y-3">
            <div
              onClick={() => setPreference("safety")}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                preference === "safety" ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-green-300"
              }`}
            >
              <div className="flex items-center">
                <Shield className={`w-6 h-6 mr-3 ${preference === "safety" ? "text-green-600" : "text-gray-500"}`} />
                <div>
                  <div className="font-medium">🛡️ Safety First</div>
                  <div className="text-sm text-gray-600">Avoid high-crime areas</div>
                </div>
              </div>
            </div>

            <div
              onClick={() => setPreference("fastest")}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                preference === "fastest" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <div className="flex items-center">
                <Clock className={`w-6 h-6 mr-3 ${preference === "fastest" ? "text-blue-600" : "text-gray-500"}`} />
                <div>
                  <div className="font-medium">⏱️ Fastest Route</div>
                  <div className="text-sm text-gray-600">Minimize travel time</div>
                </div>
              </div>
            </div>

            <div
              onClick={() => setPreference("eco")}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                preference === "eco" ? "border-green-600 bg-green-50" : "border-gray-200 hover:border-green-300"
              }`}
            >
              <div className="flex items-center">
                <Leaf className={`w-6 h-6 mr-3 ${preference === "eco" ? "text-green-700" : "text-gray-500"}`} />
                <div>
                  <div className="font-medium">🌱 Eco-friendly</div>
                  <div className="text-sm text-gray-600">Low pollution route</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Find Route Button */}
        <Button
          onClick={handleFindRoute}
          disabled={!startLocation || !destination}
          className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white py-3 text-lg font-semibold rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          Find Route
        </Button>

        {/* Quick Access */}
        <div className="mt-6 text-center">
          <Button
            variant="ghost"
            onClick={() => (window.location.href = "/settings")}
            className="text-gray-600 hover:text-gray-800"
          >
            Settings & Saved Routes
          </Button>
        </div>
      </div>
    </div>
  )
}
