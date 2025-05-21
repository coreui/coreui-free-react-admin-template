import React from 'react'

import { TextField } from '@material-ui/core'
import { Grid, Typography } from '@mui/material'

const BugIssueForm = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 6, md: 3 }}>
        <Typography variant="overline">Summary*</Typography>
      </Grid>
      <Grid size={{ xs: 6, md: 9 }}>
        <TextField id="standard-basic" variant="standard" fullWidth />
      </Grid>
      <Grid size={{ xs: 6, md: 3 }}>
        <Typography variant="overline">Description*</Typography>
      </Grid>
      <Grid size={{ xs: 6, md: 9 }}>
        <TextField id="standard-basic" variant="standard" fullWidth />
      </Grid>
    </Grid>
  )
}

export default BugIssueForm
