import { ResponseSummary } from './types'

export interface RoutesItem {
  id: number
  routeNumber: string
  isCircular: boolean
  routeType: {
    id: number
    name: string
  }
}

export interface Routes extends Pick<ResponseSummary, 'total' | 'success'> {
  items: RoutesItem[]
}
