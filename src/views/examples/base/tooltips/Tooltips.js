import React from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CLink, CTooltip, CRow, CCol } from '@coreui/react'
import { Example } from 'src/reusable'

const Tooltips = () => {
  const placements = [
    'top-start',
    'top',
    'top-end',
    'bottom-start',
    'bottom',
    'bottom-end',
    'right-start',
    'right',
    'right-end',
    'left-start',
    'left',
    'left-end',
  ]

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Tooltip</strong> <small>Basic example</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Hover over the links below to see tooltips:
            </p>
            <Example href="https://coreui.io/react/docs/4.0/components/tooltip">
              <p className="text-medium-emphasis">
                Tight pants next level keffiyeh
                <CTooltip content="Tooltip text">
                  <CLink> you probably </CLink>
                </CTooltip>
                haven't heard of them. Photo booth beard raw denim letterpress vegan messenger bag
                stumptown. Farm-to-table seitan, mcsweeney's fixie sustainable quinoa 8-bit american
                apparel
                <CTooltip content="Tooltip text">
                  <CLink> have a </CLink>
                </CTooltip>
                terry richardson vinyl chambray. Beard stumptown, cardigans banh mi lomo
                thundercats. Tofu biodiesel williamsburg marfa, four loko mcsweeney''s cleanse vegan
                chambray. A really ironic artisan
                <CTooltip content="Tooltip text">
                  <CLink> whatever keytar </CLink>
                </CTooltip>
                scenester farm-to-table banksy Austin
                <CTooltip content="Tooltip text">
                  <CLink> twitter handle </CLink>
                </CTooltip>
                freegan cred raw denim single-origin coffee viral.
              </p>
            </Example>
            <p className="text-medium-emphasis small">
              Hover over the buttons below to see the four tooltips directions: top, right, bottom,
              and left. Directions are mirrored when using CoreUI in RTL.
            </p>
            <Example href="https://coreui.io/react/docs/4.0/components/tooltip">
              <CTooltip
                content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                placement="top"
              >
                <CButton color="secondary">Tooltip on top</CButton>
              </CTooltip>
              <CTooltip
                content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                placement="end"
              >
                <CButton color="secondary">Tooltip on right</CButton>
              </CTooltip>
              <CTooltip
                content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                placement="bottom"
              >
                <CButton color="secondary">Tooltip on bottom</CButton>
              </CTooltip>
              <CTooltip
                content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                placement="start"
              >
                <CButton color="secondary">Tooltip on left</CButton>
              </CTooltip>
            </Example>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Tooltips
