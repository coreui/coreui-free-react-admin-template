import React, { useState, useEffect } from 'react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import axios from '../axiosConfig'

const MonthsChart = (props) => {
  const content = props.data
  const [labels, setLabels] = useState([])
  const [data, setData] = useState(props.data)
  const color = [
    '--cui-info',
    '--cui-danger',
    '--cui-warning',
    '--cui-success',
    '--cui-primary',
    '--cui-secondary',
    '--cui-dark',
  ]

  useEffect(() => {
    const fetchedLabels = props.categories.map((row) => row.name)
    setLabels(fetchedLabels)
  }, [])

  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

  const prepareDataForMonth = () => {
    let fill = false
    const months = Object.keys(content).filter((key) => key !== 'name' && key !== 'total')

    return months.map((month) => {
      let selected = color[Math.floor(Math.random() * color.length)]
      let dataSet = []
      labels.map((label) => {
        if (label != 'total') {
          if (data[month][label] === undefined) dataSet.push(0)
          else {
            dataSet.push(data[month][label].total)
          }
        }
      })
      return {
        label: month,
        backgroundColor: hexToRgba(getStyle(selected), 10),
        borderColor: getStyle(selected),
        pointHoverBackgroundColor: getStyle(selected),
        borderWidth: 2,
        data: dataSet,
        fill: true,
      }
    })
  }
  prepareDataForMonth()
  return (
    <CChartLine
      style={{ height: '300px', marginTop: '40px' }}
      data={{
        labels: labels,
        datasets: prepareDataForMonth(),
      }}
      options={{
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              drawOnChartArea: false,
            },
          },
          y: {
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
              stepSize: Math.ceil(250 / 5),
              max: 250,
            },
          },
        },
        elements: {
          line: {
            tension: 0.4,
          },
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3,
          },
        },
      }}
    />
  )
}

export default MonthsChart
