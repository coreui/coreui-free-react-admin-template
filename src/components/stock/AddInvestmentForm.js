import React, { useEffect, useState } from 'react'
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
import { useSearchParams } from 'react-router-dom'
import axios from '../axiosConfig'

const AddInvestmentForm = () => {
  const [searchParams] = useSearchParams()
  const [form, setForm] = useState({
    symbol: '',
    price: 0,
    no_of_stocks: 0,
    fees: 0,
    total_buy: 0,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])
  const [succesMsg, setSuccesMsg] = useState(false)

  const url = process.env.REACT_APP_API_URL

  useEffect(() => {
    const symbol = searchParams.get('symbol')?.toUpperCase() || ''
    const price = parseFloat(searchParams.get('price') || '0')
    const qty = parseInt(searchParams.get('qty') || '1', 10)

    setForm((prev) => ({
      ...prev,
      symbol,
      price,
      no_of_stocks: qty,
    }))
  }, [searchParams])

  useEffect(() => {
    const totalBuy =
      parseFloat(form.price || 0) * parseInt(form.no_of_stocks || 0) + parseFloat(form.fees || 0)
    setForm((prev) => ({
      ...prev,
      total_buy: isNaN(totalBuy) ? 0 : totalBuy,
    }))
  }, [form.price, form.no_of_stocks, form.fees])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = () => {
    setIsLoading(true)
    setSuccesMsg(false)

    const { symbol, price, no_of_stocks, fees, total_buy } = form

    axios
      .post(`${url}investments`, {
        symbol,
        price,
        no_of_stocks,
        fees,
        total_buy,
      })
      .then(() => {
        setSuccesMsg(true)
        setIsLoading(false)
        setErrorMessages([])
      })
      .catch((error) => {
        const errors = Array.isArray(error.response?.data)
          ? error.response.data
          : [error.response?.data?.message || 'Unknown error']
        setErrorMessages(errors)
        setIsLoading(false)
      })
  }

  return (
    <div className="wrapper d-flex flex-column min-vh-100 bg-light">
      <AppHeader />
      <div className="body flex-grow-1 px-3">
        <CContainer fluid>
          <CCard>
            <CCardHeader>Add Stock Investment</CCardHeader>
            <CCardBody>
              <CForm>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">Symbol</CFormLabel>
                  <CCol sm={10}>
                    <CFormInput name="symbol" value={form.symbol} readOnly />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">Price</CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="number"
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">No. of Stocks</CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="number"
                      name="no_of_stocks"
                      value={form.no_of_stocks}
                      onChange={handleChange}
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">Fees</CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="number"
                      name="fees"
                      value={form.fees}
                      onChange={handleChange}
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">Total Buy</CFormLabel>
                  <CCol sm={10}>
                    <CFormInput type="number" value={form.total_buy.toFixed(2)} readOnly />
                  </CCol>
                </CRow>

                <CRow>
                  <CCol sm={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Saving...' : 'Save Investment'}
                    </Button>

                    <div className="mt-3">
                      {errorMessages.length > 0 && (
                        <CAlert color="danger">
                          <CListGroup flush>
                            {errorMessages.map((msg, i) => (
                              <CListGroupItem key={i}>{msg}</CListGroupItem>
                            ))}
                          </CListGroup>
                        </CAlert>
                      )}
                      {succesMsg && (
                        <CAlert color="success" className="text-center">
                          <h5>Stock investment added successfully</h5>
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
  )
}

export default AddInvestmentForm
