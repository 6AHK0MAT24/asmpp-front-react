import { makeAutoObservable, runInAction } from 'mobx'
import moment from 'moment'
import i18n from 'i18next'
import axiosClient from 'services/axiosClient'
import axios from 'axios'
import apiEndpoints from 'services/apiEndpoints'
import type { AxiosResponse } from 'axios'
import type { Trips } from 'types/Trips'
import type { TripStationsSpecificRoute } from 'types/TripStationsSpecificRoute'
import type { Routes } from 'types/Routes'
import type { Transports } from 'types/Transports'
import type { RouteNumber } from 'types/RouteNumber'
import type { TripStations } from 'types/TripStations'
import type { Transport } from 'types/Transport'
import type { Category } from 'types/Category'
import type { Days } from 'types/Days'
import type { Hours } from 'types/Hours'
import type { Monitoring } from 'types/Monitoring'
import type { TransportsOnline } from 'types/TransportsOnline'
import store from 'store'

// TODO нужен ли словарь в сторе? или лучше title передавать в месте вызова функций

export default class Api {
  store: typeof store
  loggedIn = !!localStorage.getItem('jwt')
  utcOffset = 3
  startDate = moment().hour(3).minute(0).valueOf()
  endDate = moment().add(1, 'day').hour(2).minute(59).valueOf()
  dayType: 'WEEKEND_DAY' | 'WORK_DAY' | 'ALL' = 'ALL'
  directionIds: '1' | '2' | '1,2' = '1,2'
  page = '0'
  itemsPerPage = '100'

  specificTsId: string | undefined
  routes: string | undefined
  tsIds: string | undefined

  constructor(root: any) {
    makeAutoObservable(this)
    this.store = root
  }

  setLoggedIn() {
    if (localStorage.getItem('jwt')) {
      this.loggedIn = true
    }
  }

  setLoggedOut() {
    this.loggedIn = false
    localStorage.clear()
    this.store.data.clearLists()
    this.store.data.clearTablesData()
    this.initDate()
  }

  initDate() {
    this.startDate = moment().hour(3).minute(0).valueOf()
    this.endDate = moment().add(1, 'day').hour(2).minute(59).valueOf()
  }

  setUtcOffset = (offset: number) => {
    this.utcOffset = Number(offset)
  }

  setStartDate(timestamp: number) {
    this.startDate = timestamp
  }

  setEndDate(timestamp: number) {
    this.endDate = timestamp
  }

  setDayType = (dayType: typeof this.dayType) => {
    this.dayType = dayType
  }

  setDirectionId = (directionId: typeof this.directionIds) => {
    this.directionIds = directionId
  }

  setPage(page: string) {
    this.page = page
  }

  setItemsPerPage(itemsPerPage: string) {
    this.itemsPerPage = itemsPerPage
  }

  setRoutes(str: string) {
    this.routes = str
  }

  setTsIds(str: string) {
    this.tsIds = str
  }

  clearRoutesTsIdsQuery() {
    this.routes = ''
    this.tsIds = ''
  }

  setSpecificTsId(str: string) {
    this.specificTsId = str
  }

  get startDateWithOffset() {
    return moment(this.startDate).utcOffset(this.utcOffset).valueOf()
  }

  get endDateWithOffset() {
    return moment(this.endDate).utcOffset(this.utcOffset).valueOf()
  }

  get dateQuery() {
    return `?startDate=${this.startDate}&finishDate=${this.endDate}`
  }

  get routesQuery() {
    return `&routeNumbers=${this.routes}`
  }

  get specificTsIdQuery() {
    return `&tsIds=${this.specificTsId}`
  }

  get tsIdsQuery() {
    return `&tsIds=${this.tsIds}`
  }

  get dayTypeDirectionsQuery() {
    return `&directionIds=${this.directionIds}&dayType=${this.dayType}`
  }

  get itemsPerPageQuery() {
    return `&itemsPerPage=${this.itemsPerPage}&page=${this.page}`
  }

  get coreQueries() {
    return (
      this.dateQuery +
      this.routesQuery +
      this.tsIdsQuery +
      this.dayTypeDirectionsQuery +
      this.itemsPerPageQuery
    )
  }

  downloadReport(title: string, data: any) {
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', title)
    document.body.appendChild(link)
    link.click()
  }

  fetchRoutesList = async () => {
    runInAction(() => store.data.clearLists())
    runInAction(() => store.data.clearTablesData())

    return axiosClient
      .get(`${apiEndpoints.routesListUrl}${this.dateQuery}`)
      .then((res: AxiosResponse<Routes>) =>
        this.store.data.setRoutesList(res.data)
      )
  }

  fetchTransportsList = async () => {
    return axiosClient
      .get(
        `${apiEndpoints.transportsListUrl}${this.dateQuery}${this.routesQuery}`
      )
      .then((res: AxiosResponse<Transports>) =>
        this.store.data.setTransportsList(res.data)
      )
  }

  fetchRouteNumberData = async () => {
    return axiosClient
      .get(`${apiEndpoints.routeNumberUrl}${this.coreQueries}`)
      .then((res: AxiosResponse<RouteNumber>) =>
        this.store.data.setRouteNumberData(res.data)
      )
  }

  fetchDownloadRouteNumber = async () => {
    return axiosClient({
      url: `${apiEndpoints.routeNumberReportUrl}${this.coreQueries}`,
      method: 'GET',
      responseType: 'blob',
    }).then((res: AxiosResponse<RouteNumber>) =>
      this.downloadReport(`${i18n.t('excelTables:routeNumber')}`, res.data)
    )
  }

