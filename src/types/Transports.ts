export interface TransportsItem {
  id: number
  boardNumber: string
}

export interface Transports {
  items: TransportsItem[]
  success: boolean
}
