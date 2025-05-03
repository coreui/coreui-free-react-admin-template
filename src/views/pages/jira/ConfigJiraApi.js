import React, { useEffect, useRef, useState } from 'react'
import { getAllConfigJiraAPI } from '../../../actions/jiraActions'
import { useDispatch, useSelector } from 'react-redux'
import {
  CTable,
  CButton,
  CCol,
  CRow,
  CContainer,
  CCollapse,
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CFormSelect,
  CFormCheck,
} from '@coreui/react'
import AddNewConfigJira from '../../forms/addNewConfigJira'
const columns = [
  {
    key: 'Host',
    label: 'Host',
    _props: { scope: 'col' },
  },
  {
    key: 'Username',
    label: 'Username',
    _props: { scope: 'col' },
  },
  {
    key: 'Protocol',
    label: 'Protocol',
    _props: { scope: 'col' },
  },
  {
    key: 'API Version',
    label: 'API Version',
    _props: { scope: 'col' },
  },
  // {
  //   key: 'Strict SSL',
  //   label: 'Strict SSL',
  //   _props: { scope: 'col' },
  // },
]

const ConfigJiraApi = () => {
  const dispatch = useDispatch()

  const isFirstRender = useRef(true)

  const { jiraConfigList } = useSelector((state) => state.jira)

  const [visible, setVisible] = useState(true)
  const [configItems, setConfigItems] = useState([])

  const handleClickAjouterConfiguration = (event) => {
    event.preventDefault()
    setVisible(!visible)
  }

  useEffect(() => {
    if (isFirstRender.current) {
      dispatch(getAllConfigJiraAPI())
      isFirstRender.current = false
    }
  }, [dispatch])

  useEffect(() => {
    if (jiraConfigList && jiraConfigList.length > 0) {
      const transformedItems = jiraConfigList.map((item) => ({
        Host: item.host,
        Username: item.username,
        Protocol: item.protocol,
        'API Version': item.apiVersion,
        'Strict SSL': item.strictSSL,
      }))
      setConfigItems(transformedItems)
    }
  }, [jiraConfigList])

  return (
    <CContainer>
      <CRow>
        <CCol sm={10}>
          <h2>Configuration Jira API</h2>
          <p className="text-medium-emphasis">Current Jira API configuration settings</p>
        </CCol>
        <CCol sm={2} className="text-end">
          <CButton
            color="success"
            className="mb-2"
            onClick={(event) => handleClickAjouterConfiguration(event)}
          >
            Ajouter Configuration
          </CButton>
        </CCol>
      </CRow>
      <CCollapse visible={visible} className="mb-4">
        <CCard className="mt-3">
          <CCardBody>
            <AddNewConfigJira />
          </CCardBody>
        </CCard>
      </CCollapse>
      <div className="mb-4">
        <CTable columns={columns} items={configItems} striped bordered hover responsive />
      </div>
      {/* <div className="d-flex gap-2">
        <CButton color="primary">Edit Configuration</CButton>
        <CButton color="success">Test Connection</CButton>
      </div> */}
    </CContainer>
  )
}

export default React.memo(ConfigJiraApi)
