"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, MapPin, Shield, Leaf } from "lucide-react"

interface Route {
  id: number
  name: string
  eta: string
  distance: string
  safetyScore: "high" | "medium" | "low"
  pollutionLevel: "low" | "medium" | "high"
  highlights: string[]
}

export default function ResultsPage() {
  const [routeData, setRouteData] = useState<any>(null)
  const [routes, setRoutes] = useState<Route[]>([])

  useEffect(() => {
    const data = localStorage.getItem("routeData")
    if (data) {
      const parsed = JSON.parse(data)
      setRouteData(parsed)

      // Generate mock routes based on preference
      const mockRoutes: Route[] = [
        {
          id: 1,
          name: "Safest Route",
          eta: "25 min",
          distance: "8.2 km",
          safetyScore: "high",
          pollutionLevel: "low",
          highlights: ["Well-lit streets", "Low crime area", "Emergency services nearby"],
        },
        {
          id: 2,
          name: "Balanced Route",
          eta: "18 min",
          distance: "6.8 km",
          safetyScore: "medium",
          pollutionLevel: "medium",
          highlights: ["Moderate traffic", "Some construction", "Good visibility"],
        },
        {
          id: 3,
          name: "Fastest Route",
          eta: "15 min",
          distance: "6.1 km",
          safetyScore: "low",
          pollutionLevel: "high",
          highlights: ["Heavy traffic area", "Industrial zone", "Limited lighting"],
        },
      ]

      setRoutes(mockRoutes)
    }
  }, [])

  const getSafetyColor = (score: string) => {
    switch (score) {
      case "high":
        return "bg-green-100 text-green-800 border-green-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPollutionColor = (level: string) => {
    switch (level) {
      case "low":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleSelectRoute = (routeId: number) => {
    localStorage.setItem("selectedRoute", JSON.stringify(routes.find((r) => r.id === routeId)))
    window.location.href = "/route-details"
  }

  if (!routeData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading routes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6 pt-4">
          <Button variant="ghost" size="sm" onClick={() => (window.location.href = "/home")} className="mr-3">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-800">Route Options</h1>
            <p className="text-sm text-gray-600">
              {routeData.start} → {routeData.destination}
            </p>
          </div>
        </div>

        {/* Map Placeholder */}
        <Card className="p-4 mb-6 bg-gray-100 h-48 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <MapPin className="w-12 h-12 mx-auto mb-2" />
            <p>Interactive Map</p>
            <p className="text-sm">Showing {routes.length} route options</p>
          </div>
        </Card>

        {/* Route Cards */}
        <div className="space-y-4">
          {routes.map((route, index) => (
            <Card
              key={route.id}
              className={`p-4 shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                index === 0 ? "ring-2 ring-green-500" : ""
              }`}
              onClick={() => handleSelectRoute(route.id)}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-800 flex items-center">
                    {route.name}
                    {index === 0 && <Badge className="ml-2 bg-green-500">Recommended</Badge>}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <Clock className="w-4 h-4 mr-1" />
                    {route.eta} • {route.distance}
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={`mb-1 ${getSafetyColor(route.safetyScore)}`}>
                    <Shield className="w-3 h-3 mr-1" />
                    {route.safetyScore} safety
                  </Badge>
                  <br />
                  <Badge className={getPollutionColor(route.pollutionLevel)}>
                    <Leaf className="w-3 h-3 mr-1" />
                    {route.pollutionLevel} pollution
                  </Badge>
                </div>
              </div>

              <div className="space-y-1">
                {route.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center text-xs text-gray-600">
                    <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                    {highlight}
                  </div>
                ))}
              </div>

              <Button
                className="w-full mt-3 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                onClick={(e) => {
                  e.stopPropagation()
                  handleSelectRoute(route.id)
                }}
              >
                Select This Route
              </Button>
            </Card>
          ))}
        </div>

        {/* Alternative Actions */}
        <div className="mt-6 text-center space-y-2">
          <Button variant="outline" onClick={() => (window.location.href = "/home")} className="w-full">
            Search Different Route
          </Button>
        </div>
      </div>
    </div>
  )
}
