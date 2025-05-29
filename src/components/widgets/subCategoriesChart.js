import React from 'react'
import { CChart, CChartBar } from '@coreui/react-chartjs'

const getColor = (percentage) => {
  if (percentage < 0.7) return 'rgba(40, 167, 69, 1)'
  else if (percentage > 1) return 'rgba(220, 53, 69, 1)'
  else return 'rgba(255, 193, 7, 1)'
}

const SubCAtegoriesChart = (props) => {
  const data = props.data
  const dataKeys = Object.keys(data)
  const labels = []
  const values = []

  if (Array.isArray(dataKeys)) {
    if (!props.selectedSubcategory) {
      // Use the map function on the dataKeys array
      dataKeys.map((index) => {
        if (index !== 'total') {
          const subcategories = Object.keys(data[index])
          subcategories.map((key) => {
            if (key != 'total') {
              if (key != 'index') {
                labels.push(key)
                values.push(data[index][key]['total'])
              }
            }
          })
        }
      })
    } else {
      const subcategories = Object.keys(data)
      subcategories.map((key) => {
        if (key != 'total') {
          labels.push(key)
          values.push(data[key]['total'])
        }
      })
    }
  }

  // Combine labels and values into an array of objects
  const output = labels.map((label, index) => ({
    label,
    value: values[index],
  }))

  // Sort the array of objects in descending order based on value
  output.sort((a, b) => b.value - a.value)

  // Extract the sorted labels and values
  const sortedLabels = output.map((item) => item.label)
  const sortedValues = output.map((item) => item.value)

  var dataSet = {
    labels: sortedLabels,
    datasets: [
      {
        label: 'Sub Categories',
        backgroundColor: getColor(props.percentage),
        data: sortedValues,
      },
    ],
  }
  return <CChart type="bar" data={dataSet} labels="months" />
}

export default SubCAtegoriesChart
