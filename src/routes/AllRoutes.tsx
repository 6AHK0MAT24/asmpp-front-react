import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import Loading from 'components/Loading/Loading'
import store from 'store'

const AllRoutes: React.FC = () => {
  return (
    <React.Suspense fallback={<Loading />}>
      <Routes>
        {store.data.filterRoutesByRoles.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.element />}
          />
        ))}
      </Routes>
    </React.Suspense>
  )
}

export default observer(AllRoutes)
