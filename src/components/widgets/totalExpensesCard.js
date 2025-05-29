import React from 'react'
import { CRow, CCol, CWidgetStatsB, CProgressBar } from '@coreui/react'

var textColor = 'white'
const getColor = (limit, warning, total) => {
  if (total > limit) return 'danger'
  else if (total > warning) {
    textColor = 'black'
    return 'warning'
  } else return 'success'
}
const getPercentage = (total, limit) => {
  var percentage = total / limit
  percentage *= 100
  return Math.round(percentage)
}
const TotalExpensesCard = (props) => {
  const month = props.month
  const total = props.total
  const limit = props.limit
  const available = Math.round(limit - total)
  const color = getColor(limit, limit * 0.75, total)
  const percentage = getPercentage(total, limit)
  return (
    <CWidgetStatsB
      className="mb-3"
      color={color}
      inverse
      progress={{ value: percentage }}
      text={available + ' JOD available to spent'}
      title={total + ' spent in ' + month}
      value={percentage + '%'}
      textColor={textColor}
    />
  )
}

export default TotalExpensesCard
