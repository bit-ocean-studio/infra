import './echarts'

import { ReactChart } from '@bit-ocean/echarts'
import type { EChartsOption } from 'echarts'
import { useEffect, useState } from 'react'

export default function ChartComponent() {
  const generateRandomData = () => Array.from({ length: 7 }, () => Math.floor(Math.random() * 200))

  const getOption = (): EChartsOption => ({
    textStyle: {
      fontFamily: 'inherit'
    },
    title: {
      text: 'User Device Distribution',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    grid: {
      left: 0,
      right: 120,
      bottom: 10,
      tooltip: true,
      containLabel: true
    },
    legend: {
      data: ['PC', 'Web', 'iOS', 'Android'],
      align: 'left',
      right: 0,
      top: 'center',
      orient: 'vertical'
    },
    xAxis: {
      type: 'category',
      data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
      axisTick: {
        alignWithLabel: true
      }
    },
    yAxis: {
      type: 'value'
    },
    series: [
      { type: 'bar', name: 'PC', data: generateRandomData() },
      { type: 'bar', name: 'Web', data: generateRandomData() },
      { type: 'bar', name: 'iOS', data: generateRandomData() },
      { type: 'bar', name: 'Android', data: generateRandomData() }
    ]
  })

  const [option, setOption] = useState<EChartsOption>(getOption())

  useEffect(() => {
    const interval = setInterval(() => {
      setOption(getOption())
    }, 2000)
    return () => clearInterval(interval)
  })

  return (
    <ReactChart
      style={{ width: 800, height: 600 }}
      option={option}
    />
  )
}
