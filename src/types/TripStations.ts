import { ResponseSummary } from './types'

export interface TripStationsItem {
  stationId: number
  name: string
  generalIncome: number
  generalOutcome: number
  averageIncome: number
  averageOutcome: number
  averageOccupancy: number
  maxLoad: number
}

export interface TripStations extends ResponseSummary {
  items: TripStationsItem[]
}
