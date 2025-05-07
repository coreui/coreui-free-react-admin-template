import React, { useCallback, useEffect, useRef, useState } from 'react'
import { deleteConfigJiraAPI, getAllConfigJiraAPI } from '../../../actions/jiraActions'
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
  CFormCheck,
  CButtonGroup,
} from '@coreui/react'
import AddNewConfigJira from '../../forms/addNewConfigJira'
import { toast } from 'react-toastify'
import { toggleEditConfigJiraModalOpen } from '../../../actions/jiraActions'
const columns = [
  {
    key: 'select',
    label: 'Select',
    _props: { scope: 'col' },
  },
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
  {
    key: 'Actions',
    label: 'actions',
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

  const [visible, setVisible] = useState(false)
  const [configItems, setConfigItems] = useState([])

  const handleClickAjouterConfiguration = (event) => {
    event.preventDefault()
    setVisible(!visible)
  }

  const handleClickDeleteConfiguration = useCallback(
    (event) => {
      event.preventDefault()
      const configId = event.target.id.split('-')[1]
      // Call the delete action here
      const deleteList = []
      deleteList.push(configId)
      dispatch(deleteConfigJiraAPI(deleteList))
        .then((response) => {
          if (response) {
            console.log(response)
            if (response.data.error) {
              toast.error('delete failed')
            } else {
              toast.success('successful deleted')
            }
          }
        })
        .then(() => {
          dispatch(getAllConfigJiraAPI())
        })
        .catch((error) => {
          console.error('Error checking connection:', error)
          toast.error('Connection failed')
        })
      console.log('Delete config with ID:', configId)
    },
    [dispatch],
  )

  const handleClickEditConfiguration = useCallback(
    (event) => {
      event.preventDefault()
      const configId = event.target.id.split('-')[1]
      // Call the edit action here
      dispatch(toggleEditConfigJiraModalOpen(configId))
    },
    [dispatch],
  )

  useEffect(() => {
    if (isFirstRender.current) {
      dispatch(getAllConfigJiraAPI())
      isFirstRender.current = false
    }
  }, [dispatch])

  useEffect(() => {
    if (jiraConfigList && jiraConfigList.length > 0) {
      const transformedItems = jiraConfigList.map((item) => ({
        select: (
          <CFormCheck
            type="checkbox"
            id={`select-${item.id}`}
            label=""
            className="form-check-input"
          />
        ),
        id: item.id,
        Host: item.host,
        Username: item.username,
        Protocol: item.protocol,
        'API Version': item.apiVersion,
        'Strict SSL': item.strictSSL,
        Actions: (
          <CButtonGroup size="sm" role="group" aria-label="Small button group">
            <CButton
              variant="ghost"
              color="danger"
              onClick={(e) => handleClickDeleteConfiguration(e)}
              id={`delete-${item.id}`}
            >
              delete
            </CButton>
            <CButton
              variant="ghost"
              color="primary"
              onClick={(e) => handleClickEditConfiguration(e)}
              id={`edit-${item.id}`}
            >
              Edit
            </CButton>
          </CButtonGroup>
        ),
      }))
      setConfigItems(transformedItems)
    }
  }, [jiraConfigList, handleClickDeleteConfiguration, handleClickEditConfiguration])

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
