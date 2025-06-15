import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCol,
  CCollapse,
  CContainer,
  CRow,
  CTable,
} from '@coreui/react'

import {
  getAllProjectAPI,
  deleteProjectAPI,
  toggleEditProjectModalOpen,
} from '../../../actions/projectActions'
import AddNewProject from '../../forms/addNewProject'

const columns = [
  {
    key: 'projectName',
    label: 'Project Name',
    _props: { scope: 'col' },
  },
  {
    key: 'key',
    label: 'Key',
    _props: { scope: 'col' },
  },
  {
    key: 'projectType',
    label: 'Project Type',
    _props: { scope: 'col' },
  },
  {
    key: 'projectLead',
    label: 'Project Lead',
    _props: { scope: 'col' },
  },
  {
    key: 'projectCategory',
    label: 'Project Category',
    _props: { scope: 'col' },
  },
  {
    key: 'actions',
    label: 'Actions',
    _props: { scope: 'col' },
  },
]

const Projet = () => {
  const { projectList } = useSelector((state) => state.project)
  const isFirstRender = useRef(true)
  const [visible, setVisible] = useState(false)
  const [projectItems, setProjectItems] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    if (isFirstRender.current) {
      dispatch(getAllProjectAPI())
      isFirstRender.current = false
    }
  }, [dispatch])

  const handleClickDelete = useCallback(
    (event) => {
      event.preventDefault()
      const projectId = event.target.id.split('-')[1]
      const deleteList = []
      deleteList.push(projectId)
      dispatch(deleteProjectAPI(deleteList))
    },
    [dispatch],
  )

  const handleClickEdit = useCallback(
    (event) => {
      event.preventDefault()
      const projectId = event.target.id.split('-')[1]
      dispatch(toggleEditProjectModalOpen(projectId))
    },
    [dispatch],
  )

  useEffect(() => {
    if (projectList && projectList.length > 0) {
      const transformedItems = projectList.map((item) => ({
        id: item.id,
        projectName: item.projectName,
        key: item.key,
        projectType: item.projectType,
        projectLead: item.projectLead,
        projectCategory: item.projectCategory,
        actions: (
          <CButtonGroup size="sm" role="group" aria-label="Small button group">
            <CButton
              variant="ghost"
              color="danger"
              onClick={(e) => handleClickDelete(e)}
              id={`delete-${item.id}`}
            >
              delete
            </CButton>
            <CButton
              variant="ghost"
              color="primary"
              onClick={(e) => handleClickEdit(e)}
              id={`edit-${item.id}`}
            >
              Edit
            </CButton>
          </CButtonGroup>
        ),
      }))
      setProjectItems(transformedItems)
    }
  }, [projectList, setProjectItems, handleClickDelete])

  const handleClickAjouterProject = (event) => {
    event.preventDefault()
    setVisible(!visible)
  }

  return (
    <CContainer>
      <CRow>
        <CCol sm={10}>
          <h2>All project types</h2>
          {/* <p className="text-medium-emphasis">Current Jira API configuration settings</p> */}
        </CCol>
        <CCol sm={2} className="text-end">
          <CButton
            color="success"
            className="mb-2"
            onClick={(event) => handleClickAjouterProject(event)}
          >
            Ajouter Project
          </CButton>
        </CCol>
      </CRow>
      <CCollapse visible={visible} className="mb-4">
        <CCard className="mt-3">
          <CCardBody>
            <AddNewProject />
          </CCardBody>
        </CCard>
      </CCollapse>
      <CTable columns={columns} items={projectItems} bordered hover responsive />
    </CContainer>
  )
}

export default Projet
