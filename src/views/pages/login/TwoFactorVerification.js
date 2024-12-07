import React, { useState, useEffect, useRef } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CContainer,
  CForm,
  CFormInput,
  CRow,
  CCol,
  CAlert,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'

import { api, saveTokens } from '../../../api/api'

import { cilShieldAlt } from '@coreui/icons'
import { CIcon } from '@coreui/icons-react'

const TwoFactorVerification = () => {
  const [digits, setDigits] = useState(Array(6).fill('')) // State for 6 digits
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const inputRefs = useRef([]) // Refs for each input box
  const verifyButtonRef = useRef(null); // Ref for the Verify button
  
  useEffect(() => {
    inputRefs.current[0]?.focus() // Focus on the first input when the component loads
  }, [])

  const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      // Only allow one digit
      const newDigits = [...digits]
      newDigits[index] = value
      setDigits(newDigits)

      // Move to the next input or the Verify button if this is the last digit
      if (value) {
        if (index < 5) {
          inputRefs.current[index + 1]?.focus()
        } else {
          verifyButtonRef.current?.focus()
        }
      }
    }
  }

  const handleBackspace = (index) => {
    if (index > 0 && digits[index] === '') {
      // Move focus back if backspace is pressed on an empty input
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleFocus = (index) => {
    inputRefs.current[index]?.select() // Select the content when focused
  }

  const handle2FAVerification = async (e) => {
    e.preventDefault()
    setError(null)

    const token = digits.join('') // Combine digits into a single token

    try {
      const response = await api.post(`auth/otp/validate/`, { token })

      const { access, refresh } = response.data

      saveTokens({ access, refresh })

      navigate('/dashboard')
    } catch (err) {
      setError('Invalid 2FA code. Please try again.')
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol style={{ maxWidth: '500px' }}>
            <CCard className="p-4">
              <CCardBody>
                <CRow className="justify-content-center">
                  <CCol className="col-auto mb-4">
                    <CIcon icon={cilShieldAlt} size="3xl" className="text-primary" />
                  </CCol>
                </CRow>

                <CForm onSubmit={handle2FAVerification}>
                  <div className="text-center">
                    <p className="text-medium-emphasis">
                      Enter the 6-digit code sent to your device
                    </p>
                  </div>

                  {error && <CAlert color="danger">{error}</CAlert>}

                  <div className="d-flex justify-content-between">
                    {digits.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        value={digit}
                        maxLength={1}
                        ref={(el) => (inputRefs.current[index] = el)} // Attach ref
                        onInput={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Backspace') handleBackspace(index)
                        }}
                        onFocus={() => handleFocus(index)} // Select content on focus
                        className="form-control mx-1"
                        style={{ width: '3rem', textAlign: 'center', fontSize: '1.5rem' }}
                      />
                    ))}
                  </div>

                  <CRow className="justify-content-center">
                    <CCol className="col-auto">
                      <CButton color="primary" className="mt-3" type="submit" ref={verifyButtonRef} >
                        Verify
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default TwoFactorVerification
