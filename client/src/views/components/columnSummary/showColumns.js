/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import Pagination from '@material-ui/lab/Pagination'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { selectColumnSummary, setPage } from '../../../slices/columnSummarySlice'

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

const ShowColumns = () => {
  const postsPerPage = 5
  const classes = useStyles()
  const dispatch = useDispatch()
  const [data, setData] = useState({ maxPage: undefined, data: [] })
  const { page } = useSelector(selectColumnSummary)
  const [isPending, setIsPending] = useState(true)
  const getData = () => {
    axios
      .get('/api/column/outline', {
        params: { perpage: postsPerPage.toString(), page: page.toString() },
      })
      .then((res) => {
        console.log('this is data:', data)
        setData(res.data)
        setIsPending(false)
      })
      .catch((err) => {
        err.response.data.description && alert('錯誤\n' + err.response.data.description)
      })
  }
  useEffect(() => {
    getData()
  }, [page])
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
  const articles = (data) => {
    return data.data.map((art) => {
      return (
        <Grid item xs={12} md={12} key={art.key}>
          <Card className={classes.card}>
            <Link to={'/ColumnSummary/' + art.id}>
              <CardMedia
                className={classes.media}
                image={art.imgSrc}
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
    })
  }
  return (
    <div>
      <Box className={classes.hero}>
        <Box>All Articles</Box>
      </Box>
      {isPending && (
        <div className="spinner-border text-primary mt-3" role="status">
          <span className="sr-only"></span>
        </div>
      )}
      {!isPending && (
        <div className={classes.blogsContainer}>
          <Grid container spacing={1}>
            {articles(data)}
          </Grid>
        </div>
      )}
      {data.maxPage && (
        <Box my={4} className={classes.paginationContainer}>
          <Pagination
            count={data.maxPage}
            defaultPage={page}
            color="secondary"
            onChange={(e, val) => {
              window.scrollTo(0, 0)
              dispatch(setPage(val))
              setIsPending(true)
            }}
          />
        </Box>
      )}
    </div>
  )
}

export default ShowColumns
