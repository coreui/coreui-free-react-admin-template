<p align="center">
  <a href="https://coreui.io/">
    <img
      src="https://coreui.io/images/brand/coreui-signet.svg"
      alt="CoreUI logo"
      width="200"
    />
  </a>
</p>

<h3 align="center">CoreUI React.js wrapper for Chart.js</h3>

<p align="center">
  <a href="https://coreui.io/react/docs/components/chart/"><strong>Explore @coreui/react-chartjs docs & examples »</strong></a>
  <br>
  <br>
  <a href="https://github.com/coreui/coreui-react/issues/new?template=bug_report.md">Report bug</a>
  ·
  <a href="https://github.com/coreui/coreui-react/issues/new?template=feature_request.md">Request feature</a>
  ·
  <a href="https://blog.coreui.io/">Blog</a>
</p>

## Status

[![npm package][npm-badge]][npm]
[![NPM downloads][npm-download]][npm]

[npm-badge]: https://img.shields.io/npm/v/@coreui/react-chartjs/latest?style=flat-square
[npm]: https://www.npmjs.com/package/@coreui/react-chartjs
[npm-download]: https://img.shields.io/npm/dm/@coreui/react-chartjs.svg?style=flat-square

##### install:

```bash
npm install @coreui/react-chartjs

# or

yarn add @coreui/react-chartjs
```

##### import:

```jsx
import { CChart } from '@coreui/react-chartjs'
```

or

```js
import {
  CChart,
  CChartBar,
  CChartHorizontalBar,
  CChartLine,
  CChartDoughnut,
  CChartRadar,
  CChartPie,
  CChartPolarArea,
} from '@coreui/react-chartjs'
```

##### props:

```js

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
 *
 * {@link https://www.chartjs.org/docs/latest/general/accessibility.html More Info}
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
 *
 * {@link https://www.chartjs.org/docs/latest/general/options.html More Info}
 */
options?: ChartOptions
/**
 * The plugins array that is passed into the Chart.js chart (more info)
 *
 * {@link https://www.chartjs.org/docs/latest/developers/plugins.html More Info}
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
type: ChartType
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
```

##### usage:

```jsx
...
class CoreUICharts extends Component {
...
render() {
  return (
    <CChart
      type='line'
      data={{
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: '2019',
            backgroundColor: 'rgba(179,181,198,0.2)',
            borderColor: 'rgba(179,181,198,1)',
            pointBackgroundColor: 'rgba(179,181,198,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(179,181,198,1)',
            tooltipLabelColor: 'rgba(179,181,198,1)',
            data: [65, 59, 90, 81, 56, 55, 40]
          },
          {
            label: '2020',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            pointBackgroundColor: 'rgba(255,99,132,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255,99,132,1)',
            tooltipLabelColor: 'rgba(255,99,132,1)',
            data: [28, 48, 40, 19, 96, 27, 100]
          }
        ],
      }}  
      options={{
        aspectRatio: 1.5,
        tooltips: {
          enabled: true
        }
      }}
    />
  )
}
...
```