  fetchTripsData = async () => {
    return axiosClient
      .get(`${apiEndpoints.tripsUrl}${this.coreQueries}`)
      .then((res: AxiosResponse<Trips>) =>
        this.store.data.setTripsData(res.data)
      )
  }

  fetchDownloadTrips = async () => {
    return axiosClient({
      url: `${apiEndpoints.tripsReportUrl}${this.coreQueries}`,
      method: 'GET',
      responseType: 'blob',
    }).then((res: AxiosResponse<Trips>) =>
      this.downloadReport(`${i18n.t('excelTables:trip')}`, res.data)
    )
  }

  fetchTripStationsSpecificRoute = async (id: string) => {
    // TODO через клиент ошибка не пробрасывается выше
    const token = localStorage.getItem('jwt')
    axios.defaults.headers.common['Authorization'] = token ? token : ''
    return axios
      .get(`${apiEndpoints.tripStationsIdUrl(id)}${this.coreQueries}`)
      .then((res: AxiosResponse<TripStationsSpecificRoute>) =>
        this.store.data.setTripStationsSpecificRouteData(res.data)
      )
  }

  fetchTripStationsData = async () => {
    return axiosClient
      .get(`${apiEndpoints.tripStationsUrl}${this.coreQueries}`)
      .then((res: AxiosResponse<TripStations>) =>
        this.store.data.setTripStationsData(res.data)
      )
  }

  fetchDownloadTripStations = async () => {
    return axiosClient({
      url: `${apiEndpoints.tripsStationsReportUrl}${this.coreQueries}`,
      method: 'GET',
      responseType: 'blob',
    }).then((res: AxiosResponse<TripStations>) => {
      this.downloadReport(`${i18n.t('excelTables:stops')}`, res.data)
    })
  }

  fetchTransportData = async () => {
    return axiosClient
      .get(`${apiEndpoints.transportUrl}${this.coreQueries}`)
      .then((res: AxiosResponse<Transport>) =>
        this.store.data.setTransportData(res.data)
      )
  }

  fetchDownloadTransport = async () => {
    return axiosClient({
      url: `${apiEndpoints.transportReportUrl}${this.coreQueries}`,
      method: 'GET',
      responseType: 'blob',
    }).then((res: AxiosResponse<Transport>) => {
      this.downloadReport(`${i18n.t('excelTables:efficiency')}`, res.data)
    })
  }

  fetchTripsSpecificTsId = async (tsId: string) => {
    this.setSpecificTsId(tsId)
    return axiosClient
      .get(
        apiEndpoints.tripsUrl +
          this.dateQuery +
          this.routesQuery +
          this.specificTsIdQuery +
          this.dayTypeDirectionsQuery +
          this.itemsPerPageQuery
      )
      .then((res: AxiosResponse<Trips>) =>
        this.store.data.setTripsData(res.data)
      )
  }

  fetchCategoryData = async () => {
    return axiosClient
      .get(`${apiEndpoints.categoryUrl}${this.coreQueries}`)
      .then((res: AxiosResponse<Category>) =>
        this.store.data.setCategoryData(res.data)
      )
  }

  fetchDownloadCategory = async () => {
    return axiosClient({
      url: `${apiEndpoints.categoryReportUrl}${this.coreQueries}`,
      method: 'GET',
      responseType: 'blob',
    }).then((res: AxiosResponse<Category>) => {
      this.downloadReport(`${i18n.t('excelTables:chart')}`, res.data)
    })
  }

  fetchDaysData = async () => {
    return axiosClient
      .get(`${apiEndpoints.daysUrl}${this.coreQueries}`)
      .then((res: AxiosResponse<Days>) => this.store.data.setDaysData(res.data))
  }

  fetchDownloadDays = async () => {
    return axiosClient({
      url: `${apiEndpoints.daysReportUrl}${this.coreQueries}`,
      method: 'GET',
      responseType: 'blob',
    }).then((res: AxiosResponse<Days>) =>
      this.downloadReport(
        `${i18n.t('excelTables:dailyTransportation')}`,
        res.data
      )
    )
  }

  fetchHoursData = async () => {
    return axiosClient
      .get(`${apiEndpoints.hoursUrl}${this.coreQueries}`)
      .then((res: AxiosResponse<Hours>) =>
        this.store.data.setHoursData(res.data)
      )
  }

  fetchDownloadHours = async () => {
    return axiosClient({
      url: `${apiEndpoints.hoursReportUrl}${this.coreQueries}`,
      method: 'GET',
      responseType: 'blob',
    }).then((res: AxiosResponse<Hours>) =>
      this.downloadReport(`${i18n.t('excelTables:passengerTraffic')}`, res.data)
    )
  }

  fetchMonitoringData = async () => {
    return axiosClient
      .get(`${apiEndpoints.monitoringUrl}${this.coreQueries}`)
      .then((res: AxiosResponse<Monitoring>) =>
        this.store.data.setMonitoringData(res.data)
      )
  }

  fetchDownloadMonitoring = async () => {
    return axiosClient({
      url: `${apiEndpoints.monitoringReportUrl}${this.coreQueries}`,
      method: 'GET',
      responseType: 'blob',
    }).then((res: AxiosResponse<Monitoring>) =>
      this.downloadReport(`${i18n.t('excelTables:monitoring')}`, res.data)
    )
  }

  fetchTransportsOnlineData = async () => {
    return axiosClient
      .get(`${apiEndpoints.transportsOnlineUrl}${this.coreQueries}`)
      .then((res: AxiosResponse<TransportsOnline>) =>
        this.store.data.setTransportsOnlineData(res.data)
      )
  }
}
