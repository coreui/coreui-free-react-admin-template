import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import {
  CButton,
  CCol,
  CForm,
  CFormLabel,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CCallout,
} from '@coreui/react'
import { addNewTicketAPI, toggleCreateTicketModalClose } from '../../actions/ticketActions'
import BugIssueForm from './ModalBody/BugIssueForm'
import TaskIssueForm from './ModalBody/TaskIssueForm'
import StoryIssueForm from './ModalBody/StoryIssueForm'
// import EpicIssueForm from './ModalBody/EpicIssueForm' // À créer si nécessaire
import { projects, issueTypes } from '../../utils/TicketsConsts'
import { emptyIssue } from '../../utils/emptyIssue'

const ModalCreateTicket = () => {
  const { isCreateTicketModalOpen } = useSelector((state) => state.ticket)
  const location = useLocation()
  const [project, setProject] = useState(projects[0].value)
  const [issueType, setIssueType] = useState(issueTypes[0].value)
  const [newIssue, setNewIssue] = useState(emptyIssue)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const dispatch = useDispatch()

  // Extraire le code du projet depuis le pathname
  const getProjectFromPath = () => {
    const pathSegments = location.pathname.split('/')
    // Supposons que le format soit /project/{projectCode} ou similar
    const projectCodeFromPath = pathSegments.find((segment) =>
      projects.some(
        (p) => p.value === segment || p.label.toLowerCase().includes(segment.toLowerCase()),
      ),
    )

    if (projectCodeFromPath) {
      const foundProject = projects.find(
        (p) =>
          p.value === projectCodeFromPath ||
          p.label.toLowerCase().includes(projectCodeFromPath.toLowerCase()),
      )
      return foundProject ? foundProject.value : projects[0].value
    }

    return projects[0].value
  }

  const handleClose = () => {
    // Reset du formulaire lors de la fermeture
    setNewIssue(emptyIssue)
    setProject(projects[0].value)
    setIssueType(issueTypes[0].value)
    setIsSubmitting(false)
    dispatch(toggleCreateTicketModalClose())
  }

  const handleSubmitTicket = async () => {
    // Validation basique
    if (!newIssue.fields?.summary?.trim()) {
      alert('Le résumé est obligatoire')
      return
    }

    setIsSubmitting(true)
    try {
      await dispatch(addNewTicketAPI(newIssue))
      handleClose() // Fermer après succès
    } catch (error) {
      console.error('Erreur lors de la création du ticket:', error)
      alert('Erreur lors de la création du ticket')
    } finally {
      setIsSubmitting(false)
    }
  }

  const generateId = () => {
    let id = ''
    for (let i = 0; i < 8; i++) {
      id += Math.floor(Math.random() * 10)
    }
    return id
  }

  // Définir le projet basé sur le pathname lors de l'ouverture du modal
  useEffect(() => {
    if (isCreateTicketModalOpen) {
      const projectFromPath = getProjectFromPath()
      setProject(projectFromPath)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreateTicketModalOpen, location.pathname])

  useEffect(() => {
    const now = new Date().toISOString()
    setNewIssue((prevIssue) => ({
      ...prevIssue,
      id: generateId(),
      fields: {
        ...prevIssue.fields,
        created: now,
        lastViewed: now,
        updated: now,
        statuscategorychangedate: now,
        project: {
          key: project,
          name: projects.find((p) => p.value === project)?.label || project,
        },
      },
    }))
  }, [isCreateTicketModalOpen, project])

  useEffect(() => {
    setNewIssue((prevIssue) => {
      let updatedIssue = { ...prevIssue }

      switch (issueType) {
        case 'Bug':
          updatedIssue = {
            ...prevIssue,
            fields: {
              ...prevIssue.fields,
              issuetype: {
                id: '10002',
                hierarchyLevel: 0,
                iconUrl:
                  'https://sesame-team-pfe.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10303?size=medium',
                avatarId: 10303,
                subtask: false,
                description: 'Un problème ou une erreur.',
                entityId: 'b6942a7a-0278-49e3-89d3-85295176d3e8',
                name: 'Bug',
                self: 'https://sesame-team-pfe.atlassian.net/rest/api/2/issuetype/10002',
              },
            },
          }
          break

        case 'Task':
          updatedIssue = {
            ...prevIssue,
            fields: {
              ...prevIssue.fields,
              issuetype: {
                self: 'https://sesame-team-pfe.atlassian.net/rest/api/2/issuetype/10001',
                name: 'Tâche',
                description: 'Une tâche distincte.',
                id: '10001',
                entityId: 'ca1798d2-e4c6-4758-bfaf-7e38a85cd0ea',
                iconUrl:
                  'https://sesame-team-pfe.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium',
                avatarId: 10318,
                subtask: false,
                hierarchyLevel: 0,
              },
            },
          }
          break

        case 'Story':
          updatedIssue = {
            ...prevIssue,
            fields: {
              ...prevIssue.fields,
              issuetype: {
                hierarchyLevel: 0,
                subtask: false,
                description: "Une fonctionnalité exprimée sous la forme d'un objectif utilisateur.",
                iconUrl:
                  'https://sesame-team-pfe.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium',
                avatarId: 10315,
                entityId: '6b7e8da8-f84c-41ac-80ac-ba881764a634',
                name: 'Story',
                id: '10003',
                self: 'https://sesame-team-pfe.atlassian.net/rest/api/2/issuetype/10003',
              },
            },
          }
          break

        case 'Epic':
          updatedIssue = {
            ...prevIssue,
            fields: {
              ...prevIssue.fields,
              issuetype: {
                self: 'https://sesame-team-pfe.atlassian.net/rest/api/2/issuetype/10004',
                id: '10004',
                description: 'Une collection de bugs, stories et tâches connexes.',
                iconUrl:
                  'https://sesame-team-pfe.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10307?size=medium',
                name: 'Epic',
                subtask: false,
                avatarId: 10307,
                entityId: 'd1c66b55-cd69-4aba-b239-665a2e2f6af3',
                hierarchyLevel: 1,
              },
            },
          }
          break

        default:
          break
      }

      return updatedIssue
    })
  }, [issueType])

  return (
    <CModal
      visible={isCreateTicketModalOpen}
      onClose={handleClose}
      backdrop="static"
      size="lg"
      scrollable
    >
      <CModalHeader>
        <CModalTitle>Créer un nouveau ticket</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCallout color="info" className="mb-3">
          Les champs obligatoires sont marqués d&apos;un astérisque *
        </CCallout>

        <CForm>
          <CRow className="mb-3">
            <CCol md={3}>
              <CFormLabel className="fw-bold">Projet*</CFormLabel>
            </CCol>
            <CCol md={5}>
              <CFormSelect
                value={project}
                onChange={(event) => setProject(event.target.value)}
                aria-describedby="project-help"
              >
                {projects.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </CFormSelect>
              <small id="project-help" className="form-text text-muted">
                Veuillez sélectionner votre projet
              </small>
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md={3}>
              <CFormLabel className="fw-bold">Type d&apos;issue*</CFormLabel>
            </CCol>
            <CCol md={5}>
              <CFormSelect
                value={issueType}
                onChange={(event) => setIssueType(event.target.value)}
                aria-describedby="issue-type-help"
              >
                {issueTypes.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </CFormSelect>
              <small id="issue-type-help" className="form-text text-muted">
                Veuillez sélectionner le type d&apos;issue
              </small>
            </CCol>
          </CRow>
        </CForm>

        <hr />

        {issueType === 'Bug' && <BugIssueForm newIssue={newIssue} setNewIssue={setNewIssue} />}
        {issueType === 'Task' && <TaskIssueForm newIssue={newIssue} setNewIssue={setNewIssue} />}
        {issueType === 'Story' && <StoryIssueForm newIssue={newIssue} setNewIssue={setNewIssue} />}
        {issueType === 'Epic' && (
          <div className="alert alert-info">Formulaire Epic à implémenter (EpicIssueForm)</div>
        )}
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={handleClose} disabled={isSubmitting}>
          Annuler
        </CButton>
        <CButton color="primary" onClick={handleSubmitTicket} disabled={isSubmitting}>
          {isSubmitting ? 'Création...' : 'Créer'}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalCreateTicket
