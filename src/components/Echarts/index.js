import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

// echarts配置数据
const axisOption = {
  // 图例文字颜色
  textStyle: {
    color: '#333',
  },
  // 提示框
  tooltip: {
    trigger: 'axis',
  },
  xAxis: {
    type: 'category', // 类目轴
    data: [],
    axisLine: {
      lineStyle: {
        color: '#17b3a3',
      },
    },
    axisLabel: {
      interval: 0,
      color: '#333',
    },
  },
  yAxis: [
    {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#17b3a3',
        },
      },
    },
  ],
  color: ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80', '#8d98b3'],
  series: [],
}

const normalOption = {
  tooltip: {
    trigger: 'item',
  },
  color: [
    '#0f78f4',
    '#dd536b',
    '#9462e5',
    '#a6a6a6',
    '#e1bb22',
    '#39c362',
    '#3ed1cf',
  ],
  series: [],
}

export default function ECharts({ style, chartData, isAxisChart = true }) {
  // 创建并且调用Ref
  // 后面可以使用echartRef.current来获取echarts实例（获取DOM实例）
  const echartRef = useRef()

  // 设置响应式变量，但是不参与页面渲染
  let echartObj = useRef(null)

  // 页面首次加载完成后
  useEffect(() => {
    let options
    // echarts初始化
    echartObj.current = echarts.init(echartRef.current)
    // 设置option
    if (isAxisChart) {
      // 设置x轴
      axisOption.xAxis.data = chartData.xData
      // 设置y轴
      axisOption.series = chartData.series
      options = axisOption
    } else {
      // 设置x轴
      normalOption.series = chartData.series
      options = normalOption
    }
    // 设置option
    echartObj.current.setOption(options)
  }, [chartData])

  return <div style={style} ref={echartRef}></div>
}
