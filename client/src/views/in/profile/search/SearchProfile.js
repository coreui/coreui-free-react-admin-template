import React from 'react'
import { useSelector } from 'react-redux'
import { selectSearch } from '../../../../slices/searchSlice'
import default_male from '../../../../assets/images/default_male.png'
import { CAvatar, CCallout, CContainer, CImage } from '@coreui/react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import { Link } from 'react-router-dom'
import { no_result } from '.'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '10px',
  },
  fontColor: {
    color: 'black',
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  primary: {
    paddingBottom: '1rem',
    fontSize: '1.3rem',
  },
  secondary: {
    fontSize: '1rem',
  },
}))

const SearchProfile = () => {
  const classes = useStyles()
  const { resultProfiles } = useSelector(selectSearch)
  return resultProfiles.length === 0 ? (
    <>
      <CContainer className="align-items-center">
        <CImage src={no_result} fluid />
      </CContainer>
    </>
  ) : (
    <CContainer className="align-items-center col-md-10 col-xl-8">
      <List className={classes.root}>
        {resultProfiles.map((profile) => {
          return (
            <Link to={`/profile/${profile.account}`}>
              <ListItem alignItems="flex-start" className={classes.fontColor}>
                <ListItemAvatar className="px-3">
                  <Avatar
                    src={profile.userimage === '' ? default_male : profile.userimage}
                    className={classes.large}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={profile.username}
                  secondary={profile.profile}
                  classes={{
                    primary: classes.primary,
                    secondary: classes.secondary,
                  }}
                />
              </ListItem>

              <Divider variant="inset" component="li" />
            </Link>
          )
        })}
      </List>
    </CContainer>
  )
}

export default SearchProfile
