import React, { useState, useEffect } from 'react'
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
  CFormLabel,
  CRow,
  CFormSelect,
  CAlert,
  CListGroup,
  CListGroupItem,
} from '@coreui/react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'

const url = process.env.REACT_APP_API_URL

const AddLoan = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessages, setErrorMessages] = useState(null)
  const [succesMsg, setSuccesMsg] = useState(false)
  const [Name, setName] = useState(false)
  const [Amount, setAmount] = useState(false)
  const [Years, setYears] = useState(false)
  const [Months, setMonths] = useState(false)
  const [type, setType] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url + 'categories/categories_with_sub')
        setData(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleInputChange = (event) => {
    const id = event.target.id
    const value = event.target.value
    if (id == 'name') setName(value)
    else if (id == 'amount') setAmount(value)
    else if (id == 'Years') setYears(value)
    else if (id == 'Months') setMonths(value)
    else if (id == 'type') setType(value)
  }

  const handleClick = () => {
    setIsLoading(true)
    setSuccesMsg(false)
    const body = {
      name: Name,
      amount: Amount,
      date: dayjs(selectedDate).format('YYYY-MM-DD'),
      months: Months,
      Years: Years,
      type: type,
    }
    console.log(body)

    axios
      .post(url + 'loans/add', body)
      .then((response) => {
        setSuccesMsg(true)
        setIsLoading(false)
      })
      .catch((error) => {
        setErrorMessages(error.response.data)
        setIsLoading(false)
      })
  }

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  return (
    <div>
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <CContainer fluid>
            <CCard>
              <CCardHeader>Add new loan</CCardHeader>
              <CCardBody>
                <CForm>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="inputName" className="col-sm-2 col-form-label">
                      Name
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormInput type="text" id="name" onChange={handleInputChange} />
                    </CCol>
                  </CRow>

                  <CRow className="mb-3">
                    <CFormLabel htmlFor="inputAmount" className="col-sm-2 col-form-label">
                      Amount
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormInput type="number" id="amount" onChange={handleInputChange} />
                    </CCol>
                  </CRow>

                  <CRow className="mb-3">
                    <CFormLabel htmlFor="inputAmount" className="col-sm-2 col-form-label">
                      Duration
                    </CFormLabel>
                    <CCol sm={10}>
                      <CRow className="mb-3">
                        <CRow className="mb-3">
                          <CCol sm={1}>
                            <CFormLabel className="col-sm-8 col-form-label">Years:</CFormLabel>
                          </CCol>
                          <CCol sm={5}>
                            <CFormInput type="number" id="Years" onChange={handleInputChange} />
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol sm={1}>
                            <CFormLabel className="col-sm-11 col-form-label">Months:</CFormLabel>
                          </CCol>
                          <CCol sm={5}>
                            <CFormInput type="number" id="Months" onChange={handleInputChange} />
                          </CCol>
                        </CRow>
                      </CRow>
                    </CCol>
                  </CRow>

                  <CRow className="mb-3">
                    <CFormLabel htmlFor="inputPassword3" className="col-sm-2 col-form-label">
                      Loan type
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormSelect id="type" onChange={handleInputChange}>
                        <option>Open this select menu</option>
                        <option value={'Credit Card'}>Credit Card</option>
                        <option value={'Cash'}>Cash</option>
                      </CFormSelect>
                    </CCol>
                  </CRow>

                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">First payment date</CFormLabel>
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

export default AddLoan
