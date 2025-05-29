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
  CFormSwitch,
} from '@coreui/react'
import { useSearchParams } from 'react-router-dom'
import axios from '../axiosConfig'

const SellInvestmentForm = () => {
  const [searchParams] = useSearchParams()
  const [form, setForm] = useState({
    symbol: '',
    price: 0,
    no_of_stocks: 0,
    fees: 0,
    total_buy: 0,
    sell_price: 0,
    is_sold: 0,
    profit: 0,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])
  const [succesMsg, setSuccesMsg] = useState(false)

  const url = process.env.REACT_APP_API_URL

  useEffect(() => {
    const symbol = searchParams.get('symbol')?.toUpperCase() || ''
    const price = parseFloat(searchParams.get('price') || '0')
    const qty = parseInt(searchParams.get('qty') || '1', 10)
    const currentPrice = parseFloat(searchParams.get('current_price') || '0')
    const fees = parseFloat(searchParams.get('fees') || '0')

    setForm((prev) => ({
      ...prev,
      symbol,
      price,
      no_of_stocks: qty,
      sell_price: currentPrice,
      fees,
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
    const { name, value, type, checked } = e.target
    const val = type === 'checkbox' ? (checked ? 1 : 0) : value
    setForm({ ...form, [name]: val })
  }

  const handleSubmit = () => {
    setIsLoading(true)
    setSuccesMsg(false)

    const { symbol, price, no_of_stocks, fees, total_buy, sell_price, is_sold, profit } = form

    const id = searchParams.get('id')

    axios
      .post(`${url}investments/update`, {
        symbol,
        sell_price,
        is_sold,
        profit,
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
            <CCardHeader>Sell Stock Investment</CCardHeader>
            <CCardBody>
              <CForm>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">Symbol</CFormLabel>
                  <CCol sm={10}>
                    <CFormInput name="symbol" value={form.symbol} readOnly />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">Buy Price</CFormLabel>
                  <CCol sm={10}>
                    <CFormInput type="number" name="price" value={form.price} readOnly />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">No. of Stocks</CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="number"
                      name="no_of_stocks"
                      value={form.no_of_stocks}
                      readOnly
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">Fees</CFormLabel>
                  <CCol sm={10}>
                    <CFormInput type="number" name="fees" value={form.fees} readOnly />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">Total Buy</CFormLabel>
                  <CCol sm={10}>
                    <CFormInput type="number" value={form.total_buy.toFixed(2)} readOnly />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">Sell Price</CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="number"
                      name="sell_price"
                      value={form.sell_price}
                      onChange={handleChange}
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">Profit</CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="number"
                      name="profit"
                      value={form.profit}
                      onChange={handleChange}
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3 align-items-center">
                  <CFormLabel className="col-sm-2 col-form-label">Is Sold</CFormLabel>
                  <CCol sm={10}>
                    <CFormSwitch
                      name="is_sold"
                      checked={form.is_sold === 1}
                      onChange={(e) => setForm({ ...form, is_sold: e.target.checked ? 1 : 0 })}
                      label={form.is_sold ? 'Sold' : 'Not Sold'}
                    />
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
                          <h5>Stock investment updated successfully</h5>
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

export default SellInvestmentForm
