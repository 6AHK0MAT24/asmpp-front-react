import { ResponseSummary } from 'types/types'

export interface TransportItem {
  transportId: number
  boardNumber: string
  model: string
  transported: number
  passPerHour: number
  passPerKm: number
  cabinCapacity: number
  averageOccupancy: number
  averageLoad: number
}

export interface TransportAmount {
  transported: number
  averageOccupancy: number
  averageLoad: number
  passPerKm: number
  cabinCapacity: number
}

export interface Transport extends ResponseSummary {
  items: TransportItem[]
  amount: TransportAmount
  transportedTotal: number
  passPerKmTotal: number
  cabinCapacityTotal: number
  averageOccupancyTotal: number
  averageLoadTotal: number
}
