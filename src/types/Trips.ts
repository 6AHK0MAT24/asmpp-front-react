import { ResponseSummary } from 'types/types'

export interface TripsItem {
  tripSpecificId: number
  boardNumber: string
  routeNumber: string
  direction: string
  startDate: number
  finishDate: number
  duration: number
  typeTransport: string
  modelTransport: string
  passInHour: number
  passPerKm: number | null
  transported: number
  averageOccupancy: number
  capacity: number
  maxLoad: number
}

export interface TripsAmount {
  maxLoad: number
  transported: number
  averageOccupancy: number
  passPerKm: number
  passInHour: number
}

export interface Trips extends ResponseSummary {
  items: TripsItem[]
  amount: TripsAmount
  additionalInfo: {
    totalTrips: number
    transportedAverage: number
    transportedMax: number
    transportedMin: number
  }
  passInHourTotal: number
  passPerKmTotal: number
  transportedTotal: number
  averageOccupancyTotal: number
}
