import { useEffect, useState } from 'react'
import store from 'store'

const useFetchTable = (fetchDataFunction: () => Promise<void>): boolean => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (store.api.routes && store.api.tsIds) {
      setLoading(true)
      fetchDataFunction().finally(() => setLoading(false))
    }
  }, [store.api.tsIds, store.api.dayTypeDirectionsQuery])

  return loading
}

export default useFetchTable
