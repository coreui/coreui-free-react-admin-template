import React, { useState } from 'react'
import axios from 'axios'
import { AppFooter, AppHeader } from './index'
import Button from '@mui/material/Button'
import {
  CContainer,
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
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
import { YearCalendar } from '@mui/x-date-pickers/YearCalendar'
import { MonthCalendar } from '@mui/x-date-pickers/MonthCalendar'

const url = process.env.REACT_APP_API_URL

var data = []
const response = await axios.get(url + 'categories/categories_with_sub')
response.data.map((row) => data.push(row))

const AddLoanPayment = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [Name, setName] = useState(false)
  const [Amount, setAmount] = useState(false)
  const [errorMessages, setErrorMessages] = useState(null)
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [month, setMonth] = useState(dayjs())
  const [year, setYear] = useState(dayjs())
  const [type, setType] = useState(null)
  const [succesMsg, setSuccesMsg] = useState(false)

  const currentYear = dayjs().year()
  const nextYear = dayjs().add(1, 'year').year()
  const minDate = dayjs().year(currentYear).startOf('year')
  const maxDate = dayjs().year(nextYear).endOf('year')

  const url = process.env.REACT_APP_API_URL

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  const handleMonthChange = (month) => {
    setMonth(month)
  }

  const handleYearChange = (year) => {
    setYear(year)
  }

  const handleInputChange = (event) => {
    const id = event.target.id
    const value = event.target.value
    if (id == 'inputAmount') setAmount(value)
    else if (id == 'type') setType(value)
  }

  const handleClick = () => {
    setIsLoading(true)
    setSuccesMsg(false)
    const body = {
      amount: Amount,
      date: dayjs(selectedDate).format('YYYY-MM-DD'),
      month: dayjs(month).format('MMMM'),
      Year: dayjs(year).format('YYYY'),
      type: type,
    }
    axios
      .post(url + 'credit_card_payments', body)
      .then((response) => {
        setSuccesMsg(true)
        setIsLoading(false)
      })
      .catch((error) => {
        setErrorMessages(error.response.data)
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
              <CCardHeader>Add Credit Card Payment</CCardHeader>
              <CCardBody>
                <CForm>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="inputAmount" className="col-sm-2 col-form-label">
                      Amount
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormInput type="number" id="inputAmount" onChange={handleInputChange} />
                    </CCol>
                  </CRow>

                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">Payment date</CFormLabel>
                    <CCol sm={10}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Expense date"
                          defaultValue={dayjs(selectedDate)}
                          id="date"
                          onChange={handleDateChange}
                        />
                      </LocalizationProvider>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="inputPassword3" className="col-sm-2 col-form-label">
                      Month
                    </CFormLabel>
                    <CCol sm={10}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MonthCalendar
                          id="month"
                          defaultValue={dayjs()}
                          onChange={handleMonthChange}
                        />
                      </LocalizationProvider>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="inputPassword3" className="col-sm-2 col-form-label">
                      Year
                    </CFormLabel>
                    <CCol sm={10}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <YearCalendar
                          yearsPerRow={4}
                          defaultValue={dayjs()}
                          minDate={minDate}
                          maxDate={maxDate}
                          id="year"
                          onChange={handleYearChange}
                        />
                      </LocalizationProvider>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="inputPassword3" className="col-sm-2 col-form-label">
                      Credit Card type
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormSelect id="type" onChange={handleInputChange}>
                        <option>Open this select menu</option>
                        <option value={'Ala'}>Ala Credit Card</option>
                        <option value={'Lina'}>Lina Credit Card</option>
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
                        {errorMessages != null && (
                          <CAlert color="danger" className="AlertMargin">
                            <CListGroup flush>
                              {errorMessages.map((error) => (
                                <CListGroupItem key={error}>{error}</CListGroupItem>
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
              </CCardBody>
            </CCard>
          </CContainer>
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default AddLoanPayment
