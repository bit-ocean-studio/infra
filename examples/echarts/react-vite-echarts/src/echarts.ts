import { BarChart } from 'echarts/charts'
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent
} from 'echarts/components'
import * as echarts from 'echarts/core'
import { SVGRenderer } from 'echarts/renderers'

echarts.use([
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  BarChart,
  SVGRenderer
])
