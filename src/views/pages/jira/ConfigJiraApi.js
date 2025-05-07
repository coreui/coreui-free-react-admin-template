import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  deleteConfigJiraAPI,
  editConfigJiraAPI,
  getAllConfigJiraAPI,
} from '../../../actions/jiraActions'
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
  CButtonGroup,
  CBadge,
} from '@coreui/react'
import AddNewConfigJira from '../../forms/addNewConfigJira'
import { toast } from 'react-toastify'
import { toggleEditConfigJiraModalOpen } from '../../../actions/jiraActions'
const columns = [
  {
    key: 'status',
    label: 'Status',
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
    },
    [dispatch],
  )

  const handleChangeStatusConfiguration = useCallback(
    (event) => {
      event.preventDefault()
      const configId = event.target.id.split('-')[1]
      // Call the edit action here
      const configToEdit = jiraConfigList.find((config) => config.id === configId)
      dispatch(
        editConfigJiraAPI(
          configId,
          configToEdit.protocol,
          configToEdit.host,
          configToEdit.username,
          configToEdit.password,
          configToEdit.apiVersion,
          configToEdit.strictSSL,
          !configToEdit.enableConfig,
        ),
      )
        .then((response) => {
          if (response) {
            if (response.data.error) {
              toast.error('update failed')
            } else {
              toast.success('successful updated')
            }
          }
        })
        .then(() => {
          dispatch(getAllConfigJiraAPI())
        })
        .catch((error) => {
          toast.error('Connection failed')
        })
    },
    [dispatch, jiraConfigList],
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
        id: item.id,
        status: item.enableConfig ? (
          <CBadge color="success">Enabled</CBadge>
        ) : (
          <CBadge color="danger">Disabled</CBadge>
        ),
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
            <CButton
              variant="ghost"
              color="success"
              onClick={(e) => handleChangeStatusConfiguration(e)}
              id={`status-${item.id}`}
            >
              {item.enableConfig ? 'Disable' : 'Enable'}
            </CButton>
          </CButtonGroup>
        ),
      }))
      setConfigItems(transformedItems)
    }
  }, [
    jiraConfigList,
    handleClickDeleteConfiguration,
    handleClickEditConfiguration,
    handleChangeStatusConfiguration,
  ])

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
