import { ResponseSummary } from 'types/types'

export interface DI {
  first: number
  second: number
}
export interface DoorCounter {
  door?: DI
  DI1?: DI
  DI2?: DI
  DI3?: DI
  DI4?: DI
  DI10?: DI
  DI11?: DI
}

export interface MonitoringItem {
  tsId: number
  boardNumber: string
  packetAmount: number
  incomeAmount: number
  outcomeAmount: number
  doorCounter: DoorCounter
}

export interface Monitoring extends ResponseSummary {
  items: MonitoringItem[]
  maxDoors: number
}
