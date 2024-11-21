import React, { forwardRef } from 'react'
import { CChart, CChartProps } from './CChart'
import { Chart as ChartJS } from 'chart.js'

export const CChartBar = forwardRef<ChartJS | undefined, Omit<CChartProps, 'type'>>(
  (props, ref) => <CChart {...props} type="bar" ref={ref} />,
)

CChartBar.displayName = 'CChartBar'

export const CChartBubble = forwardRef<ChartJS | undefined, Omit<CChartProps, 'type'>>(
  (props, ref) => <CChart {...props} type="bubble" ref={ref} />,
)

CChartBubble.displayName = 'CChartBubble'

export const CChartDoughnut = forwardRef<ChartJS | undefined, Omit<CChartProps, 'type'>>(
  (props, ref) => <CChart {...props} type="doughnut" ref={ref} />,
)

CChartDoughnut.displayName = 'CChartDoughnut'

export const CChartLine = forwardRef<ChartJS | undefined, Omit<CChartProps, 'type'>>(
  (props, ref) => <CChart {...props} type="line" ref={ref} />,
)

CChartLine.displayName = 'CChartLine'

export const CChartPie = forwardRef<ChartJS | undefined, Omit<CChartProps, 'type'>>(
  (props, ref) => <CChart {...props} type="pie" ref={ref} />,
)

CChartPie.displayName = 'CChartPie'

export const CChartPolarArea = forwardRef<ChartJS | undefined, Omit<CChartProps, 'type'>>(
  (props, ref) => <CChart {...props} type="polarArea" ref={ref} />,
)

CChartPolarArea.displayName = 'CChartPolarArea'

export const CChartRadar = forwardRef<ChartJS | undefined, Omit<CChartProps, 'type'>>(
  (props, ref) => <CChart {...props} type="radar" ref={ref} />,
)

CChartRadar.displayName = 'CChartRadar'

export const CChartScatter = forwardRef<ChartJS | undefined, Omit<CChartProps, 'type'>>(
  (props, ref) => <CChart {...props} type="scatter" ref={ref} />,
)

CChartScatter.displayName = 'CChartScatter'
