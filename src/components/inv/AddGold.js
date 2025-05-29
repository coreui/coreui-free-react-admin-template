import React, { useState } from 'react'
import axios from 'axios'
import { AppFooter, AppHeader } from '../index'
import Button from '@mui/material/Button'
import {
  CContainer,
  CCard,
  CCardHeader,
  CCardBody,
  CForm,
  CFormInput,
  CCol,
  CRow,
  CAlert,
  CListGroup,
  CListGroupItem,
  CFormLabel,
  CFormSelect,
} from '@coreui/react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'

const AddGold = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [Amount, setAmount] = useState(false)
  const [gram, setGram] = useState(false)
  const [gramCost, setGramCost] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [month, setMonth] = useState(dayjs())
  const [year, setYear] = useState(dayjs())
  const [succesMsg, setSuccesMsg] = useState(false)
  const [selectedYear, setSelectedYear] = useState(null)
  const [type, setType] = useState(null)
  const [currency, setCurrency] = useState('JOD')

  const url = process.env.REACT_APP_API_URL

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  const handleInputChange = (event) => {
    const id = event.target.id
    const value = event.target.value

    if (id === 'inputAmount') {
      setAmount(value)
    } else if (id === 'inputGrams') {
      setGram(value)
    } else if (id === 'inputGramCost') {
      setGramCost(value)
    } else if (id === 'type') {
      setType(value)
    } else if (id === 'currency') {
      setCurrency(value)
    }
  }

  const handleClick = () => {
    setIsLoading(true)
    setSuccesMsg(false)

    const body = {
      amount: Amount,
      date: dayjs(selectedDate).format('YYYY-MM-DD'),
      month: dayjs(month).format('MMMM'),
      Year: dayjs(year).format('YYYY'),
      gram: gram,
      gramCost: gramCost,
      type: type,
      currency: currency,
    }

    axios
      .post(url + 'gold', body)
      .then((response) => {
        setSuccesMsg(true)
        setIsLoading(false)
        setErrorMessages([])
      })
      .catch((error) => {
        const errors = Array.isArray(error.response.data)
          ? error.response.data
          : [error.response.data]
        setErrorMessages(errors)
        setIsLoading(false)
      })
  }

  return (
    <div>
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <CContainer fluid>
            <CCard>
              <CCardHeader>Add Gold Payment</CCardHeader>
              <CCardBody>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <CForm>
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="inputYear" className="col-sm-2 col-form-label">
                        Year
                      </CFormLabel>
                      <CCol sm={10}>
                        <DatePicker
                          views={['year']}
                          value={selectedYear}
                          onChange={(date) => setSelectedYear(date)}
                          renderInput={(params) => <CFormInput {...params} />}
                        />
                      </CCol>
                    </CRow>

                    <CRow className="mb-3">
                      <CFormLabel className="col-sm-2 col-form-label">Date</CFormLabel>
                      <CCol sm={10}>
                        <DatePicker
                          label="Expense date"
                          value={dayjs(selectedDate)}
                          onChange={handleDateChange}
                        />
                      </CCol>
                    </CRow>

                    <CRow className="mb-3">
                      <CFormLabel htmlFor="inputAmount" className="col-sm-2 col-form-label">
                        Amount
                      </CFormLabel>
                      <CCol sm={10}>
                        <CFormInput type="number" id="inputAmount" onChange={handleInputChange} />
                      </CCol>
                    </CRow>

                    <CRow className="mb-3">
                      <CFormLabel htmlFor="inputGrams" className="col-sm-2 col-form-label">
                        Grams
                      </CFormLabel>
                      <CCol sm={10}>
                        <CFormInput type="number" id="inputGrams" onChange={handleInputChange} />
                      </CCol>
                    </CRow>

                    <CRow className="mb-3">
                      <CFormLabel htmlFor="inputGramCost" className="col-sm-2 col-form-label">
                        Gram cost
                      </CFormLabel>
                      <CCol sm={10}>
                        <CFormInput type="number" id="inputGramCost" onChange={handleInputChange} />
                      </CCol>
                    </CRow>

                    <CRow className="mb-3">
                      <CFormLabel htmlFor="type" className="col-sm-2 col-form-label">
                        Gold type
                      </CFormLabel>
                      <CCol sm={10}>
                        <CFormSelect id="type" onChange={handleInputChange}>
                          <option>Open this select menu</option>
                          <option value="gold">Gold</option>
                          <option value="Etihad gold">Etihad gold</option>
                          <option value="silver">Silver</option>
                          <option value="Forex">Forex</option>
                        </CFormSelect>
                      </CCol>
                    </CRow>

                    <CRow className="mb-3">
                      <CFormLabel htmlFor="currency" className="col-sm-2 col-form-label">
                        Currency
                      </CFormLabel>
                      <CCol sm={10}>
                        <CFormSelect id="currency" value={currency} onChange={handleInputChange}>
                          <option value="JOD">JOD</option>
                          <option value="USD">USD</option>
                          <option value="GBP">GBP</option>
                          <option value="EUR">EUR</option>
                        </CFormSelect>
                      </CCol>
                    </CRow>

                    <CRow>
                      <CCol className="sm-12">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleClick}
                          disabled={isLoading}
                        >
                          {isLoading ? 'Loading...' : 'Add'}
                        </Button>
                        <div id="error">
                          {errorMessages.length > 0 && (
                            <CAlert color="danger" className="AlertMargin">
                              <CListGroup flush>
                                {errorMessages.map((error, index) => (
                                  <CListGroupItem key={index}>{error}</CListGroupItem>
                                ))}
                              </CListGroup>
                            </CAlert>
                          )}
                          {succesMsg && (
                            <CAlert
                              color="success"
                              className="AlertMargin"
                              style={{ textAlign: 'center' }}
                            >
                              <h5>You have added the expense correctly</h5>
                            </CAlert>
                          )}
                        </div>
                      </CCol>
                    </CRow>
                  </CForm>
                </LocalizationProvider>
              </CCardBody>
            </CCard>
          </CContainer>
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default AddGold
