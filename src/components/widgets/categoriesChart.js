import React, { useState, useEffect } from 'react'
import { CChart } from '@coreui/react-chartjs'

const CategoriesChart = (props) => {
  const data = props.data
  const dataKeys = Object.keys(data)
  const labels = []
  const values = []
  const percentage = props.percentage

  const getColor = () => {
    if (percentage < 0.7) return 'rgba(40, 167, 69, 1)'
    else if (percentage > 1) return 'rgba(220, 53, 69, 1)'
    else return 'rgba(255, 193, 7, 1)'
  }

  const [backgroundColor, setBackgroundColor] = useState(getColor())
  const [selectedBarIndex, setSelectedBarIndex] = useState(null)
  let selectedLabels = []
  let selectedValues = []

  const handleColumnClick = (_, elements) => {
    const clickedBarIndex = elements[0]?.index
    if (clickedBarIndex != null) {
      if (clickedBarIndex === selectedBarIndex) {
        setSelectedBarIndex(null)
        setBackgroundColor(getColor())
        props.filterPerCategory(null) // Reset the category filter
      } else {
        const updatedBackgroundColor = labels.map((_, index) => {
          if (percentage < 0.7)
            return index === clickedBarIndex ? 'rgba(40, 167, 69, 1)' : 'rgba(40, 167, 69, 0.3)'
          else if (percentage > 1)
            return index === clickedBarIndex ? 'rgba(220, 53, 69, 1)' : 'rgba(220, 53, 69, 0.3)'
          else return index === clickedBarIndex ? 'rgba(255, 193, 7, 1)' : 'rgba(255, 193, 7, 0.3)'
        })

        setSelectedBarIndex(clickedBarIndex)
        setBackgroundColor(updatedBackgroundColor)
        const selectedLabel = selectedLabels[clickedBarIndex]
        props.filterPerCategory(selectedLabel)
      }
    }
  }

  if (Array.isArray(dataKeys)) {
    dataKeys.forEach((index) => {
      if (index !== 'total') {
        labels.push(index)
        values.push(data[index]['total'])
      }
    })

    const output = labels.map((label, index) => ({
      label,
      value: values[index],
    }))

    output.sort((a, b) => b.value - a.value)

    selectedLabels = output.map((item) => item.label)
    selectedValues = output.map((item) => item.value)

    var dataSet = {
      labels: selectedLabels,
      datasets: [
        {
          label: 'Main categories',
          backgroundColor: backgroundColor,
          data: selectedValues,
        },
      ],
    }
  }

  const options = {
    responsive: true,
    onClick: handleColumnClick,
  }
  useEffect(() => {
    setBackgroundColor(getColor())
  }, [props])

  return <CChart type="bar" data={dataSet} labels="months" options={options} />
}

export default CategoriesChart
