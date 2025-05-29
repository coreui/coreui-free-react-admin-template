import React, { useState } from 'react'
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
  CFormSelect,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom' // NEW for redirect
import axios from '../axiosConfig'

const AddLiquidityForm = () => {
  const [form, setForm] = useState({
    currency: 'USD',
    amount: 0,
    type: 'in',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])
  const [successMsg, setSuccessMsg] = useState(false)

  const navigate = useNavigate() // NEW

  const url = process.env.REACT_APP_API_URL

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }))
  }

  const handleSubmit = () => {
    setIsLoading(true)
    setSuccessMsg(false)
    setErrorMessages([])

    const { currency, amount, type } = form

    if (parseFloat(amount) <= 0) {
      setErrorMessages(['Amount must be greater than 0'])
      setIsLoading(false)
      return
    }

    axios
      .post(`${url}liquidity`, {
        currency,
        amount: parseFloat(amount),
        type,
      })
      .then(() => {
        setSuccessMsg(true)
        setIsLoading(false)

        // Reset the form
        setForm({
          currency: 'USD',
          amount: 0,
          type: 'in',
        })
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
            <CCardHeader>Add Liquidity</CCardHeader>
            <CCardBody>
              <CForm>
                {/* Currency */}
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">Currency</CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      name="currency"
                      value={form.currency}
                      onChange={handleChange}
                      placeholder="Currency"
                    />
                  </CCol>
                </CRow>

                {/* Amount */}
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">Amount</CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="number"
                      name="amount"
                      value={form.amount}
                      onChange={handleChange}
                      placeholder="Amount"
                    />
                  </CCol>
                </CRow>

                {/* Type */}
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">Type</CFormLabel>
                  <CCol sm={10}>
                    <CFormSelect name="type" value={form.type} onChange={handleChange}>
                      <option value="in">In</option>
                      <option value="out">Out</option>
                    </CFormSelect>
                  </CCol>
                </CRow>

                {/* Submit */}
                <CRow>
                  <CCol sm={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Saving...' : 'Save Liquidity'}
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
                      {successMsg && (
                        <CAlert color="success" className="text-center">
                          <h5>Liquidity added successfully</h5>
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

export default AddLiquidityForm
