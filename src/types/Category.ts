export interface CategoryItem {
  type: string
  trips: number
  percent: number
}

export interface Category {
  items: CategoryItem[]
  totalTrips: number
  total: number
  success: boolean
}
