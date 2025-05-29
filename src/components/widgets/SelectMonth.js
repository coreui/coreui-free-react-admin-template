import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardTitle, CRow, CCol, CFormSelect, CButton } from '@coreui/react'

const SelectMonth = (props) => {
  const [months, setMonths] = useState([])
  const [selectedMonth, setSelectedMonth] = useState(props.month)

  useEffect(() => {
    const monthsValues = () => {
      let values = []
      let data = Object.keys(props.data)
      data.forEach((month) => {
        if (month !== 'total') {
          values.push({ label: month, value: month })
        }
      })
      setMonths(values)
    }

    monthsValues()
  }, [props.data])

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value)
    props.change(event.target.value)
  }

  const handleMonthSubmit = () => {
    props.change(selectedMonth)
  }

  return (
    <CCard color="dark" textColor="white">
      <CCardBody>
        <CCardTitle>Change selected month</CCardTitle>
        <CRow>
          <CCol lg="8">
            <CFormSelect
              aria-label="Default select example"
              options={months}
              value={selectedMonth}
              onChange={handleMonthChange}
            />
          </CCol>
          <CCol lg="4" id="changeMonth">
            <CButton color="light" onClick={handleMonthSubmit}>
              Change!
            </CButton>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default SelectMonth
