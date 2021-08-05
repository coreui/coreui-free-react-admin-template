/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import Pagination from '@material-ui/lab/Pagination'

const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80')`,
    height: '500px',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontSize: '4rem',
    flexDirection: 'column',
  },
  blogsContainer: {
    paddingTop: theme.spacing(3),
  },
  blogTitle: {
    fontWeight: 800,
    paddingBottom: theme.spacing(3),
  },
  card: {
    maxWidth: '100%',
  },
  media: {
    height: '680px',
  },
  cardActions: {
    display: 'flex',
    margin: '0 10px',
    justifyContent: 'space-between',
  },
  author: {
    display: 'flex',
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  exp: {
    fontSize: '1.875rem',
    fontWeight: '10',
    margin: '1.2rem',
  },
  intro: {
    fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
    fontSize: '1.15rem',
    margin: '0.2rem',
  },
}))

const ColumnSummary = ({ data }) => {
  const postsPerPage = 2
  const classes = useStyles()
  const [page, setPage] = useState(1)
  const contributions = (person) => {
    return (
      <Box className={classes.author} key={person}>
        <Avatar src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
        <Box ml={2} display="flex" alignItems="center">
          <Typography variant="subtitle2" component="p">
            {person}
          </Typography>
        </Box>
      </Box>
    )
  }
  const articles = data.map((art, index) => {
    if (index < postsPerPage * page && index > postsPerPage * (page - 1) - 1) {
      return (
        <Grid item xs={12} md={12} key={art.key}>
          <Card className={classes.card}>
            <Link to={'/ColumnSummary/' + art.id}>
              <CardMedia
                className={classes.media}
                image="https://picsum.photos/1024/700"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h2" component="h2">
                  {art.title}
                </Typography>
                <Typography gutterBottom className={classes.exp}>
                  {art.exp.map((e) => (
                    <h3 key={e}>{e}</h3>
                  ))}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className={classes.intro}
                >
                  {art.intro}
                </Typography>
              </CardContent>
            </Link>
            <CardActions className={classes.cardActions}>
              {art.anno.map((person) => {
                return contributions(person)
              })}
              <Box>
                <Typography variant="subtitle2" color="textSecondary" component="p">
                  {art.date} &emsp;
                  <BookmarkBorderIcon />
                </Typography>
              </Box>
            </CardActions>
          </Card>
        </Grid>
      )
    }
  })
  return (
    <div>
      <Box className={classes.hero}>
        <Box>All Release</Box>
      </Box>
      <div className={classes.blogsContainer}>
        <Typography variant="h4" className={classes.blogTitle}>
          Articles
        </Typography>
        <Grid container spacing={1}>
          {articles}
        </Grid>
      </div>
      <Box my={4} className={classes.paginationContainer}>
        <Pagination
          count={Math.ceil(data.length / postsPerPage)}
          color="secondary"
          onChange={(e, val) => {
            window.scrollTo(0, 0)
            setPage(val)
          }}
        />
      </Box>
    </div>
  )
}

export default ColumnSummary
