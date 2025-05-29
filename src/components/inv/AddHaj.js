import React, { useState } from 'react'
import axios from 'axios'
import { AppFooter, AppHeader } from './../index'
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
} from '@coreui/react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'

const AddHaj = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [Amount, setAmount] = useState('')
  const [errorMessages, setErrorMessages] = useState([])
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [succesMsg, setSuccesMsg] = useState(false)
  const [selectedYear, setSelectedYear] = useState(null)

  const url = process.env.REACT_APP_API_URL

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  const handleInputChange = (event) => {
    setAmount(event.target.value)
  }

  const handleClick = () => {
    setIsLoading(true)
    setSuccesMsg(false)
    const body = {
      amount: Amount,
      month: dayjs(selectedDate).format('MMMM'),
      Year: dayjs(selectedYear).format('YYYY'),
    }
    axios
      .post(`${url}haj`, body)
      .then(() => {
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
              <CCardHeader>Add Haj Saving</CCardHeader>
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
                              <h5>You have added the haj saving amount correctly</h5>
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

export default AddHaj
