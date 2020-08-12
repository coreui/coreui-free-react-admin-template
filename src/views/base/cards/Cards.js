import React from 'react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow,
  CCollapse,
  CFade,
  CSwitch,
  CLink
} from  '@coreui/react'
import CIcon from '@coreui/icons-react'
import { DocsLink } from 'src/reusable'


const Cards = () => {
  const [collapsed, setCollapsed] = React.useState(true)
  const [showCard, setShowCard] = React.useState(true)

  return (
    <>
      <CRow>
        <CCol xs="12" sm="6" md="4">
          <CCard>
            <CCardHeader>
              Card title
              <DocsLink name="CCard"/>
            </CCardHeader>
            <CCardBody>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
              laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="6" md="4">
          <CCard>
            <CCardBody>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
              laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </CCardBody>
            <CCardFooter>Card footer</CCardFooter>
          </CCard>
        </CCol>
        <CCol xs="12" sm="6" md="4">
          <CCard>
            <CCardHeader>
              Card with icon
              <div className="card-header-actions">
                <CIcon name="cil-check" className="float-right"/>
              </div>
            </CCardHeader>
            <CCardBody>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
              laoreet dolore magna aliquam erat volutpat.Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="6" md="4">
          <CCard>
            <CCardHeader>
              Card with switch
              <div className="card-header-actions">
                <CSwitch className={'float-right mb-0'} color={'info'} defaultChecked size={'sm'} tabIndex="0" />
              </div>
            </CCardHeader>
            <CCardBody>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
              laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="6" md="4">
          <CCard>
            <CCardHeader>
              Card with label
              <div className="card-header-actions">
                <CBadge color="success" className="float-right">Success</CBadge>
              </div>
            </CCardHeader>
            <CCardBody>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
              laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="6" md="4">
          <CCard>
            <CCardHeader>
              Card with label
              <div className="card-header-actions">
                <CBadge shape="pill" color="danger" className="float-right">42</CBadge>
              </div>
            </CCardHeader>
            <CCardBody>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
              laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12" sm="6" md="4">
          <CCard borderColor="primary">
            <CCardHeader>
              Card outline primary
            </CCardHeader>
            <CCardBody>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
              laoreet dolore magna aliquam erat volutpat.Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="6" md="4">
          <CCard borderColor="secondary">
            <CCardHeader>
              Card outline secondary
            </CCardHeader>
            <CCardBody>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
              laoreet dolore magna aliquam erat volutpat.Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="6" md="4">
          <CCard borderColor="success">
            <CCardHeader>
              Card outline success
            </CCardHeader>
            <CCardBody>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
              laoreet dolore magna aliquam erat volutpat.Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="6" md="4">
          <CCard borderColor="info">
            <CCardHeader>
              Card outline info
            </CCardHeader>
            <CCardBody>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
              laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="6" md="4">
          <CCard borderColor="warning">
            <CCardHeader>
              Card outline warning
            </CCardHeader>
            <CCardBody>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
              laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="6" md="4">
          <CCard borderColor="danger">
            <CCardHeader>
              Card outline danger
            </CCardHeader>
            <CCardBody>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
              laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol xs="12" sm="6" md="4">
          <CCard accentColor="primary">
            <CCardHeader>
              Card with accent
            </CCardHeader>
            <CCardBody>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
              laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="6" md="4">
          <CCard accentColor="secondary">
            <CCardHeader>
              Card with accent
            </CCardHeader>
            <CCardBody>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
              laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="6" md="4">
          <CCard accentColor="success">
            <CCardHeader>
              Card with accent
            </CCardHeader>
            <CCardBody>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
              laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="6" md="4">
          <CCard accentColor="info">
            <CCardHeader>
              Card with accent
            </CCardHeader>
            <CCardBody>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
              laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="6" md="4">
          <CCard accentColor="warning">
            <CCardHeader>
              Card with accent
            </CCardHeader>
            <CCardBody>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
              laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="6" md="4">
          <CCard accentColor="danger">
            <CCardHeader>
              Card with accent
            </CCardHeader>
            <CCardBody>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
              laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12" sm="6" md="4">
          <CCard color="primary" className="text-white text-center">
            <CCardBody>
              <blockquote className="card-bodyquote">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                <footer>Someone famous in <cite title="Source Title">Source Title</cite></footer>
              </blockquote>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="6" md="4">
          <CCard color="success" className="text-white text-center">
            <CCardBody>
              <blockquote className="card-bodyquote">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                <footer>Someone famous in <cite title="Source Title">Source Title</cite></footer>
              </blockquote>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="6" md="4">
          <CCard color="info" className="text-white text-center">
            <CCardBody>
              <blockquote className="card-bodyquote">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                <footer>Someone famous in <cite title="Source Title">Source Title</cite></footer>
              </blockquote>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="6" md="4">
          <CCard color="warning" className="text-white text-center">
            <CCardBody>
              <blockquote className="card-bodyquote">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                <footer>Someone famous in <cite title="Source Title">Source Title</cite></footer>
              </blockquote>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="6" md="4">
          <CCard color="danger" className="text-white text-center">
            <CCardBody>
              <blockquote className="card-bodyquote">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                <footer>Someone famous in <cite title="Source Title">Source Title</cite></footer>
              </blockquote>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="6" md="4">
          <CCard color="primary" className="text-white text-center">
            <CCardBody>
              <blockquote className="card-bodyquote">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                <footer>Someone famous in <cite title="Source Title">Source Title</cite></footer>
              </blockquote>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12" sm="6" md="4">
          <CCard color="primary" className="text-white">
            <CCardHeader>
              Card title
            </CCardHeader>
            <CCardBody>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
              laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="6" md="4">
          <CCard color="success" className="text-white">
            <CCardHeader>
              Card title
            </CCardHeader>
            <CCardBody>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
              laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="6" md="4">
          <CCard color="info" className="text-white">
            <CCardHeader>
              Card title
            </CCardHeader>
            <CCardBody>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
              laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="6" md="4">
          <CCard color="warning" className="text-white">
            <CCardHeader>
              Card title
            </CCardHeader>
            <CCardBody>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
              laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="6" md="4">
          <CCard color="gradient-secondary">
            <CCardHeader>
              Card title - gradient
            </CCardHeader>
            <CCardBody>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
              laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="6" md="4">
          <CFade in={showCard}>
            <CCard>
              <CCardHeader>
                Card actions
                <div className="card-header-actions">
                  <CLink className="card-header-action">
                    <CIcon name="cil-settings" />
                  </CLink>
                  <CLink className="card-header-action" onClick={() => setCollapsed(!collapsed)}>
                    <CIcon name={collapsed ? 'cil-chevron-bottom':'cil-chevron-top'} />
                  </CLink>
                  <CLink className="card-header-action" onClick={() => setShowCard(false)}>
                    <CIcon name="cil-x-circle" />
                  </CLink>
                </div>
              </CCardHeader>
              <CCollapse show={collapsed}>
                <CCardBody>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                  laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                  ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                </CCardBody>
              </CCollapse>
            </CCard>
          </CFade>
        </CCol>
      </CRow>
    </>
  )
}

export default Cards
