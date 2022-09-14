import React, { useRef } from 'react'
import { observer } from 'mobx-react-lite'
import AntDTable from 'components/Tables/AntDTable/AntDTable'
import DownloadButton from 'components/DownloadButton/DownloadButton'
import systemReport from 'components/Tables/AntDTable/colomunsMarkup/systemReport'
import useFetchTable from 'hooks/useFetchTable'
import type { InputRef } from 'antd'
import store from 'store'

const Monitoring: React.FC = () => {
  const loading = useFetchTable(store.api.fetchMonitoringData)
  const searchInput = useRef<InputRef>(null)

  return (
    <>
      <DownloadButton
        fetchReportFunction={store.api.fetchDownloadMonitoring}
        disabledButton={!store.data.monitoringData}
      />
      <AntDTable
        loading={loading}
        data={store.data.monitoringData}
        columns={systemReport(searchInput)}
        multiSelectable={false}
      />
    </>
  )
}

export default observer(Monitoring)
