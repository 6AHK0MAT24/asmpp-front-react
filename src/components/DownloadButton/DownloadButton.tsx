import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { DownloadOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import store from 'store'
import './DownloadButton.scss'

interface DownloadButtonInterface {
  fetchReportFunction: () => Promise<void>
  disabledButton: boolean
}

const DownloadButton: React.FC<DownloadButtonInterface> = ({
  fetchReportFunction,
  disabledButton,
}) => {
  const [loadings, setLoadings] = useState<boolean>(false)
  const { t } = useTranslation('common')

  const handlerDownload = () => {
    setLoadings(true)
    fetchReportFunction().finally(() => setLoadings(false))
  }

  return (
    <div className="download-button">
      <Button
        type="primary"
        icon={<DownloadOutlined />}
        loading={loadings}
        disabled={
          !store.data.userRoles?.includes('REPORT_ROLE') || disabledButton
        }
        onClick={handlerDownload}
      >
        {t('downloadExcel')}
      </Button>
    </div>
  )
}
export default observer(DownloadButton)
