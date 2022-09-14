import React, { useRef } from 'react'
import { observer } from 'mobx-react-lite'
import trafficVolume from 'components/Tables/AntDTable/colomunsMarkup/trafficVolume'
import AntDTable from 'components/Tables/AntDTable/AntDTable'
import DownloadButton from 'components/DownloadButton/DownloadButton'
import useFetchTable from 'hooks/useFetchTable'
import type { InputRef } from 'antd'
import store from 'store'

const TrafficVolume: React.FC = () => {
  const loading = useFetchTable(store.api.fetchRouteNumberData)
  const searchInput = useRef<InputRef>(null)

  return (
    <>
      <DownloadButton
        fetchReportFunction={store.api.fetchDownloadRouteNumber}
        disabledButton={!store.data.routeNumberData}
      />
      <AntDTable
        data={store.data.routeNumberData}
        columns={trafficVolume(searchInput)}
        loading={loading}
        emptySummaryCells={2}
      />
    </>
  )
}

export default observer(TrafficVolume)
