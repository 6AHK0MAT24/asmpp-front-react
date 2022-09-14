import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import tripsDuringPeriod from 'components/Tables/KendoTable/columnsMarkup/tripsDuringPeriod'
import ChartContainer from 'components/Tables/KendoTable/ChartContainer/ChartContainer'
import KendoTable from 'components/Tables/KendoTable/KendoTable'
import DownloadButton from 'components/DownloadButton/DownloadButton'
import tripsDetailsByStops from 'components/Tables/KendoTable/columnsMarkup/tripsDetailsByStops'
import RowSelectionTip from 'components/RowSelectionTip/RowSelectionTip'
import useFetchTable from 'hooks/useFetchTable'
import type { AxiosError } from 'axios'
import type { TripStationsSpecificRouteItem } from 'types/TripStationsSpecificRoute'
import store from 'store'

const Trip: React.FC = () => {
  const { t } = useTranslation('tables')
  const [loadingTripStations, setLoadingTripStations] = useState(false)
  const loadingTripsData = useFetchTable(store.api.fetchTripsData)
  const [selectionTipText, setSelectionTipText] = useState<string | undefined>()
  const [selectedItemId, setSelectedItemId] = useState<string | undefined>()
  const handleSelectedId = (id: string) => setSelectedItemId(id)
  const [chartData, setChartData] = useState<
    [] | TripStationsSpecificRouteItem[]
  >([])

  useEffect(() => {
    if (selectedItemId) {
      if (store.api.routes && store.api.tsIds) {
        setLoadingTripStations(true)
        store.api
          .fetchTripStationsSpecificRoute(selectedItemId)
          .then(() => {
            if (!store.data.tripStationsSpecificRouteData?.items.length) {
              setChartData([])
              setSelectionTipText('Нет данных')
            } else {
              setChartData(store.data.tripStationsSpecificRouteData.items)
            }
          })
          .catch((reason: AxiosError) => {
            if (reason.response?.status === 400) {
              setSelectionTipText('Нет данных')
              setChartData([])
            }
          })
          .finally(() => setLoadingTripStations(false))
      }
    }
  }, [selectedItemId])
  return (
    <>
      <DownloadButton
        fetchReportFunction={store.api.fetchDownloadTrips}
        disabledButton={!store.data.tripsData}
      />
      <KendoTable
        loading={loadingTripsData}
        data={store.data.tripsData}
        title={t('tripsDuringPeriod.title')}
        columns={tripsDuringPeriod}
        selectable
        selectionDataItemKey={'tripSpecificId'}
        handleSelectedId={handleSelectedId}
        halfHeight
      />
      {selectedItemId && chartData.length ? (
        <>
          {/* TODO фильтровать названия ВНЕ ЗОНЫ и заменять на координаты toFixed(4) */}
          <KendoTable
            loading={loadingTripStations}
            data={store.data.tripStationsSpecificRouteData}
            title={t('tripsDetailsByStops.title')}
            columns={tripsDetailsByStops}
            halfHeight
          />
          <div>
            <ChartContainer data={chartData} />
          </div>
        </>
      ) : (
        <RowSelectionTip text={selectionTipText} />
      )}
    </>
  )
}

export default observer(Trip)
