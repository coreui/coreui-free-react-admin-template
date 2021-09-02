import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { selectCareer, setKeywords, clearKeywords } from '../career/index'
import CareerBlock from '../career/CareerBlock'
import Masonry from 'react-masonry-css'

const Recommendation = () => {
  const [data, setData] = useState([])
  const dispatch = useDispatch()
  const { keywords } = useSelector(selectCareer)
  const [isPending, setIsPending] = useState()
  const [isSearch, setIsSearch] = useState(false)
  const breakpointColumnsObj = {
    default: 2,
    1100: 2,
    700: 1,
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
        console.log('data:', res.data)
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
      .get('/api/recommendation')
      .then((res) => {
        console.log('this is posts:', res.data)
        if (res.data.length !== 0) {
          setData(res.data)
          setIsPending(false)
        }
      })
      .catch((err) => {
        err.response.data.description && alert('錯誤\n' + err.response.data.description)
      })
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="d-flex flex-column justify-content-center">
          <button
            className="btn btn-warning ml-3"
            onClick={() => {
              clearKeywords()
              getData()
            }}
          >
            All
          </button>
        </div>
        <form
          className="d-flex justify-content-between text-light py-2 my-2"
          onSubmit={(e) => searchData(e)}
          action={(e) => searchData(e)}
        >
          <div className="d-flex flex-column bg-dark rounded-3 py-3 align-self-center">
            <div className="row">
              <label forhtml="keywords" className="d-flex">
                &ensp;Key words&#40;split with space&#41;:
              </label>
            </div>
            <div className="row justify-content-around d-flex">
              <div className=" col-8 mt-2">
                <input
                  type="text"
                  name="keywords"
                  placeholder={keywords === '' ? 'search for...' : keywords}
                  className="rounded-3"
                  value={keywords}
                  onChange={(e) => dispatch(setKeywords(e.target.value))}
                ></input>
              </div>
              <div className="col-3 align-items-center d-flex">
                <button
                  type="button"
                  onClick={(e) => searchData(e)}
                  className="btn btn-primary d-flex mt-1"
                >
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </div>
          </div>
        </form>
        <div className="d-flex"></div>
      </div>
      {isPending ? (
        <div className="spinner-border text-primary mt-3" role="status">
          <span className="sr-only"></span>
        </div>
      ) : isSearch && data.length === 0 ? (
        <div className="display-2 d-flex justify-content-center mt-3">Result not found</div>
      ) : (
        data.length !== 0 && (
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
            {data.map((post) => (
              <CareerBlock post={post} key={post._id} />
            ))}
          </Masonry>
        )
      )}
    </>
  )
}

export default Recommendation
