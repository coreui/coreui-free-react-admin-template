import React from 'react'
import PropTypes from 'prop-types'
import { getColor, deepObjectsMerge } from '@coreui/utils/src'
import { CChartLine } from '@coreui/react-chartjs'

const ChartLineSimple = props => {

  const {
    borderColor,
    backgroundColor,
    pointHoverBackgroundColor,
    dataPoints,
    label,
    pointed,
    ...attributes
  } = props

  const pointHoverColor = (()=>{
    if (pointHoverBackgroundColor) {
      return pointHoverBackgroundColor
    } else if (backgroundColor !== 'transparent') {
      return backgroundColor
    }
    return borderColor
  })()

  const defaultDatasets = (()=>{
    return [
      {
        data: dataPoints,
        borderColor: getColor(borderColor),
        backgroundColor: getColor(backgroundColor),
        pointBackgroundColor: getColor(pointHoverColor),
        pointHoverBackgroundColor: getColor(pointHoverColor),
        label
      }
    ]
  })()

  const pointedOptions = (()=>{
    return {
      scales: {
        xAxes: [
          {
            offset: true,
            gridLines: {
              color: 'transparent',
              zeroLineColor: 'transparent'
            },
            ticks: {
              fontSize: 2,
              fontColor: 'transparent'
            }
          }
        ],
        yAxes: [
          {
            display: false,
            ticks: {
              display: false,
              min: Math.min.apply(Math, dataPoints) - 5,
              max: Math.max.apply(Math, dataPoints) + 5
            }
          }
        ]
      },
      elements: {
        line: {
          borderWidth: 1
        },
        point: {
          radius: 4,
          hitRadius: 10,
          hoverRadius: 4
        }
      }
    }
  })()

  const straightOptions = (()=>{
    return {
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          display: false
        }]
      },
      elements: {
        line: {
          borderWidth: 2
        },
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4
        }
      }
    }
  })()

  const defaultOptions = (()=>{
    const options = pointed ? pointedOptions : straightOptions
      return Object.assign({}, options, {
        maintainAspectRatio: false,
        legend: {
          display: false
        }
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
      type="line"
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
  pointed: PropTypes.bool
};

ChartLineSimple.defaultProps = {
  borderColor: 'rgba(255,255,255,.55)',
  backgroundColor: 'transparent',
  dataPoints: [10, 22, 34, 46, 58, 70, 46, 23, 45, 78, 34, 12],
  label: 'Sales'
};

export default ChartLineSimple
