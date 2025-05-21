import React from 'react'
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
} from '@mui/material'
import { toggleCreateTicketModalClose } from '../../actions/ticketActions'
import BugIssueForm from './ModalBody/BugIssueForm'
import { projects, issueTypes } from '../../utils/TicketsConsts'

const ModalCreateTicket = () => {
  const { isCreateTicketModalOpen } = useSelector((state) => state.ticket)
  const [project, setProject] = React.useState(projects[0].value)
  const [issueType, setIssueType] = React.useState(issueTypes[0].value)
  const dispatch = useDispatch()
  const handleClose = () => {
    dispatch(toggleCreateTicketModalClose())
  }
  return (
    <Dialog
      open={isCreateTicketModalOpen}
      onClose={() => dispatch(toggleCreateTicketModalClose())}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Créer un nouveau ticket</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Les champs obligatoires sont marqués d'un astérisque *
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
                  {option.label}
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
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <Divider />
        {issueType === 'Bug' && <BugIssueForm />}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Subscribe</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ModalCreateTicket
