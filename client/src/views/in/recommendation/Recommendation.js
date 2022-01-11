import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { selectCareer, setKeywords, clearKeywords } from '../career/index'
import CareerBlock from '../career/CareerBlock'
import Masonry from 'react-masonry-css'
import { Spinner } from './index'
import { CButton, CFormControl, CInputGroup } from '@coreui/react'
import Pagination from '@material-ui/lab/Pagination'
import CIcon from '@coreui/icons-react'

const Recommendation = () => {
  const [data, setData] = useState({ data: [], maxPage: 1 })
  const dispatch = useDispatch()
  const { keywords } = useSelector(selectCareer)
  const [isPending, setIsPending] = useState()
  const [isSearch, setIsSearch] = useState(false)
  const [page, setPage] = useState(1)
  const postsPerPage = 9
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    500: 1,
  }
  const searchData = (e) => {
    e.preventDefault()
    setIsPending(true)
    setIsSearch(true)
    axios
      .post('/api/smartsearchrecommendation', { keyword: keywords })
      .then((res) => {
        setData(res.data)
        setIsPending(false)
      })
      .catch((err) => {
        err.response.data.description && alert('錯誤\n' + err.response.data.description)
      })
  }
  const getData = () => {
    setIsPending(true)
    setIsSearch(false)
    dispatch(clearKeywords())
    axios
      .get('/api/recommendation', { params: { page, perpage: postsPerPage } })
      .then((res) => {
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

  return (
    <>
      <div
        className="d-flex flex-column justify-content-center align-items-center mb-4"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '500px',
          color: 'white',
        }}
      >
        <div className="display-1">Recommendations</div>
        <form className="text-light py-2 my-2 w-75" onSubmit={(e) => searchData(e)}>
          <CInputGroup>
            <CButton
              onClick={() => {
                clearKeywords()
                getData()
              }}
              color="light"
            >
              <CIcon icon="cil-home" name="cil-home" />
            </CButton>
            <CFormControl
              type="search"
              placeholder={keywords === '' ? 'search for...' : keywords}
              value={keywords}
              onChange={(e) => {
                dispatch(setKeywords(e.target.value))
              }}
            ></CFormControl>
            <CButton color="light" onClick={(e) => searchData(e)}>
              <CIcon icon="cil-search" name="cil-search" />
            </CButton>
          </CInputGroup>
        </form>
      </div>
      <Pagination
        className="my-4 d-flex justify-content-center"
        count={data.maxPage}
        defaultPage={page}
        page={page}
        color="secondary"
        onChange={(e, val) => {
          window.scrollTo(0, 0)
          setPage(val)
        }}
      />
      {isPending ? (
        <Spinner />
      ) : isSearch && data.data.length === 0 ? (
        <div className="display-2 d-flex justify-content-center mt-3">Result not found</div>
      ) : (
        <>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
            columnAttrs={{
              className: 'should be overridden',
              'data-test': '',
              style: { '--test': 'test', color: 'black' },
            }}
            style={{ display: 'flex' }}
          >
            {data.data.map((post) => (
              <CareerBlock post={post} key={post._id} />
            ))}
          </Masonry>
          <Pagination
            className="my-4 d-flex justify-content-center"
            count={data.maxPage}
            defaultPage={page}
            page={page}
            color="secondary"
            onChange={(e, val) => {
              window.scrollTo(0, 0)
              setPage(val)
            }}
          />
        </>
      )}
    </>
  )
}

export default Recommendation
