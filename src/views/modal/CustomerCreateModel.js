/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import React, { useState, useImperativeHandle, useEffect } from 'react'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
  CInputGroupText,
  CFormInput,
  CInputGroup,
  CAlert,
  CFormSelect,
  CFormCheck,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilLockLocked,
  cilUser,
  cilText,
  cilPhone,
  cilFactory,
  cilBriefcase,
  cilLocationPin,
  cilStar,
  cilMoney,
  cilArrowRight,
} from '@coreui/icons'
import axios from 'axios'
import { BACKEND_HOST } from '../../constant'
import provinces_item from './Provinces.json'
import MultiSelect from 'src/components/multiselect/MultiSelect'

const CustomerCreateModel = ({}, ref) => {
  const [visible, setVisible] = useState(false)
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [job, setJob] = useState('')
  const [userArea, setUserArea] = useState('')
  const [goodwill, setGoodWill] = useState('')
  const [intimacy, setIntimacy] = useState('')
  const [minBudget, setMinBudget] = useState('')
  const [maxBudget, setMaxBudget] = useState('')
  const [caringArea, setcaringArea] = useState([])
  const [caringProduct, setCaringProduct] = useState([])

  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const provinces = provinces_item

  useImperativeHandle(ref, () => ({
    show: () => {
      setVisible(true)
    },
  }))

  const handleSubmit = () => {
    axios
      .post(`${BACKEND_HOST}/customer/create`, {
        name,
        phone,
        age,
        job,
        userArea,
        goodwill,
        intimacy,
        minBudget,
        maxBudget,
        caringArea,
        caringProduct,
      })
      .then((res) => {
        setSuccess(true)
      })
      .catch((err) => {
        console.log('Error', err)
        setError(true)
      })
  }

  return (
    <CModal visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader closeButton>
        <CModalTitle>Create User</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {error && <CAlert color="danger">{'Error'}</CAlert>}
        {success && <CAlert color="success">{'Done'}</CAlert>}
        <CForm>
          <CInputGroup className="mb-3">
            <CInputGroupText>
              <CIcon icon={cilUser} />
            </CInputGroupText>
            <CFormInput
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Name"
              autoComplete="name"
            />
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CInputGroupText>
              <CIcon icon={cilPhone} />
            </CInputGroupText>
            <CFormInput
              placeholder="Phone"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </CInputGroup>
          <CInputGroup className="mb-4">
            <CInputGroupText>
              <CIcon icon={cilText} />
            </CInputGroupText>
            <CFormInput
              type="age"
              placeholder="Age"
              value={age}
              onChange={(event) => setAge(event.target.value)}
            />
          </CInputGroup>
          <CInputGroup className="mb-4">
            <CInputGroupText>
              <CIcon icon={cilBriefcase} />
            </CInputGroupText>
            <CFormInput
              type="job"
              placeholder="Job"
              value={job}
              onChange={(event) => setJob(event.target.value)}
            />
          </CInputGroup>
          <CInputGroup className="mb-4">
            <CInputGroupText>
              <CIcon icon={cilLocationPin} />
            </CInputGroupText>
            <CFormSelect
              aria-label="Default select example"
              value={userArea}
              onChange={(e) => setUserArea(e.target.value)}
            >
              {provinces.map((p) => {
                return <option key={p.code}>{p.name}</option>
              })}
            </CFormSelect>
          </CInputGroup>
          <CInputGroup className="mb-4">
            <CInputGroupText>
              <CIcon icon={cilStar} />
            </CInputGroupText>
            <CFormSelect
              aria-label="Default select example"
              value={goodwill}
              onChange={(e) => setGoodWill(e.target.value)}
            >
              <option>Good will</option>
              <option value="S">S</option>
              <option value="A">A</option>
              <option value="B">B</option>
            </CFormSelect>
            <CFormSelect
              aria-label="Default select example"
              value={intimacy}
              onChange={(e) => setIntimacy(e.target.value)}
            >
              <option>Intimacy</option>
              <option value="S">S</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="c">C</option>
            </CFormSelect>
          </CInputGroup>
          <CInputGroup className="mb-4">
            <CInputGroupText>
              <CIcon icon={cilMoney} />
            </CInputGroupText>
            <CFormSelect
              aria-label="Default select example"
              value={minBudget}
              onChange={(e) => setMinBudget(e.target.value)}
            >
              <option>Min Budget</option>
              <option value="0">0</option>
              <option value="5">5 tỷ</option>
              <option value="10">10 tỷ</option>
              <option value="50">50 tỷ</option>
            </CFormSelect>
            <CInputGroupText>
              <CIcon icon={cilArrowRight} color="light" />
            </CInputGroupText>
            <CFormSelect
              aria-label="Default select example"
              value={maxBudget}
              onChange={(e) => setMaxBudget(e.target.value)}
            >
              <option>Max Budget</option>
              <option value="5">5 tỷ</option>
              <option value="10">10 tỷ</option>
              <option value="50">50 tỷ</option>
            </CFormSelect>
          </CInputGroup>
          <CInputGroup className="mb-4">
            <CInputGroup>
              <div
                className="w-100 p-3 rounded"
                style={{
                  backgroundColor: '#d8dbe0',
                  border: '1px solid #b1b7c1',
                  height: '38px',
                  lineHeight: '2px',
                }}
              >
                CaringArea
              </div>
              <CInputGroup>
                <CFormCheck inline id="inlineCheckbox1" value="option1" label="Đà Nẵng" />
                <CFormCheck inline id="inlineCheckbox2" value="option2" label="Khánh Hòa" />
                <CFormCheck inline id="inlineCheckbox3" value="option3" label="Phú Quốc " />
                <CFormCheck inline id="inlineCheckbox3" value="option3" label="Sài Gòn " />
                <CFormCheck inline id="inlineCheckbox3" value="option3" label="Đồng Nai " />
                <CFormCheck inline id="inlineCheckbox3" value="option3" label="Vũng Tàu " />
              </CInputGroup>
            </CInputGroup>
            <CInputGroup>
              <div
                className="w-100 p-3 rounded"
                style={{
                  backgroundColor: '#d8dbe0',
                  border: '1px solid #b1b7c1',
                  height: '38px',
                  lineHeight: '2px',
                }}
              >
                CaringProduct
              </div>
              <CInputGroup>
                <CFormCheck inline id="inlineCheckbox1" value="option1" label="Đất nền" />
                <CFormCheck inline id="inlineCheckbox2" value="option2" label="Đất lớn" />
                <CFormCheck inline id="inlineCheckbox3" value="option3" label="BĐS trung tâm " />
                <CFormCheck inline id="inlineCheckbox3" value="option3" label="BĐS dòng tiền " />
                <CFormCheck inline id="inlineCheckbox3" value="option3" label="Dự án " />
              </CInputGroup>
            </CInputGroup>
          </CInputGroup>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Cancel
        </CButton>
        <CButton color="primary" onClick={handleSubmit}>
          Create
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default React.forwardRef(CustomerCreateModel)
