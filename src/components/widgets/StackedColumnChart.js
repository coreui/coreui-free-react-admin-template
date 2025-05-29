import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

const StackedColumnChart = () => {
  //get the months
  // if(loans) {
  //   const months = Object.keys(loans.data.details);
  //   console.log(months)
  // }
  const chartRef = useRef(null)

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d')

    // Sample data for the chart
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May'],
      datasets: [
        {
          label: 'Dataset 1',
          data: [10, 20, 30, 40, 50],
          backgroundColor: 'rgba(255, 99, 132, 0.5)', // Red color
        },
        {
          label: 'Dataset 2',
          data: [20, 30, 40, 50, 60],
          backgroundColor: 'rgba(54, 162, 235, 0.5)', // Blue color
        },
      ],
    }

    // Destroy previous chart instance if it exists
    if (chartRef.current.chart) {
      chartRef.current.chart.destroy()
    }

    // Create new chart instance
    chartRef.current.chart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Stacked Column Chart',
          },
        },
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      },
    })

    // Cleanup function to destroy the chart when the component unmounts
    return () => {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy()
      }
    }
  }, [])

  return <canvas ref={chartRef} />
}

export default StackedColumnChart
