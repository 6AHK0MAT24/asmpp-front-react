import React from 'react'
import type { GridFooterCellProps } from '@progress/kendo-react-grid'
import type { PassengersByHour } from 'types/Hours'
import store from 'store'

const FooterCallPassengerTraffic = (props: GridFooterCellProps) => {
  const arr = props.field?.split('.')
  const str = arr ? arr[1] : ''
  return (
    <td>
      {
        store.data.hoursData?.amount.passengersByHour[
          str as unknown as keyof PassengersByHour
        ]
      }
    </td>
  )
}

export default FooterCallPassengerTraffic
