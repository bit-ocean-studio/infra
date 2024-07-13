import { BarChart, LineChart, PieChart, ScatterChart } from 'echarts/charts'
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent
} from 'echarts/components'
import * as echarts from 'echarts/core'
import { UniversalTransition } from 'echarts/features'
import { SVGRenderer } from 'echarts/renderers'

echarts.use([
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  BarChart,
  LineChart,
  PieChart,
  ScatterChart,
  UniversalTransition,
  SVGRenderer
])
