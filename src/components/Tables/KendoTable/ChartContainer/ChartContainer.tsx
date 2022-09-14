import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Chart,
  ChartTitle,
  ChartTooltip,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartSeries,
  ChartSeriesItem,
  ChartSeriesLabels,
  ChartLegend,
  ChartLegendTitle,
  TooltipContext,
  SharedTooltipContext,
  SeriesType,
  LineStyle,
} from '@progress/kendo-react-charts'
import { parseMsToTime } from 'utils/parseMsToDateTime'
import 'hammerjs'
import {
  DropDownList,
  DropDownListChangeEvent,
} from '@progress/kendo-react-dropdowns'
import './ChartContainer.scss'

const ChartContainer: React.FC<any> = ({ data }) => {
  const { t } = useTranslation('charts')
  const typesArray: SeriesType[] = [
    'area',
    'bar',
    'column',
    'line',
    'radarArea',
    'radarColumn',
    'radarLine',
    'verticalArea',
    'verticalLine',
  ]
  const stylesArray: LineStyle[] = ['normal', 'step', 'smooth']
  const [type, setType] = useState<SeriesType>('line')
  const [style, setStyle] = useState<LineStyle>('smooth')

  const labelContent = (e: any) => parseMsToTime(e.value).slice(0, -3)
  const tooltipRender = (props: TooltipContext | SharedTooltipContext) => (
    <div>
      Зашло : {(props as TooltipContext).point.dataItem.income}
      <br />
      Вышло : {(props as TooltipContext).point.dataItem.outcome}
    </div>
  )
  const handleStyleChange = (event: DropDownListChangeEvent) => {
    setStyle(event.value)
  }
  const handleTypeChange = (event: DropDownListChangeEvent) => {
    setType(event.value)
  }
  return (
    <>
      <Chart style={{ height: '60vh' }}>
        <ChartTooltip render={tooltipRender} />
        <ChartTitle text={t('busFill')} />
        <ChartLegend position="left">
          <ChartLegendTitle text={t('passengers')} />
        </ChartLegend>
        <ChartSeries>
          <ChartSeriesItem
            type={type}
            style={style}
            data={data}
            field="occupancy"
            categoryField="timestamp"
          >
            <ChartSeriesLabels />
          </ChartSeriesItem>
        </ChartSeries>
        <ChartCategoryAxis>
          <ChartCategoryAxisItem labels={{ content: labelContent }} />
        </ChartCategoryAxis>
      </Chart>
      <div className="chart-container__demonstration">
        <div>
          {t('graphType')}
          <DropDownList
            data={typesArray}
            defaultValue={type}
            onChange={handleTypeChange}
          />
        </div>
        <div>
          {t('lineType')}
          <DropDownList
            data={stylesArray}
            defaultValue={style}
            onChange={handleStyleChange}
          />
        </div>
      </div>
    </>
  )
}

export default ChartContainer
