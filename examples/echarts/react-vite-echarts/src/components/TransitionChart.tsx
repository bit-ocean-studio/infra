import { ReactChart } from '@bit-ocean/echarts'
import type { EChartsOption } from 'echarts'
import { useEffect, useMemo, useState } from 'react'

type ChartType = 'bar' | 'line' | 'pie' | 'scatter'

export function TransitionChart() {
  const generateRandomData = () => {
    const weeks = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
    const devices = ['pc', 'web', 'ios', 'android']
    return weeks.map((w) => ({
      week: w,
      ...devices.reduce((acc, d) => ({ ...acc, [d]: Math.floor(Math.random() * 1000) }), {})
    }))
  }
  const [source, setSource] = useState(generateRandomData())

  const [chartType, setChartType] = useState<ChartType>('bar')

  const option = useMemo<EChartsOption>(
    () => ({
      textStyle: {
        fontFamily: 'inherit'
      },
      title: {
        text: 'Transition Chart',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      grid: {
        top: 50,
        left: 10,
        right: 100,
        bottom: 10,
        tooltip: true,
        containLabel: true
      },
      legend: {
        align: 'left',
        right: 0,
        top: 'center',
        orient: 'vertical'
      },
      xAxis: {
        type: 'category',
        name: '星期',
        axisTick: { alignWithLabel: true },
        show: chartType !== 'pie'
      },
      yAxis: { type: 'value', name: '数量', show: chartType !== 'pie' },
      series: [
        { type: chartType, id: 'PC', universalTransition: true, animationDurationUpdate: 1000 },
        { type: chartType, id: 'Web', universalTransition: true, animationDurationUpdate: 1000 },
        { type: chartType, id: 'iOS', universalTransition: true, animationDurationUpdate: 1000 },
        { type: chartType, id: 'Android', universalTransition: true, animationDurationUpdate: 1000 }
      ],
      dataset: {
        dimensions: [
          { name: 'week', displayName: 'Week' },
          { name: 'pc', displayName: 'PC' },
          { name: 'web', displayName: 'Web' },
          { name: 'ios', displayName: 'iOS' },
          { name: 'android', displayName: 'Android' }
        ],
        source
      }
    }),
    [source, chartType]
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setChartType((prev) => {
        const types = ['bar', 'line', 'scatter', 'pie']
        const index = types.indexOf(prev)
        return types[(index + 1) % types.length] as ChartType
      })
      setSource(generateRandomData())
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <ReactChart
      className="size-full"
      option={option}
    />
  )
}
