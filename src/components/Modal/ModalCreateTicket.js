import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MenuItem, TextField } from '@material-ui/core'
import {
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Typography,
  Slide,
} from '@mui/material'
import { toggleCreateTicketModalClose } from '../../actions/ticketActions'
import BugIssueForm from './ModalBody/BugIssueForm'
import TaskIssueForm from './ModalBody/TaskIssueForm'
import StoryIssueForm from './ModalBody/StoryIssueForm'
import { projects, issueTypes } from '../../utils/TicketsConsts'
import { emptyIssue } from '../../utils/emptyIssue'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})
const ModalCreateTicket = () => {
  const { isCreateTicketModalOpen } = useSelector((state) => state.ticket)
  const [project, setProject] = useState(projects[0].value)
  const [issueType, setIssueType] = useState(issueTypes[0].value)
  const [newIssue, setNewIssue] = useState(emptyIssue)
  const dispatch = useDispatch()
  const handleClose = () => {
    dispatch(toggleCreateTicketModalClose())
  }

  const generateId = () => {
    let id = ''
    for (let i = 0; i < 8; i++) {
      id += Math.floor(Math.random() * 10)
    }
    return id
  }
  useEffect(() => {
    const now = new Date().toISOString()
    setNewIssue({
      ...emptyIssue,
      id: generateId(),
      fields: {
        ...emptyIssue.fields,
        created: now,
        lastViewed: now,
        updated: now,
        statuscategorychangedate: now,
      },
    })
  }, [isCreateTicketModalOpen])

  useEffect(() => {
    switch (issueType) {
      case 'Bug':
        setNewIssue({
          ...emptyIssue,
          fields: {
            ...emptyIssue.fields,
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
        })
        break

      case 'Task':
        setNewIssue({
          ...emptyIssue,
          fields: {
            ...emptyIssue.fields,
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
        })
        break

      case 'Story':
        setNewIssue({
          ...emptyIssue,
          fields: {
            ...emptyIssue.fields,
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
        })
        break

      case 'Epic':
        setNewIssue({
          ...emptyIssue,
          fields: {
            ...emptyIssue.fields,
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
        })
        break

      default:
        break
    }
  }, [issueType])

  return (
    <Dialog
      slots={{
        transition: Transition,
      }}
      keepMounted
      scroll={'paper'}
      open={isCreateTicketModalOpen}
      onClose={() => dispatch(toggleCreateTicketModalClose())}
      // aria-labelledby="alert-dialog-title"
      // aria-describedby="alert-dialog-description"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      maxWidth="md"
      fullWidth
    >
      <DialogTitle id="scroll-dialog-title">Créer un nouveau ticket</DialogTitle>
      <DialogContent dividers>
        <DialogContentText id="alert-dialog-description">
          Les champs obligatoires sont marqués d&apos;un astérisque *
        </DialogContentText>
        <Grid container spacing={2}>
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography variant="overline">Projet*</Typography>
          </Grid>
          <Grid size={{ xs: 6, md: 5 }}>
            <TextField
              id="standard-select-currency"
              select
              fullWidth
              value={project}
              onChange={(event) => setProject(event.target.value)}
              helperText="Please select your project"
            >
              {projects.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Typography variant="inherit">{option.label}</Typography>
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography variant="overline">Issue Type*</Typography>
          </Grid>
          <Grid size={{ xs: 6, md: 5 }}>
            <TextField
              id="standard-select-currency"
              select
              fullWidth
              value={issueType}
              onChange={(event) => setIssueType(event.target.value)}
              helperText="Please select the issue type"
            >
              {issueTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Typography variant="inherit">{option.label}</Typography>
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <Divider />
        {issueType === 'Bug' && <BugIssueForm />}
        {issueType === 'Task' && <TaskIssueForm />}
        {issueType === 'Story' && <StoryIssueForm />}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Subscribe</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ModalCreateTicket
