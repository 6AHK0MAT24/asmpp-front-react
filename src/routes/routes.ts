import React from 'react'
import {
  DateRangeOutlined,
  PieChart,
  DepartureBoard,
  Wifi,
  AssignmentOutlined,
  MapOutlined,
  Person,
  LocalShippingOutlined,
  RestoreOutlined,
  DirectionsBus,
} from '@mui/icons-material'
import roles from 'routes/roles'

const TrafficVolume = React.lazy(() => import('containers/TrafficVolume'))
const Trip = React.lazy(() => import('containers/Trip'))
const Stops = React.lazy(() => import('containers/Stops'))
const Efficiency = React.lazy(() => import('containers/Efficiency'))
const DailyTransportation = React.lazy(
  () => import('containers/DailyTransportation')
)
const PassengerTraffic = React.lazy(() => import('containers/PassengerTraffic'))
const TransportLoad = React.lazy(() => import('containers/TransportLoad'))
const Monitoring = React.lazy(() => import('containers/Monitoring'))
const Users = React.lazy(() => import('containers/Users'))
const Chart = React.lazy(() => import('containers/Chart'))

const routes = [
  {
    path: '/',
    title: 'base',
    element: TrafficVolume,
    navbarIcon: MapOutlined,
    access: roles.route,
  },
  {
    path: '/trip',
    title: 'trip',
    element: Trip,
    navbarIcon: AssignmentOutlined,
    access: roles.trip,
  },
  {
    path: '/stops',
    title: 'stops',
    element: Stops,
    navbarIcon: DirectionsBus,
    access: roles.station,
  },
  {
    path: '/efficiency',
    title: 'efficiency',
    element: Efficiency,
    navbarIcon: LocalShippingOutlined,
    access: roles.transport,
  },
  {
    path: '/chart',
    title: 'chart',
    element: Chart,
    navbarIcon: PieChart,
    access: roles.category,
  },
  {
    path: '/dailyTransportation',
    title: 'dailyTransportation',
    element: DailyTransportation,
    navbarIcon: DateRangeOutlined,
    access: roles.day,
  },
  {
    path: '/passengerTraffic',
    title: 'passengerTraffic',
    element: PassengerTraffic,
    navbarIcon: RestoreOutlined,
    access: roles.hour,
  },
  {
    path: '/monitoring',
    title: 'monitoring',
    element: Monitoring,
    navbarIcon: Wifi,
    access: roles.door,
  },
  {
    path: '/transportLoad',
    title: 'transportLoad',
    element: TransportLoad,
    navbarIcon: DepartureBoard,
    access: roles.online,
  },
  {
    path: '/users',
    title: 'users',
    element: Users,
    navbarIcon: Person,
    access: roles.admin,
  },
]

export default routes
