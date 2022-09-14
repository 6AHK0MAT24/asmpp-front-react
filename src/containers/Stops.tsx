import React, { useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { Table } from 'antd'
import AntDTable from 'components/Tables/AntDTable/AntDTable'
import DownloadButton from 'components/DownloadButton/DownloadButton'
import stopPassengerTraffic from 'components/Tables/AntDTable/colomunsMarkup/stopPassengerTraffic'
import useFetchTable from 'hooks/useFetchTable'
import type { InputRef } from 'antd'
import store from 'store'

const Stops: React.FC = () => {
  const loading = useFetchTable(store.api.fetchTripStationsData)
  const searchInput = useRef<InputRef>(null)

  const computedFooter = (pageData: any[], selectedRowKeys: React.Key[]) => {
    let totalGeneralIncome = 0
    let totalGeneralOutcome = 0
    let totalAverageIncome = 0
    let totalAverageOutcome = 0
    let totalAverageOccupancy = 0
    let avgMaxLoad = 0

    pageData.forEach(
      (
        {
          generalIncome,
          generalOutcome,
          averageIncome,
          averageOutcome,
          averageOccupancy,
          maxLoad,
        }: any,
        index: number
      ) => {
        if (selectedRowKeys.includes(index)) {
          totalGeneralIncome += generalIncome
          totalGeneralOutcome += generalOutcome
          totalAverageIncome += averageIncome
          totalAverageOutcome += averageOutcome
          totalAverageOccupancy += averageOccupancy
          avgMaxLoad += maxLoad
        }
      }
    )
    const arr = [
      totalGeneralIncome,
      totalGeneralOutcome,
      totalAverageIncome,
      totalAverageOutcome,
      totalAverageOccupancy,
      avgMaxLoad,
    ]
    return (
      <Table.Summary fixed>
        <Table.Summary.Row style={{ textAlign: 'center' }}>
          {[...Array(4).keys()].map((item) => (
            <Table.Summary.Cell key={item} index={item} />
          ))}
          {arr.map((item, index) =>
            index < 2 ? (
              <Table.Summary.Cell key={index + 4} index={index + 4}>
                {item}
              </Table.Summary.Cell>
            ) : (
              <Table.Summary.Cell key={index + 4} index={index + 4}>
                {(item / pageData.length).toFixed(2)}
              </Table.Summary.Cell>
            )
          )}
        </Table.Summary.Row>
      </Table.Summary>
    )
  }
  return (
    <>
      <DownloadButton
        fetchReportFunction={store.api.fetchDownloadTripStations}
        disabledButton={!store.data.tripStationsData}
      />
      <AntDTable
        loading={loading}
        data={store.data.tripStationsData}
        columns={stopPassengerTraffic(searchInput)}
        multiSelectable
        computedFooter={computedFooter}
      />
    </>
  )
}

export default observer(Stops)
