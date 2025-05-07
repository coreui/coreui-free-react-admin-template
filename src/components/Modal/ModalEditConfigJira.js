import React, { useState, useEffect } from 'react'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CForm,
  CFormInput,
  CFormCheck,
  CCallout,
} from '@coreui/react'
import {
  editConfigJiraAPI,
  checkConnectionJiraAPI,
  getAllConfigJiraAPI,
  toggleEditConfigJiraModalClose,
} from '../../actions/jiraActions'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const ModalEditConfigJira = () => {
  const dispatch = useDispatch()
  const { configCanbeAdded, isEditConfigJiraModalOpen, configIdToEdit, jiraConfigList } =
    useSelector((state) => state.jira)

  const [FormControlInputHostURL, setFormControlInputHostURL] = useState('')
  const [RadioOptionProtocol, setRadioOptionProtocol] = useState('https')
  const [FormControlInputUsername, setFormControlInputUsername] = useState('')
  const [FormControlInputPassword, setFormControlInputPassword] = useState('')
  const [FormControlInputAPIVersion, setFormControlInputAPIVersion] = useState(2)
  const [CheckStrictSSL, setCheckStrictSSL] = useState(true)

  useEffect(() => {
    if (configIdToEdit !== null) {
      const configToEdit = jiraConfigList.find((config) => config.id === configIdToEdit)
      if (configToEdit) {
        setFormControlInputHostURL(configToEdit.host)
        setRadioOptionProtocol(configToEdit.protocol)
        setFormControlInputUsername(configToEdit.username)
        setFormControlInputPassword(configToEdit.password)
        setFormControlInputAPIVersion(configToEdit.apiVersion)
        setCheckStrictSSL(configToEdit.strictSSL)
      }
    }
  }, [configIdToEdit, jiraConfigList])

  const checkConnection = (e) => {
    e.preventDefault()
    dispatch(
      checkConnectionJiraAPI(
        RadioOptionProtocol,
        FormControlInputHostURL,
        FormControlInputUsername,
        FormControlInputPassword,
        FormControlInputAPIVersion,
        CheckStrictSSL,
      ),
    )
      .then((response) => {
        if (response) {
          if (response.data.error) {
            toast.error('Connection failed')
          } else {
            toast.success('Connection successful')
          }
        }
      })
      .catch((error) => {
        console.error('Error checking connection:', error)
        toast.error('Connection failed')
      })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (configCanbeAdded) {
      dispatch(
        editConfigJiraAPI(
          configIdToEdit,
          RadioOptionProtocol,
          FormControlInputHostURL,
          FormControlInputUsername,
          FormControlInputPassword,
          FormControlInputAPIVersion,
          CheckStrictSSL,
        ),
      )
        .then((response) => {
          if (response) {
            console.log(response)
            if (response.data.error) {
              toast.error('edited failed')
            } else {
              toast.success('successful edited')
              dispatch(toggleEditConfigJiraModalClose())
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
    } else {
      toast.error('please check the connection before adding a configuration')
    }
  }
  return (
    <CModal
      visible={isEditConfigJiraModalOpen}
      onClose={() => dispatch(toggleEditConfigJiraModalClose())}
      backdrop="static"
      aria-labelledby="ScrollingLongContentExampleLabel LiveDemoExampleLabel"
      scrollable
      alignment="center"
    >
      <CModalHeader onClose={() => dispatch(toggleEditConfigJiraModalClose())}>
        Modifier configuration Jira
      </CModalHeader>
      <CModalBody>
        <CForm>
          <CFormInput
            type="text"
            id="EditInputHostURL"
            label="Host URL"
            placeholder="jira.somehost.com"
            text="What host is this tool connecting to for the jira instance? Ex: jira.somehost.com"
            aria-describedby="exampleFormControlInputHelpInline"
            required
            onChange={(e) => setFormControlInputHostURL(e.target.value)}
            value={FormControlInputHostURL}
          />
          <CFormCheck
            checked={RadioOptionProtocol === 'http'}
            inline
            type="radio"
            name="RadioOptionProtocol"
            id="EditCheckboxhttp"
            value="http"
            label="http"
            required
            onChange={(e) => setRadioOptionProtocol(e.target.value)}
          />
          <CFormCheck
            checked={RadioOptionProtocol === 'https'}
            inline
            type="radio"
            name="RadioOptionProtocol"
            id="EditCheckboxhttps"
            value="https"
            label="https"
            required
            onChange={(e) => setRadioOptionProtocol(e.target.value)}
          />
          <br />
          <CFormInput
            type="test"
            id="EditInputUsername"
            label="username"
            text="Specify a username for this tool to authenticate all requests with."
            aria-describedby="exampleFormControlInputHelpInline"
            required
            onChange={(e) => setFormControlInputUsername(e.target.value)}
            value={FormControlInputUsername}
          />
          <CFormInput
            type="password"
            id="EditInputPassword"
            label="password"
            placeholder="*********"
            text="Specify a password for this tool to authenticate all requests with. Cloud users need to generate an API token for this value."
            aria-describedby="exampleFormControlInputHelpInline"
            required
            onChange={(e) => setFormControlInputPassword(e.target.value)}
            value={FormControlInputPassword}
          />
          <CFormInput
            type="number"
            id="EditInputAPIVersion"
            label="API Version"
            text="What version of the jira rest api is the instance the tool is connecting to? default is 2"
            aria-describedby="exampleFormControlInputHelpInline"
            required
            onChange={(e) => setFormControlInputAPIVersion(e.target.value)}
            value={FormControlInputAPIVersion}
          />
          <CFormCheck
            id="EditCheckStrictSSL"
            label="Strict SSL"
            required
            onChange={(e) => setCheckStrictSSL(e.target.checked)}
            checked={CheckStrictSSL}
          />
          <CCallout color="danger">
            before editing a configuration, please make sure that the host url is reachable and the
            username and password are correct. <br />
            <strong>Note:</strong> please check the Connection before editing a configuration.
          </CCallout>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="success" onClick={(e) => checkConnection(e)}>
          Test Connection
        </CButton>
        <CButton color="primary" onClick={(e) => handleFormSubmit(e)}>
          Edit Configuration
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalEditConfigJira
