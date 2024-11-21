import PropTypes from 'prop-types'
import React, {
  forwardRef,
  HTMLAttributes,
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import classNames from 'classnames'

import { Chart as ChartJS, registerables } from 'chart.js'
import type {
  ChartData,
  ChartOptions,
  ChartType,
  ChartTypeRegistry,
  InteractionItem,
  Plugin,
  Point,
  BubbleDataPoint,
} from 'chart.js'
import { customTooltips as cuiCustomTooltips } from '@coreui/chartjs'

import assign from 'lodash/assign'
import find from 'lodash/find'
import merge from 'lodash/merge'

export interface CChartProps extends HTMLAttributes<HTMLCanvasElement | HTMLDivElement> {
  /**
   * A string of all className you want applied to the base component.
   */
  className?: string
  /**
   * Enables custom html based tooltips instead of standard tooltips.
   *
   * @default true
   */
  customTooltips?: boolean
  /**
   * The data object that is passed into the Chart.js chart (more info).
   */
  data: ChartData | ((canvas: HTMLCanvasElement) => ChartData)
  /**
   * A fallback for when the canvas cannot be rendered. Can be used for accessible chart descriptions.
   */
  fallbackContent?: React.ReactNode
  /**
   * Proxy for Chart.js getDatasetAtEvent. Calls with dataset and triggering event.
   */
  getDatasetAtEvent?: (
    dataset: InteractionItem[],
    event: React.MouseEvent<HTMLCanvasElement>,
  ) => void
  /**
   * Proxy for Chart.js getElementAtEvent. Calls with single element array and triggering event.
   */
  getElementAtEvent?: (
    element: InteractionItem[],
    event: React.MouseEvent<HTMLCanvasElement>,
  ) => void
  /**
   * Proxy for Chart.js getElementsAtEvent. Calls with element array and triggering event.
   */
  getElementsAtEvent?: (
    elements: InteractionItem[],
    event: React.MouseEvent<HTMLCanvasElement>,
  ) => void
  /**
   * Height attribute applied to the rendered canvas.
   *
   * @default 150
   */
  height?: number
  /**
   * ID attribute applied to the rendered canvas.
   */
  id?: string
  /**
   * The options object that is passed into the Chart.js chart.
   */
  options?: ChartOptions
  /**
   * The plugins array that is passed into the Chart.js chart (more info)
   */
  plugins?: Plugin[]
  /**
   * If true, will tear down and redraw chart on all updates.
   *
   * @default false
   */
  redraw?: boolean
  /**
   * Chart.js chart type.
   *
   * @type {'line' | 'bar' | 'radar' | 'doughnut' | 'polarArea' | 'bubble' | 'pie' | 'scatter'}
   */
  type?: ChartType
  /**
   * Width attribute applied to the rendered canvas.
   *
   * @default 300
   */
  width?: number
  /**
   * Put the chart into the wrapper div element.
   *
   * @default true
   */
  wrapper?: boolean
}

type ForwardedRef<T> = ((instance: T | null) => void) | MutableRefObject<T | null> | null

const reforwardRef = <T,>(ref: ForwardedRef<T>, value: T) => {
  if (typeof ref === 'function') {
    ref(value)
  } else if (ref) {
    ref.current = value
  }
}

export const CChart = forwardRef<ChartJS | undefined, CChartProps>(
  (
    {
      className,
      customTooltips = true,
      data,
      id,
      fallbackContent,
      getDatasetAtEvent,
      getElementAtEvent,
      getElementsAtEvent,
      height = 150,
      options,
      plugins = [],
      redraw = false,
      type = 'bar',
      width = 300,
      wrapper = true,
      ...rest
    },
    ref,
  ) => {
    ChartJS.register(...registerables)

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const chartRef = useRef<
      | ChartJS<
          keyof ChartTypeRegistry,
          (number | [number, number] | Point | BubbleDataPoint | null)[],
          unknown
        >
      | undefined
    >()

    const computedData = useMemo(() => {
      if (typeof data === 'function') {
        return canvasRef.current ? data(canvasRef.current) : { datasets: [] }
      }

      return merge({}, data)
    }, [canvasRef.current, JSON.stringify(data)])

    const computedOptions = useMemo(() => {
      return customTooltips
        ? merge({}, options, {
            plugins: {
              tooltip: {
                enabled: false,
                mode: 'index',
                position: 'nearest',
                external: cuiCustomTooltips,
              },
            },
          })
        : options
    }, [canvasRef.current, JSON.stringify(options)])

    const renderChart = () => {
      if (!canvasRef.current) return

      chartRef.current = new ChartJS(canvasRef.current, {
        type,
        data: computedData,
        options: computedOptions,
        plugins,
      })

      reforwardRef(ref, chartRef.current)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleOnClick = (e: any) => {
      if (!chartRef.current) return

      getDatasetAtEvent &&
        getDatasetAtEvent(
          chartRef.current.getElementsAtEventForMode(e, 'dataset', { intersect: true }, false),
          e,
        )
      getElementAtEvent &&
        getElementAtEvent(
          chartRef.current.getElementsAtEventForMode(e, 'nearest', { intersect: true }, false),
          e,
        )
      getElementsAtEvent &&
        getElementsAtEvent(
          chartRef.current.getElementsAtEventForMode(e, 'index', { intersect: true }, false),
          e,
        )
    }

    const updateChart = () => {
      if (!chartRef.current) return

      if (options) {
        chartRef.current.options = { ...computedOptions }
      }

      if (!chartRef.current.config.data) {
        chartRef.current.config.data = computedData
        chartRef.current.update()
        return
      }

      const { datasets: newDataSets = [], ...newChartData } = computedData
      const { datasets: currentDataSets = [] } = chartRef.current.config.data

      // copy values
      assign(chartRef.current.config.data, newChartData)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      chartRef.current.config.data.datasets = newDataSets.map((newDataSet: any) => {
        // given the new set, find it's current match
        const currentDataSet = find(
          currentDataSets,
          (d) => d.label === newDataSet.label && d.type === newDataSet.type,
        )

        // There is no original to update, so simply add new one
        if (!currentDataSet || !newDataSet.data) return newDataSet

        if (!currentDataSet.data) {
          currentDataSet.data = []
        } else {
          currentDataSet.data.length = newDataSet.data.length
        }

        // copy in values
        assign(currentDataSet.data, newDataSet.data)

        // apply dataset changes, but keep copied data
        return {
          ...currentDataSet,
          ...newDataSet,
          data: currentDataSet.data,
        }
      })

      chartRef.current.update()
    }

    const destroyChart = () => {
      reforwardRef(ref, null)

      if (chartRef.current) {
        chartRef.current.destroy()
        chartRef.current = undefined
      }
    }

    useEffect(() => {
      renderChart()

      return () => destroyChart()
    }, [])

    useEffect(() => {
      if (!chartRef.current) return

      if (redraw) {
        destroyChart()
        setTimeout(() => {
          renderChart()
        }, 0)
      } else {
        updateChart()
      }
    }, [JSON.stringify(data), computedData])

    const canvas = (ref: React.Ref<HTMLCanvasElement>) => {
      return (
        <canvas
          {...(!wrapper && className && { className: className })}
          data-testid="canvas"
          height={height}
          id={id}
          onClick={(e: React.MouseEvent<HTMLCanvasElement>) => {
            handleOnClick(e)
          }}
          ref={ref}
          role="img"
          width={width}
          {...rest}
        >
          {fallbackContent}
        </canvas>
      )
    }

    return wrapper ? (
      <div className={classNames('chart-wrapper', className)} {...rest}>
        {canvas(canvasRef)}
      </div>
    ) : (
      canvas(canvasRef)
    )
  },
)

CChart.propTypes = {
  className: PropTypes.string,
  customTooltips: PropTypes.bool,
  data: PropTypes.any.isRequired, // TODO: improve this type
  fallbackContent: PropTypes.node,
  getDatasetAtEvent: PropTypes.func,
  getElementAtEvent: PropTypes.func,
  getElementsAtEvent: PropTypes.func,
  height: PropTypes.number,
  id: PropTypes.string,
  options: PropTypes.object,
  plugins: PropTypes.array,
  redraw: PropTypes.bool,
  type: PropTypes.oneOf<ChartType>([
    'bar',
    'line',
    'scatter',
    'bubble',
    'pie',
    'doughnut',
    'polarArea',
    'radar',
  ]).isRequired,
  width: PropTypes.number,
  wrapper: PropTypes.bool,
}

CChart.displayName = 'CChart'
