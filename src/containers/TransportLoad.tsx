import React, { useRef } from 'react'
import { observer } from 'mobx-react-lite'
import transportsOnline from 'components/Tables/AntDTable/colomunsMarkup/transportsOnline'
import AntDTable from 'components/Tables/AntDTable/AntDTable'
import useFetchTable from 'hooks/useFetchTable'
import type { InputRef } from 'antd'
import store from 'store'

const TransportLoad: React.FC = () => {
  const loading = useFetchTable(store.api.fetchTransportsOnlineData)
  const searchInput = useRef<InputRef>(null)

  return (
    <>
      <AntDTable
        data={store.data.transportsOnlineData}
        columns={transportsOnline(searchInput)}
        loading={loading}
      />
    </>
  )
}

export default observer(TransportLoad)
