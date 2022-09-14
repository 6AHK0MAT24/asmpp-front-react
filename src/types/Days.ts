import { ResponseSummary } from 'types/types'

export interface DaysItem {
  startDate: number
  tripSize: number
  transported: number
  transportedAverage: number
  passPerHour: number
  passPerKm: number
  dayOfWeek: string
}

export interface DaysAmount {
  transportedAverage: number
  transported: number
  tripSize: number
  passPerHour: number
  passPerKm: number
}

export interface Days extends ResponseSummary {
  items: DaysItem[]
  amount: DaysAmount
}
