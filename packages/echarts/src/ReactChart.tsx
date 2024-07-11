import { type EChartsInitOpts, type EChartsOption, type EChartsType, init } from 'echarts'
import type { SetOptionOpts } from 'echarts/core'
import {
  type CSSProperties,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef
} from 'react'

export interface ReactChartProps {
  option?: EChartsOption
  initOps?: EChartsInitOpts
  setOptionOps?: SetOptionOpts
  theme?: string | Record<string, any>
  loading?: boolean
  autoResize?: boolean
  className?: string
  style?: CSSProperties
  onChartReady?: (instance?: EChartsType) => void
}

export interface ReactChartRef {
  instance: EChartsType | null
  chartRef: HTMLDivElement | null
  resize: () => void
  setOption: () => void
}

/**
 * This component is a wrapper of echarts, which is used to render the chart in react.
 *
 * NOTE: Still have some problems need to be solved.
 * - The animation in resize option is required, otherwise the chart will not resize with animation.
 * - Warning: [Violation] Added non-passive event listener to a scroll-blocking <some> event. Consider marking event handler as 'passive' to make the page more responsive.
 * @see https://github.com/apache/echarts/issues/18255
 */
export const ReactChart = forwardRef<ReactChartRef, ReactChartProps>((props, ref) => {
  const {
    option,
    initOps,
    setOptionOps,
    theme,
    loading,
    autoResize = true,
    className,
    style,
    onChartReady
  } = props

  const chartInstance = useRef<EChartsType | null>(null)
  const chartRef = useRef<HTMLDivElement | null>(null)
  const initialResize = useRef(false)

  const resize = useCallback(() => {
    chartInstance.current?.resize({
      animation: {
        easing: 'cubicOut',
        duration: 500
      }
    })
    initialResize.current = true
  }, [])

  const setOption = useCallback(
    () => chartInstance.current?.setOption(option ?? {}, setOptionOps ?? {}),
    [option, setOptionOps]
  )

  /**
   * When the following properties change, the chart will be re-rendered, but before that, the chart will be disposed first.
   * - initOps
   * - options
   * - theme
   */
  useEffect(() => {
    if (!chartInstance.current) {
      chartInstance.current = init(chartRef.current, theme, {
        renderer: 'svg',
        ...initOps
      })
    }

    if (typeof onChartReady === 'function') {
      onChartReady(chartInstance.current)
    }

    if (!initialResize.current && autoResize) {
      resize()
    }

    return () => {
      chartInstance.current?.dispose()
      chartInstance.current = null
    }
  }, [autoResize, initOps, theme, onChartReady, resize])

  useEffect(() => setOption(), [theme, setOption])

  useEffect(() => {
    if (loading) {
      chartInstance.current?.showLoading()
    } else {
      chartInstance.current?.hideLoading()
    }
  }, [loading])

  useEffect(() => {
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [resize])

  const divProps = useMemo(
    () => ({
      className,
      style
    }),
    [className, style]
  )

  useImperativeHandle(
    ref,
    () => ({
      get instance() {
        return chartInstance.current
      },
      get chartRef() {
        return chartRef.current
      },
      resize,
      setOption
    }),
    [resize, setOption]
  )

  return (
    <div
      ref={chartRef}
      {...divProps}
    />
  )
})
