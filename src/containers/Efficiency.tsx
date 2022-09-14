import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import KendoTable from 'components/Tables/KendoTable/KendoTable'
import DownloadButton from 'components/DownloadButton/DownloadButton'
import tripsDuringPeriod from 'components/Tables/KendoTable/columnsMarkup/tripsDuringPeriod'
import loadRollingStock from 'components/Tables/KendoTable/columnsMarkup/loadingRollingStock'
import RowSelectionTip from 'components/RowSelectionTip/RowSelectionTip'
import useFetchTable from 'hooks/useFetchTable'
import store from 'store'

const Efficiency: React.FC = () => {
  const { t } = useTranslation('tables')
  const loadingTransportData = useFetchTable(store.api.fetchTransportData)
  const [loadingTripsData, setLoadingTripsData] = useState(false)
  const [selectedItemId, setSelectedItemId] = useState<string | undefined>()
  const handleSelectedId = (id: string) => setSelectedItemId(id)
  const [selectionTipText, setSelectionTipText] = useState<string | undefined>()

  useEffect(() => {
    if (selectedItemId && store.api.tsIds) {
      setLoadingTripsData(true)
      store.api
        .fetchTripsSpecificTsId(selectedItemId)
        .then(
          () =>
            !store.data.tripsData?.items.length &&
            setSelectionTipText('Нет данных')
        )
        .finally(() => setLoadingTripsData(false))
    }
  }, [selectedItemId])
  return (
    <>
      <DownloadButton
        fetchReportFunction={store.api.fetchDownloadTransport}
        disabledButton={!store.data.transportData}
      />
      <KendoTable
        loading={loadingTransportData}
        data={store.data.transportData}
        title={t('rollingStockLoad.title')}
        columns={loadRollingStock}
        selectable
        selectionDataItemKey={'transportId'}
        handleSelectedId={handleSelectedId}
        halfHeight
      />
      {selectedItemId ? (
        <KendoTable
          loading={loadingTripsData}
          data={store.data.tripsData}
          title={t('tripsDuringPeriod.title')}
          columns={tripsDuringPeriod}
          halfHeight
        />
      ) : (
        <RowSelectionTip text={selectionTipText} />
      )}
    </>
  )
}

export default observer(Efficiency)
