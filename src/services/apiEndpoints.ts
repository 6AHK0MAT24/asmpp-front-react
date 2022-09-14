export default {
  routesListUrl: '/api/asmpp/routes', // - Список маршрутов
  transportsListUrl: '/api/asmpp/transports', // - Транспорт
  // 1:
  routeNumberUrl: '/api/asmpp/group/routeNumber',
  routeNumberReportUrl: '/api/report/download/groupRouteNumbers',
  // 2:
  tripsUrl: '/api/asmpp/group/trips', // таблица 1; 4 - таблица 2
  tripStationsIdUrl: (tripSpecificId: string) =>
    `/api/asmpp/tripStations/${tripSpecificId}`, // таблица 2
  tripsReportUrl: '/api/report/download/groupTrips',
  // 3:
  tripStationsUrl: '/api/asmpp/tripStations',
  tripsStationsReportUrl: '/api/report/download/tripStations',
  // 4:
  transportUrl: '/api/asmpp/trips/group/transport',
  transportReportUrl: '/api/report/download/groupTransport',
  // 5:
  categoryUrl: '/api/asmpp/category',
  categoryReportUrl: '/api/report/download/category',
  // 6:
  daysUrl: '/api/asmpp/days',
  daysReportUrl: '/api/report/download/days',
  // 7:
  hoursUrl: '/api/asmpp/hours',
  hoursReportUrl: '/api/report/download/hours',
  // 8:
  monitoringUrl: '/api/asmpp/monitoring',
  monitoringReportUrl: '/api/report/download/monitoring',
  // 9:
  transportsOnlineUrl: '/api/asmpp/transports/online/info',
  // graphql
  graphqlUrl: '/graphql',
  subscriptionsWsUrl: 'ws://192.168.100.6:8182/graphql',
} as const
