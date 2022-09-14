import { ResponseSummary } from 'types/types'

export interface TransportsOnlineItem {
  boardNumber: string
  transportModel: string
  currentRouteNumber: string
  cabinCapacity: number
  occupancy: number
  load: number
}

export interface TransportsOnlineAmount {
  load: number
  occupancy: number
  cabinCapacity: number
}

export interface TransportsOnline extends ResponseSummary {
  items: TransportsOnlineItem[]
  amount: TransportsOnlineAmount
}
