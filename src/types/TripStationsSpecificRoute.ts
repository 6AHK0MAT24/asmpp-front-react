import { ResponseSummary } from 'types/types'

export interface TripStationsSpecificRouteItem {
  stationId: number
  name: string
  timestamp: number
  income: number
  outcome: number
  occupancy: number
  load: number
  coords: {
    first: number
    second: number
  }
}

export interface TripStationsSpecificRoute extends ResponseSummary {
  items: TripStationsSpecificRouteItem[]
}
