import React, { useRef } from 'react'
import { observer } from 'mobx-react-lite'
import AntDTable from 'components/Tables/AntDTable/AntDTable'
import DownloadButton from 'components/DownloadButton/DownloadButton'
import dailyTransportationBySurveyDay from 'components/Tables/AntDTable/colomunsMarkup/dailyTransportationBySurveyDay'
import useFetchTable from 'hooks/useFetchTable'
import type { InputRef } from 'antd'
import store from 'store'

const DailyTransportation: React.FC = () => {
  const loading = useFetchTable(store.api.fetchDaysData)
  const searchInput = useRef<InputRef>(null)

  return (
    <>
      <DownloadButton
        fetchReportFunction={store.api.fetchDownloadDays}
        disabledButton={!store.data.daysData}
      />
      <AntDTable
        data={store.data.daysData}
        columns={dailyTransportationBySurveyDay(searchInput)}
        loading={loading}
        emptySummaryCells={2}
      />
    </>
  )
}

export default observer(DailyTransportation)
