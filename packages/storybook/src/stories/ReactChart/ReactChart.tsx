import type { ReactChartProps } from '@bit-ocean/echarts'
import { ReactChart as ReactChartComponent } from '@bit-ocean/echarts'

export function ReactChart(props: ReactChartProps) {
  return <ReactChartComponent {...props} />
}
