# @bit-ocean/echarts

[English](./README.md) / 简体中文

![npm](https://img.shields.io/npm/v/@bit-ocean-studio/echarts?logo=typescript&label=echarts)

> 通用的 ECharts 组件。

该包为我们的所有项目提供了通用的 ECharts 组件。

## 安装

```bash
pnpm add echarts @bit-ocean/echarts
```

## 使用

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

## 常见问题

### 如何在非现代浏览器中使用 `ResizeObserver API`?

请使用 [resize-observer-polyfill](https://www.npmjs.com/package/resize-observer-polyfill)。

```bash
pnpm add resize-observer-polyfill
```

替换全局的 `ResizeObserver` 对象：

```ts
import ResizeObserver from 'resize-observer-polyfill'

window.ResizeObserver = ResizeObserver
```

## 许可证

[MIT](/LICENSE) License &copy; 2024 Bit Ocean
