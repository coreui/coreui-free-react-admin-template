import React, { lazy, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import {
  CContainer,
  CRow,
  CCol,
  CImage,
  CCarousel,
  CCarouselItem,
  CCarouselCaption,
  CCard,
  CCardHeader,
  CCardBody,
  CCardImage,
  CCardTitle,
} from '@coreui/react'
import logo from '../../assets/images/logo_row.png'
import axios from 'axios'

const perRecruitment = 4
const perRecommendation = 4

const Dashboard = () => {
  const [recentColumns, setRecentColumns] = useState([])
  const [recentRecruitments, setRecentRecruitments] = useState([])
  const [recentRecommendations, setRecentRecommendations] = useState([])

  const getRecentColumns = () => {
    axios
      .get('api/column/recent')
      .then((res) => {
        console.log(res)
        setRecentColumns(res.data.data)
      })
      .catch((err) => console.log(err))
  }

  const getRecentRecruitments = () => {
    axios
      .get('api/recruitment/recent', { params: { number: perRecruitment } })
      .then((res) => {
        console.log(res)
        setRecentRecruitments(res.data.data)
      })
      .catch((err) => console.log(err))
  }

  const getRecentRecommendations = () => {
    axios
      .get('api/recommendation/recent', { params: { number: perRecommendation } })
      .then((res) => {
        console.log(res)
        setRecentRecommendations(res.data.data)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getRecentColumns()
    getRecentRecruitments()
    getRecentRecommendations()
  }, [])

  return (
    <CContainer fluid className="align-items-center text-color-black">
      <CRow className="justify-content-center mb-3">
        <CCard>
          <CCardHeader>
            <h1>Recent Interviews</h1>
          </CCardHeader>
          <CCardBody>
            <CCarousel controls indicators transition="crossfade">
              {recentColumns.map((column) => {
                return (
                  <CCarouselItem>
                    <Link to={`/columnSummary/${column.id}`}>
                      <CImage className="d-block w-100" fluid src={column.imgSrc} alt={column.id} />
                      <CCarouselCaption className="d-none d-md-block w-100">
                        {column.title.map((title) => {
                          return <h1>{title}</h1>
                        })}
                        <CRow>
                          <CCol>
                            <ul className="recent-ul list-unstyled">
                              {column.edu.map((edu) => {
                                return <li className="text-start">{edu}</li>
                              })}
                            </ul>
                          </CCol>
                          <CCol>
                            <ul className="recent-ul list-unstyled">
                              {column.exp.map((exp) => {
                                return <li className="text-start">{exp}</li>
                              })}
                            </ul>
                          </CCol>
                        </CRow>
                      </CCarouselCaption>
                    </Link>
                  </CCarouselItem>
                )
              })}
            </CCarousel>
          </CCardBody>
        </CCard>
      </CRow>
      <CRow className="mb-3">
        <CCard>
          <CCardHeader>
            <h1>Recent Recruitment</h1>
          </CCardHeader>
          <CCardBody>
            <CRow>
              {recentRecruitments.map((recruitment) => {
                return (
                  <CCol className="col-6">
                    <Link to="/recruitment">
                      <CCard className="m-2" style={{ borderRadius: '10px' }}>
                        <CCardImage src={recruitment.image === '' ? logo : recruitment.image} />
                        <CCardBody>
                          <CCardTitle className="text-center">
                            <h2>{recruitment.title.title}</h2>
                          </CCardTitle>
                        </CCardBody>
                      </CCard>
                    </Link>
                  </CCol>
                )
              })}
            </CRow>
          </CCardBody>
        </CCard>
      </CRow>
      <CRow className="mb-3">
        <CCard>
          <CCardHeader>
            <h1>Recent Job Hunting</h1>
          </CCardHeader>
          <CCardBody>
            <CRow>
              {recentRecommendations.map((recommendation) => {
                return (
                  <CCol className="col-6">
                    <Link to="/recommendation">
                      <CCard className="m-2" style={{ borderRadius: '10px' }}>
                        <CCardImage
                          src={recommendation.image === '' ? logo : recommendation.image}
                        />
                        <CCardBody>
                          <CCardTitle className="text-center">
                            <h2>{recommendation.title.title}</h2>
                          </CCardTitle>
                        </CCardBody>
                      </CCard>
                    </Link>
                  </CCol>
                )
              })}
            </CRow>
          </CCardBody>
        </CCard>
      </CRow>
    </CContainer>
  )
}

export default Dashboard
