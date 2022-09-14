import React from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { DatePicker } from 'antd'
import { CalendarToday } from '@mui/icons-material'
import type { Moment } from 'moment'
import type { RangeValue } from 'rc-picker/lib/interface'
import type { RangePickerProps } from 'antd/es/date-picker'
import store from 'store'
import './HeaderCalendar.scss'

const { RangePicker } = DatePicker

const HeaderCalendar: React.FC = () => {
  const { t } = useTranslation('calendar')

  const onOk = (value: RangeValue<Moment>) => {
    const timestamps = value?.map((item) => item && item.valueOf())
    if (timestamps) {
      timestamps[0] && store.api.setStartDate(timestamps[0])
      timestamps[1] && store.api.setEndDate(timestamps[1])
      store.api.fetchRoutesList().then()
    }
  }
  const handleChangeRangePicker: RangePickerProps['onChange'] = (dates) => {
    const timestamps = dates?.map((item) => item && item.valueOf())
    if (timestamps) {
      timestamps[0] && store.api.setStartDate(timestamps[0])
      timestamps[1] && store.api.setEndDate(timestamps[1])
      store.api.fetchRoutesList().then()
    }
  }
  return (
    <div className="header-calendar">
      <span className="header-calendar__icons">
        <CalendarToday />
      </span>
      <div className="header-calendar__date-pickers">
        <RangePicker
          format="DD.MM.YYYY HH:mm"
          defaultValue={[
            moment(store.api.startDate),
            moment(store.api.endDate),
          ]}
          onOk={onOk}
          onChange={handleChangeRangePicker}
          showTime={{
            format: 'HH:mm',
          }}
          ranges={{
            [t('currentWeek')]: [
              moment().startOf('week').hours(3),
              moment().endOf('week').day(1).hours(2),
            ],
            [t('currentMonth')]: [
              moment().startOf('month').hours(3),
              moment().endOf('month').add(1, 'day').hours(2),
            ],
            ['dev']: [moment().year(2000), moment().year(2090)],
          }}
        />
      </div>
    </div>
  )
}

export default observer(HeaderCalendar)
