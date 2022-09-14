import React from 'react'
import i18n from 'i18next'
import filterExtension from 'components/Tables/AntDTable/filterExtension'
import type { ColumnsType } from 'antd/es/table'
import type { InputRef } from 'antd'
import type { MonitoringItem } from 'types/Monitoring'

const systemReport = (
  searchInputRef: React.RefObject<InputRef>
): ColumnsType<MonitoringItem> => [
  {
    title: `${i18n.t('tables:systemReport.vehicleData')}`,
    children: [
      {
        title: '№',
        key: 'index',
        align: 'center',
        render: (value, item, index) => index + 1,
        width: '4%',
      },
      {
        title: `${i18n.t('tables:systemReport.mcId')}`,
        dataIndex: 'tsId',
        align: 'center',
        width: '5%',
      },
      {
        title: `${i18n.t('tables:common.board')}`,
        dataIndex: 'boardNumber',
        align: 'center',
        ...filterExtension('boardNumber', searchInputRef),
      },
      {
        title: `${i18n.t('tables:systemReport.numberPackets')}`,
        dataIndex: 'packetAmount',
        align: 'center',
      },
      {
        title: `${i18n.t('tables:systemReport.door')} 1`,
        children: [
          {
            title: `${i18n.t('tables:systemReport.entered')}`,
            dataIndex: ['doorCounter', `DI1`, 'first'],
            align: 'center',
          },
          {
            title: `${i18n.t('tables:systemReport.exited')}`,
            dataIndex: ['doorCounter', `DI1`, 'second'],
            align: 'center',
          },
        ],
      },
      {
        title: `${i18n.t('tables:systemReport.door')} 2`,
        children: [
          {
            title: `${i18n.t('tables:systemReport.entered')}`,
            dataIndex: ['doorCounter', `DI2`, 'first'],
            align: 'center',
          },
          {
            title: `${i18n.t('tables:systemReport.exited')}`,
            dataIndex: ['doorCounter', `DI2`, 'second'],
            align: 'center',
          },
        ],
      },
      {
        title: `${i18n.t('tables:systemReport.door')} 3`,
        children: [
          {
            title: `${i18n.t('tables:systemReport.entered')}`,
            dataIndex: ['doorCounter', `DI3`, 'first'],
            align: 'center',
          },
          {
            title: `${i18n.t('tables:systemReport.exited')}`,
            dataIndex: ['doorCounter', `DI3`, 'second'],
            align: 'center',
          },
        ],
      },
      {
        title: `${i18n.t('tables:systemReport.door')} 4`,
        children: [
          {
            title: `${i18n.t('tables:systemReport.entered')}`,
            dataIndex: ['doorCounter', `DI4`, 'first'],
            align: 'center',
          },
          {
            title: `${i18n.t('tables:systemReport.exited')}`,
            dataIndex: ['doorCounter', `DI4`, 'second'],
            align: 'center',
          },
        ],
      },
      {
        title: `${i18n.t('tables:systemReport.door')} 5`,
        children: [
          {
            title: `${i18n.t('tables:systemReport.entered')}`,
            dataIndex: ['doorCounter', `DI5`, 'first'],
            align: 'center',
          },
          {
            title: `${i18n.t('tables:systemReport.exited')}`,
            dataIndex: ['doorCounter', `DI5`, 'second'],
            align: 'center',
          },
        ],
      },
      {
        title: `${i18n.t('tables:systemReport.door')} 6`,
        children: [
          {
            title: `${i18n.t('tables:systemReport.entered')}`,
            dataIndex: ['doorCounter', `DI6`, 'first'],
            align: 'center',
          },
          {
            title: `${i18n.t('tables:systemReport.exited')}`,
            dataIndex: ['doorCounter', `DI6`, 'second'],
            align: 'center',
          },
        ],
      },
      {
        title: `${i18n.t('tables:systemReport.allDoors')}`,
        children: [
          {
            title: `${i18n.t('tables:systemReport.entered')}`,
            dataIndex: 'incomeAmount',
            align: 'center',
            sorter: (a, b) => a.incomeAmount - b.incomeAmount,
          },
          {
            title: `${i18n.t('tables:systemReport.exited')}`,
            dataIndex: 'outcomeAmount',
            align: 'center',
            sorter: (a, b) => a.outcomeAmount - b.outcomeAmount,
          },
        ],
      },
    ],
  },
]

export default systemReport
