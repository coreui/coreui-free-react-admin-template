import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CJumbotron,
  CRow,
  CEmbed,
  CEmbedItem
} from '@coreui/react'
import { DocsLink } from 'src/reusable'

const Jumbotrons = () => {

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Jumbotron
              <DocsLink name="CJumbotron"/>
            </CCardHeader>
            <CCardBody>
              <CJumbotron className="border">
                <h1 className="display-3">Hello, world!</h1>
                <p className="lead">This is a simple hero unit, a simple Jumbotron - style component for calling extra
                  attention to featured content or information.</p>
                <hr className="my-2" />
                <p>It uses utility classes for typgraphy and spacing to space content out within the larger container.</p>
                <p className="lead">
                  <CButton color="primary" size="lg">Learn More</CButton>
                </p>
              </CJumbotron>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol>
          <CCard>
            <CCardHeader>
              Jumbotron
              <small> fluid</small>
            </CCardHeader>
            <CCardBody>
              <CJumbotron fluid>
                <CContainer fluid>
                  <h1 className="display-3">Fluid jumbotron</h1>
                  <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
                </CContainer>
              </CJumbotron>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Embed
            </CCardHeader>
            <CCardBody>
              <CEmbed>
                <CEmbedItem src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"/>
              </CEmbed>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Jumbotrons
