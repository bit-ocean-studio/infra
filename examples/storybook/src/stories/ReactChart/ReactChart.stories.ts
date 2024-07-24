import { ReactChart } from '@bit-ocean/echarts'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: '@bit-ocean/echarts/ReactChart',
  component: ReactChart,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'radio',
      options: ['light', 'dark'],
      description: 'The theme of the chart.'
    }
  }
} satisfies Meta<typeof ReactChart>

export default meta

type Story = StoryObj<typeof meta>

const generateRandomData = () => {
  const weeks = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
  const devices = ['pc', 'web', 'ios', 'android']
  return weeks.map((w) => ({
    week: w,
    ...devices.reduce((acc, d) => ({ ...acc, [d]: Math.floor(Math.random() * 1000) }), {})
  }))
}

export const BarChart: Story = {
  args: {
    style: {
      width: 600,
      height: 250
    },
    theme: 'light',
    option: {
      textStyle: {
        fontFamily: 'inherit'
      },
      title: {
        text: 'Bar Chart',
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
        axisTick: { alignWithLabel: true }
      },
      yAxis: { type: 'value', name: '数量' },
      series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }, { type: 'bar' }],
      dataset: {
        dimensions: [
          { name: 'week', displayName: 'Week' },
          { name: 'pc', displayName: 'PC' },
          { name: 'web', displayName: 'Web' },
          { name: 'ios', displayName: 'iOS' },
          { name: 'android', displayName: 'Android' }
        ],
        source: generateRandomData()
      }
    }
  }
}
