import React from 'react'
import PropTypes from 'prop-types'
import { getColor, getStyle, hexToRgba, deepObjectsMerge } from '@coreui/utils'

import { CChartLine } from '@coreui/react-chartjs'

const brandSuccess = getStyle('success') || '#4dbd74'
const brandInfo = getStyle('info') || '#20a8d8'
const brandDanger = getStyle('danger') || '#f86c6b'

const ChartLineSimple = (props) => {
  const {
    borderColor,
    backgroundColor,
    pointHoverBackgroundColor,
    dataPoints,
    label,
    pointed,
    ...attributes
  } = props

  const pointHoverColor = (() => {
    if (pointHoverBackgroundColor) {
      return pointHoverBackgroundColor
    } else if (backgroundColor !== 'transparent') {
      return backgroundColor
    }
    return borderColor
  })()

  const defaultDatasets = (() => {
    return [
      {
        data: dataPoints,
        borderColor: getColor(borderColor),
        backgroundColor: getColor(backgroundColor),
        pointBackgroundColor: getColor(pointHoverColor),
        pointHoverBackgroundColor: getColor(pointHoverColor),
        label,
      },
    ]
  })()

  const pointedOptions = (() => {
    return {
      plugins: {
        legend: {
          display: false,
        },
      },
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            display: false,
          },
        },
        y: {
          display: false,
          grid: {
            display: false,
          },
          ticks: {
            display: false,
          },
        },
      },
      elements: {
        line: {
          borderWidth: 1,
          tension: 0.4,
        },
        point: {
          radius: 4,
          hitRadius: 10,
          hoverRadius: 4,
        },
      },
    }
  })()

  const straightOptions = (() => {
    return {
      plugins: {
        legend: {
          display: false,
        },
      },
      maintainAspectRatio: false,
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
        },
      },
      elements: {
        line: {
          borderWidth: 2,
          tension: 0.4,
        },
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
        },
      },
    }
  })()

  const defaultOptions = (() => {
    const options = pointed ? pointedOptions : straightOptions
    return Object.assign({}, options, {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
    })
  })()

  const computedDatasets = (() => {
    return deepObjectsMerge(defaultDatasets, attributes.datasets || {})
  })()

  const computedOptions = (() => {
    return deepObjectsMerge(defaultOptions, attributes.options || {})
  })()

  // render

  return (
    <CChartLine
      {...attributes}
      datasets={computedDatasets}
      options={computedOptions}
      labels={label}
    />
  )
}

ChartLineSimple.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  className: PropTypes.string,
  //
  borderColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  pointHoverBackgroundColor: PropTypes.string,
  dataPoints: PropTypes.array,
  label: PropTypes.string,
  pointed: PropTypes.bool,
}

ChartLineSimple.defaultProps = {
  borderColor: 'rgba(255,255,255,.55)',
  backgroundColor: 'transparent',
  dataPoints: [10, 22, 34, 46, 58, 70, 46, 23, 45, 78, 34, 12],
  label: 'Sales',
}

export default ChartLineSimple
