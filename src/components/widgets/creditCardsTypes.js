import React, { useState } from 'react'
import { CCard, CCardBody, CCardTitle } from '@coreui/react'
import { BarChart, XAxis, YAxis, Tooltip, Bar } from 'recharts'

const datePreparation = (data) => {
  const newData = Object.values(data).map((item, index) => {
    return { ...item, index }
  })
  return newData
}
const CreditCardsTypes = (props) => {
  const data = datePreparation(props.data)
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value, percentage } = payload[0].payload
      return (
        <div className="custom-tooltip">
          <div className="label">{name}</div>
          <div className="value">Value: {value}</div>
        </div>
      )
    }

    return null
  }

  return (
    <CCard color="info" textColor="white">
      <CCardBody>
        <CCardTitle>Credit Card Types</CCardTitle>
        <div className="chart-container">
          <BarChart width={300} height={72} data={data} layout="vertical">
            <XAxis type="number" hide />
            <YAxis
              dataKey="name"
              type="category"
              tick={{ fill: '#fff' }}
              axisLine={{ stroke: '#fff' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" fill="#fff" barSize={20} />
          </BarChart>
        </div>
      </CCardBody>
    </CCard>
  )
}

export default CreditCardsTypes
