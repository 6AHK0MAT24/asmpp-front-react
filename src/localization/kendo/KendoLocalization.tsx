import React from 'react'
import { observer } from 'mobx-react-lite'
import likelySubtags from 'cldr-core/supplemental/likelySubtags.json'
import currencyData from 'cldr-core/supplemental/currencyData.json'
import weekData from 'cldr-core/supplemental/weekData.json'
import localCurrency from 'cldr-numbers-full/main/ru/currencies.json'
import numbers from 'cldr-numbers-full/main/ru/numbers.json'
import caGregorian from 'cldr-dates-full/main/ru/ca-gregorian.json'
import caGeneric from 'cldr-dates-full/main/ru/ca-generic.json'
import dateFields from 'cldr-dates-full/main/ru/dateFields.json'
import timeZoneNames from 'cldr-dates-full/main/ru/timeZoneNames.json'
import ru from './kendo-react-messages_ru.json'
import {
  IntlProvider,
  load,
  loadMessages,
  LocalizationProvider,
} from '@progress/kendo-react-intl'
import store from 'store'

load(
  caGeneric,
  likelySubtags,
  currencyData,
  weekData,
  localCurrency,
  numbers,
  caGregorian,
  dateFields,
  timeZoneNames
)
loadMessages(ru, 'ru')

interface KendoLocalizationProps {
  children: React.ReactElement
}

const KendoLocalization: React.FC<KendoLocalizationProps> = ({ children }) => {
  return (
    <LocalizationProvider language={store.ui.language}>
      <IntlProvider locale={store.ui.language}>{children}</IntlProvider>
    </LocalizationProvider>
  )
}

export default observer(KendoLocalization)
