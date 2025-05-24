"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, User, Bell, Shield, MapPin, Clock, Trash2, SettingsIcon } from "lucide-react"

interface SavedRoute {
  id: number
  name: string
  from: string
  to: string
  lastUsed: string
  safetyScore: "high" | "medium" | "low"
}

export default function SettingsPage() {
  const [realTimeAlerts, setRealTimeAlerts] = useState(true)
  const [safetyFirst, setSafetyFirst] = useState(true)
  const [avoidCrimeAreas, setAvoidCrimeAreas] = useState(true)
  const [ecoMode, setEcoMode] = useState(false)

  const savedRoutes: SavedRoute[] = [
    {
      id: 1,
      name: "Home to Work",
      from: "Home",
      to: "Downtown Office",
      lastUsed: "2 hours ago",
      safetyScore: "high",
    },
    {
      id: 2,
      name: "Gym Route",
      from: "Home",
      to: "Fitness Center",
      lastUsed: "Yesterday",
      safetyScore: "medium",
    },
    {
      id: 3,
      name: "Shopping Trip",
      from: "Home",
      to: "Mall Plaza",
      lastUsed: "3 days ago",
      safetyScore: "high",
    },
  ]

  const getSafetyColor = (score: string) => {
    switch (score) {
      case "high":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleDeleteRoute = (routeId: number) => {
    // In a real app, this would delete from the database
    alert(`Route ${routeId} deleted`)
  }

  const handleUseRoute = (route: SavedRoute) => {
    // Pre-fill the home page with this route data
    localStorage.setItem(
      "routeData",
      JSON.stringify({
        start: route.from,
        destination: route.to,
        preference: "safety",
      }),
    )
    window.location.href = "/results"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6 pt-4">
          <Button variant="ghost" size="sm" onClick={() => (window.location.href = "/home")} className="mr-3">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center">
            <SettingsIcon className="w-6 h-6 mr-2 text-gray-700" />
            <h1 className="text-xl font-bold text-gray-800">Settings</h1>
          </div>
        </div>

        {/* Profile Section */}
        <Card className="p-6 mb-6">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mr-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">John Doe</h3>
              <p className="text-sm text-gray-600">SafeRoute Premium</p>
              <Badge className="mt-1 bg-gold-100 text-gold-800">Premium Member</Badge>
            </div>
          </div>
        </Card>

        {/* Safety Preferences */}
        <Card className="p-6 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Safety Preferences
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Safety First Mode</p>
                <p className="text-sm text-gray-600">Prioritize safety over speed</p>
              </div>
              <Switch checked={safetyFirst} onCheckedChange={setSafetyFirst} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Avoid Crime Areas</p>
                <p className="text-sm text-gray-600">Route around high-crime zones</p>
              </div>
              <Switch checked={avoidCrimeAreas} onCheckedChange={setAvoidCrimeAreas} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Eco-Friendly Routes</p>
                <p className="text-sm text-gray-600">Minimize environmental impact</p>
              </div>
              <Switch checked={ecoMode} onCheckedChange={setEcoMode} />
            </div>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="p-6 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Notifications
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Real-time Alerts</p>
                <p className="text-sm text-gray-600">Safety and traffic updates</p>
              </div>
              <Switch checked={realTimeAlerts} onCheckedChange={setRealTimeAlerts} />
            </div>
          </div>
        </Card>

        {/* Saved Routes */}
        <Card className="p-6 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Saved Routes
          </h3>
          <div className="space-y-3">
            {savedRoutes.map((route) => (
              <div key={route.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{route.name}</h4>
                    <p className="text-sm text-gray-600">
                      {route.from} → {route.to}
                    </p>
                    <div className="flex items-center mt-2">
                      <Clock className="w-4 h-4 mr-1 text-gray-400" />
                      <span className="text-xs text-gray-500">{route.lastUsed}</span>
                      <Badge className={`ml-2 text-xs ${getSafetyColor(route.safetyScore)}`}>
                        {route.safetyScore} safety
                      </Badge>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleUseRoute(route)}>
                      Use
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleDeleteRoute(route.id)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* App Info */}
        <Card className="p-6">
          <div className="text-center text-sm text-gray-600 space-y-2">
            <p>SafeRoute AI v2.1.0</p>
            <div className="flex justify-center space-x-4">
              <Button variant="ghost" size="sm">
                Privacy Policy
              </Button>
              <Button variant="ghost" size="sm">
                Terms of Service
              </Button>
            </div>
            <Button variant="ghost" size="sm" className="text-red-600">
              Sign Out
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
