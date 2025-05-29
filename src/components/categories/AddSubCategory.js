import React, { useState } from 'react'
import { CForm, CFormInput, CCol, CRow, CAlert, CListGroup, CListGroupItem } from '@coreui/react'
import Button from '@mui/material/Button'
import axios from 'axios'
import '../css/style.css'

const AddSubCategory = (props) => {
  const [stateG, setStateG] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const [errorMessages, setErrorMessages] = useState(null)

  const [name, setName] = useState('')

  const handleInputChange = (event) => {
    setName(event.target.value)
  }

  const handleClick = () => {
    const url = process.env.REACT_APP_API_URL
    setIsLoading(true)
    const body = {
      name: name,
      maincategory_id: props.id,
    }
    axios
      .post(url + 'sub_categories', body)
      .then((response) => {
        window.location.reload()
      })
      .catch((error) => {
        setErrorMessages(error.response.data)
        setIsLoading(false)
      })
  }
  return (
    <CForm>
      <CRow className="mb-3">
        <CCol className="sm-12">
          <h5>{props.name}</h5>
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol xs={12}>
          <CFormInput label="Subcategory name" onChange={handleInputChange} />
        </CCol>
      </CRow>
      <CRow>
        <CCol className="sm-12">
          <Button variant="contained" color="primary" onClick={handleClick} disabled={isLoading}>
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
          </div>
        </CCol>
      </CRow>
    </CForm>
  )
}
export default AddSubCategory
