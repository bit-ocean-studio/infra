# @bit-ocean/echarts

English / [简体中文](./README.zh-CN.md)

![npm](https://img.shields.io/npm/v/@bit-ocean-studio/echarts?logo=typescript&label=echarts)

> Universal ECharts components.

This package provides universal ECharts components for all our projects.

## Installation

```bash
pnpm add echarts @bit-ocean/echarts
```

## Usage

```ts
import { BarChart, LineChart, MapChart, PieChart } from 'echarts/charts'
import {
  AxisPointerComponent,
  DatasetComponent,
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  TransformComponent,
  VisualMapComponent
} from 'echarts/components'
import * as echarts from 'echarts/core'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers'

echarts.use([
  AxisPointerComponent,
  DatasetComponent,
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  ToolboxComponent,
  TransformComponent,
  VisualMapComponent,
  BarChart,
  LineChart,
  PieChart,
  MapChart,
  LabelLayout,
  CanvasRenderer,
  SVGRenderer,
  UniversalTransition
])

export default echarts
```

```tsx
import { ReactChart } from '@bit-ocean/echarts'
import type { EChartsOption } from 'echarts'
import { useState } from 'react'

export default function App() {
  const [option, setOption] = useState<EChartsOption>({})

  return (
    <ReactChart
      style={{ width: 800, height: 600 }}
      option={option}
    />
  )
}
```

## FAQ

### How to use `ResizeObserver API` in non-modern browsers?

Please use [resize-observer-polyfill](https://www.npmjs.com/package/resize-observer-polyfill).

```bash
pnpm add resize-observer-polyfill
```

Replace the global `ResizeObserver` with the polyfill:

```ts
import ResizeObserver from 'resize-observer-polyfill'

window.ResizeObserver = ResizeObserver
```

## License

[MIT](/LICENSE) License &copy; 2024 Bit Ocean
