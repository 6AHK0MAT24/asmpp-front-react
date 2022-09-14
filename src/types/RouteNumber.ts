import { ResponseSummary } from './types'

export interface RouteNumberItem {
  routeNumber: string
  circular: boolean
  dayType: string
  tripSize: number
  fwTripTransported: number
  bwTripTransported: number
  tripsTransported: number
  unevennessCoeff: number | null
  averageOccupancy: number
  maxLoad: number
  vehicleType: string | null
}

export interface RouteNumberAmount {
  fwTripTransported: number
  maxLoad: number
  bwTripTransported: number
  averageOccupancy: number
  tripSize: number
  tripsTransported: number
}

export interface RouteNumber extends ResponseSummary {
  items: RouteNumberItem[]
  amount: RouteNumberAmount
}
