import { makeAutoObservable } from 'mobx'
import type { Routes } from 'types/Routes'
import type { Transports } from 'types/Transports'
import type { RouteNumber } from 'types/RouteNumber'
import type { Trips } from 'types/Trips'
import type { TripStationsSpecificRoute } from 'types/TripStationsSpecificRoute'
import type { TripStations } from 'types/TripStations'
import type { Transport } from 'types/Transport'
import type { Category } from 'types/Category'
import type { Days } from 'types/Days'
import type { Hours } from 'types/Hours'
import type { Monitoring } from 'types/Monitoring'
import type { TransportsOnline } from 'types/TransportsOnline'
import routes from 'routes/routes'

export default class Data {
  userRoles = localStorage.getItem('roles')?.split(',')
  routesList: Routes | undefined
  transportsList: Transports | undefined
  routeNumberData: RouteNumber | undefined
  tripsData: Trips | undefined
  tripStationsSpecificRouteData: TripStationsSpecificRoute | undefined
  tripStationsData: TripStations | undefined
  transportData: Transport | undefined
  categoryData: Category | undefined
  daysData: Days | undefined
  hoursData: Hours | undefined
  monitoringData: Monitoring | undefined
  transportsOnlineData: TransportsOnline | undefined

  constructor() {
    makeAutoObservable(this)
  }

  get filterRoutesByRoles() {
    return routes.filter((route) => this.userRoles?.includes(route.access))
  }

  setRoutesList(routesData: Routes | undefined) {
    this.routesList = routesData
  }

  setTransportsList(transportsData: Transports | undefined) {
    this.transportsList = transportsData
  }

  setRouteNumberData(routeNumberData: RouteNumber | undefined) {
    this.routeNumberData = routeNumberData
  }

  setTripsData(tripsData: Trips | undefined) {
    this.tripsData = tripsData
  }

  setTripStationsSpecificRouteData(
    tripStationsSpecificRouteData: TripStationsSpecificRoute | undefined
  ) {
    this.tripStationsSpecificRouteData = tripStationsSpecificRouteData
  }

  setTripStationsData(tripStationsData: TripStations | undefined) {
    this.tripStationsData = tripStationsData
  }

  setTransportData(transportData: Transport | undefined) {
    this.transportData = transportData
  }

  setCategoryData(categoryData: Category | undefined) {
    this.categoryData = categoryData
  }

  setDaysData(daysData: Days | undefined) {
    this.daysData = daysData
  }

  setHoursData(hoursData: Hours | undefined) {
    this.hoursData = hoursData
  }

  setMonitoringData(monitoringData: Monitoring | undefined) {
    this.monitoringData = monitoringData
  }

  setTransportsOnlineData(transportsOnlineData: TransportsOnline | undefined) {
    this.transportsOnlineData = transportsOnlineData
  }

  setUserRoles(rolesData: string | undefined) {
    this.userRoles = rolesData?.split(',')
  }

  clearTransportsList() {
    this.setTransportsList(undefined)
  }

  clearLists() {
    this.setRoutesList(undefined)
    this.setTransportsList(undefined)
  }

  clearTablesData() {
    this.setRouteNumberData(undefined)
    this.setTripsData(undefined)
    this.setTripStationsSpecificRouteData(undefined)
    this.setTripStationsData(undefined)
    this.setTransportData(undefined)
    this.setCategoryData(undefined)
    this.setDaysData(undefined)
    this.setHoursData(undefined)
    this.setMonitoringData(undefined)
    this.setTransportsOnlineData(undefined)
  }
}
