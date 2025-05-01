import React, { useEffect, useState } from 'react'
import { getAllConfigJiraAPI } from '../../../actions/jiraActions'
import { useDispatch, useSelector } from 'react-redux'
import { CTable, CButton } from '@coreui/react'

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
  {
    key: 'Strict SSL',
    label: 'Strict SSL',
    _props: { scope: 'col' },
  },
]

const ConfigJiraApi = () => {
  const dispatch = useDispatch()
  const { jiraConfigList } = useSelector((state) => state.jira)
  const [configItems, setConfigItems] = useState([])

  useEffect(() => {
    if (configItems.length === 0) {
      dispatch(getAllConfigJiraAPI())
    }
  }, [dispatch])

  useEffect(() => {
    if (jiraConfigList) {
      console.log('Jira Config:', jiraConfigList)
      jiraConfigList.map((item) => {
        setConfigItems((prev) => [
          ...prev,
          {
            Host: item.host,
            Username: item.username,
            Protocol: item.protocol,
            'API Version': item.apiVersion,
            'Strict SSL': item.strictSSL,
          },
        ])
      })
    }
  }, [jiraConfigList])

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2>Configuration Jira API</h2>
        <p className="text-medium-emphasis">Current Jira API configuration settings</p>
      </div>
      <div className="mb-4">
        <CTable columns={columns} items={configItems} striped bordered hover responsive />
      </div>
      <div className="d-flex gap-2">
        <CButton color="primary">Edit Configuration</CButton>
        <CButton color="success">Test Connection</CButton>
      </div>
    </div>
  )
}

export default React.memo(ConfigJiraApi)
