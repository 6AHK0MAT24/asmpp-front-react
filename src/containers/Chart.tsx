import React from 'react'
import { observer } from 'mobx-react-lite'
import ratioTripsPassengers from 'components/Tables/AntDTable/colomunsMarkup/ratioTripsPassengers'
import AntDTable from 'components/Tables/AntDTable/AntDTable'
import DownloadButton from 'components/DownloadButton/DownloadButton'
import useFetchTable from 'hooks/useFetchTable'
import store from 'store'

const Chart: React.FC = () => {
  const loading = useFetchTable(store.api.fetchCategoryData)

  return (
    <>
      <DownloadButton
        fetchReportFunction={store.api.fetchDownloadCategory}
        disabledButton={!store.data.categoryData}
      />
      <AntDTable
        loading={loading}
        data={store.data.categoryData}
        columns={ratioTripsPassengers}
      />
    </>
  )
}

export default observer(Chart)
