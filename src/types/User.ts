interface UserRole {
  roleId?: number
  name: string
}

export interface User {
  id: string
  username?: string
  password?: string
  roles?: UserRole[]
}

export interface TableUser {
  key?: string | number
  id: number
  username?: string
  password?: string
  admin_role?: boolean
  user_role?: boolean
  route_role?: boolean
  trip_role?: boolean
  station_role?: boolean
  transport_role?: boolean
  category_role?: boolean
  day_role?: boolean
  hour_role?: boolean
  online_role?: boolean
  door_role?: boolean
  report_role?: boolean
}
