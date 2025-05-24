"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Navigation, AlertTriangle, Phone, RefreshCw, MapPin, Clock, Shield, Volume2 } from "lucide-react"

interface RouteStep {
  id: number
  instruction: string
  distance: string
  warning?: string
  warningType?: "crime" | "pollution" | "construction"
}

export default function RouteDetailsPage() {
  const [selectedRoute, setSelectedRoute] = useState<any>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [isNavigating, setIsNavigating] = useState(false)
  const [showAlert, setShowAlert] = useState(false)

  const routeSteps: RouteStep[] = [
    {
      id: 1,
      instruction: "Head north on Main Street",
      distance: "0.5 km",
    },
    {
      id: 2,
      instruction: "Turn right onto Oak Avenue",
      distance: "1.2 km",
    },
    {
      id: 3,
      instruction: "Continue straight through downtown",
      distance: "2.1 km",
      warning: "High crime area ahead - stay alert",
      warningType: "crime",
    },
    {
      id: 4,
      instruction: "Turn left onto Pine Street",
      distance: "0.8 km",
    },
    {
      id: 5,
      instruction: "Arrive at destination",
      distance: "0.1 km",
    },
  ]

  useEffect(() => {
    const data = localStorage.getItem("selectedRoute")
    if (data) {
      setSelectedRoute(JSON.parse(data))
    }

    // Simulate real-time alert
    const timer = setTimeout(() => {
      setShowAlert(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleStartNavigation = () => {
    setIsNavigating(true)
  }

  const handleEmergencySOS = () => {
    alert("Emergency SOS activated! Contacting emergency services...")
  }

  const handleReRoute = () => {
    window.location.href = "/results"
  }

  const getWarningIcon = (type?: string) => {
    switch (type) {
      case "crime":
        return "🚨"
      case "pollution":
        return "🏭"
      case "construction":
        return "🚧"
      default:
        return "⚠️"
    }
  }

  if (!selectedRoute) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading route details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pt-4">
          <Button variant="ghost" size="sm" onClick={() => (window.location.href = "/results")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="text-center">
            <h1 className="text-lg font-bold text-gray-800">{selectedRoute.name}</h1>
            <p className="text-sm text-gray-600">
              {selectedRoute.eta} • {selectedRoute.distance}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={handleReRoute}>
            <RefreshCw className="w-5 h-5" />
          </Button>
        </div>

        {/* Real-time Alert */}
        {showAlert && (
          <Alert className="mb-4 border-orange-200 bg-orange-50 animate-pulse">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              <strong>Safety Alert:</strong> Construction zone ahead. Reduced visibility reported.
            </AlertDescription>
          </Alert>
        )}

        {/* Map View */}
        <Card className="p-4 mb-6 bg-gray-100 h-64 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <Navigation className="w-16 h-16 mx-auto mb-2 animate-pulse" />
              <p className="font-medium">Live Navigation Map</p>
              <p className="text-sm">Turn-by-turn directions</p>
            </div>
          </div>

          {/* Simulated route line */}
          <div className="absolute top-4 left-4 right-4 h-1 bg-blue-500 rounded-full opacity-30"></div>
          <div className="absolute top-8 left-8 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
          <div className="absolute bottom-8 right-8 w-3 h-3 bg-red-500 rounded-full"></div>
        </Card>

        {/* Current Step */}
        {isNavigating && (
          <Card className="p-4 mb-4 bg-blue-50 border-blue-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                <Navigation className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-blue-800">{routeSteps[currentStep]?.instruction}</p>
                <p className="text-sm text-blue-600">in {routeSteps[currentStep]?.distance}</p>
              </div>
              <Button size="sm" variant="ghost">
                <Volume2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        )}

        {/* Route Steps */}
        <Card className="p-4 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Turn-by-turn Directions
          </h3>
          <div className="space-y-3">
            {routeSteps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-start p-3 rounded-lg transition-all ${
                  isNavigating && index === currentStep
                    ? "bg-blue-50 border-2 border-blue-200"
                    : index < currentStep
                      ? "bg-gray-50 opacity-60"
                      : "hover:bg-gray-50"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-medium ${
                    isNavigating && index === currentStep
                      ? "bg-blue-500 text-white"
                      : index < currentStep
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{step.instruction}</p>
                  <p className="text-sm text-gray-600">{step.distance}</p>
                  {step.warning && (
                    <div className="mt-2 flex items-center text-sm text-orange-700 bg-orange-50 p-2 rounded">
                      <span className="mr-2">{getWarningIcon(step.warningType)}</span>
                      {step.warning}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          {!isNavigating ? (
            <Button
              onClick={handleStartNavigation}
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white py-3 text-lg font-semibold"
            >
              <Navigation className="w-5 h-5 mr-2" />
              Start Navigation
            </Button>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" onClick={() => setIsNavigating(false)}>
                Pause
              </Button>
              <Button onClick={handleReRoute} variant="outline">
                Re-route
              </Button>
            </div>
          )}

          <Button onClick={handleEmergencySOS} variant="destructive" className="w-full bg-red-500 hover:bg-red-600">
            <Phone className="w-5 h-5 mr-2" />
            Emergency SOS
          </Button>
        </div>

        {/* Route Info */}
        <Card className="p-4 mt-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <Clock className="w-5 h-5 mx-auto mb-1 text-blue-500" />
              <p className="text-sm font-medium">{selectedRoute.eta}</p>
              <p className="text-xs text-gray-600">ETA</p>
            </div>
            <div>
              <Shield className="w-5 h-5 mx-auto mb-1 text-green-500" />
              <p className="text-sm font-medium capitalize">{selectedRoute.safetyScore}</p>
              <p className="text-xs text-gray-600">Safety</p>
            </div>
            <div>
              <MapPin className="w-5 h-5 mx-auto mb-1 text-gray-500" />
              <p className="text-sm font-medium">{selectedRoute.distance}</p>
              <p className="text-xs text-gray-600">Distance</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
