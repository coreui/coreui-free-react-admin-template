import React, { useState } from 'react'
import { CButton, CCallout, CForm, CFormCheck, CFormInput } from '@coreui/react'
import {
  addNewConfigJiraAPI,
  checkConnectionJiraAPI,
  getAllConfigJiraAPI,
} from '../../actions/jiraActions'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const AddNewConfigJira = () => {
  const dispatch = useDispatch()
  const { configCanbeAdded } = useSelector((state) => state.jira)

  const [FormControlInputHostURL, setFormControlInputHostURL] = useState('')
  const [RadioOptionProtocol, setRadioOptionProtocol] = useState('https')
  const [FormControlInputUsername, setFormControlInputUsername] = useState('')
  const [FormControlInputPassword, setFormControlInputPassword] = useState('')
  const [FormControlInputAPIVersion, setFormControlInputAPIVersion] = useState(2)
  const [CheckStrictSSL, setCheckStrictSSL] = useState(true)

  const checkConnection = () => {
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
        addNewConfigJiraAPI(
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
              toast.error('adding failed')
            } else {
              toast.success('successful adding')
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
    <CForm>
      <CFormInput
        type="text"
        id="FormControlInputHostURL"
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
        id="Checkboxhttp"
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
        id="Checkboxhttps"
        value="https"
        label="https"
        required
        onChange={(e) => setRadioOptionProtocol(e.target.value)}
      />
      <br />
      <CFormInput
        type="test"
        id="FormControlInputUsername"
        label="username"
        text="Specify a username for this tool to authenticate all requests with."
        aria-describedby="exampleFormControlInputHelpInline"
        required
        onChange={(e) => setFormControlInputUsername(e.target.value)}
        value={FormControlInputUsername}
      />
      <CFormInput
        type="password"
        id="FormControlInputPassword"
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
        id="FormControlInputAPIVersion"
        label="API Version"
        text="What version of the jira rest api is the instance the tool is connecting to? default is 2"
        aria-describedby="exampleFormControlInputHelpInline"
        required
        onChange={(e) => setFormControlInputAPIVersion(e.target.value)}
        value={FormControlInputAPIVersion}
      />
      <CFormCheck
        id="CheckStrictSSL"
        label="Strict SSL"
        required
        onChange={(e) => setCheckStrictSSL(e.target.checked)}
        checked={CheckStrictSSL}
      />
      <CCallout color="danger">
        before adding a configuration, please make sure that the host url is reachable and the
        username and password are correct. <br />
        <strong>Note:</strong> please check the Connection before adding a configuration.
      </CCallout>
      <div className="d-flex gap-2">
        <CButton color="primary" type="submit" onClick={(e) => handleFormSubmit(e)}>
          Add Configuration
        </CButton>
        <CButton color="success" onClick={() => checkConnection()}>
          Test Connection
        </CButton>
      </div>
    </CForm>
  )
}

export default AddNewConfigJira
