import React from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CLink, CTooltip, CRow, CCol } from '@coreui/react'
import { DocsExample } from 'src/components'

const Tooltips = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Tooltip</strong> <small>Basic example</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">Hover over the links below to see tooltips:</p>
            <DocsExample href="components/tooltip">
              <p className="text-body-secondary">
                Tight pants next level keffiyeh
                <CTooltip content="Tooltip text">
                  <CLink> you probably </CLink>
                </CTooltip>
                haven&#39;theard of them. Photo booth beard raw denim letterpress vegan messenger
                bag stumptown. Farm-to-table seitan, mcsweeney&#39;s fixie sustainable quinoa 8-bit
                american apparel
                <CTooltip content="Tooltip text">
                  <CLink> have a </CLink>
                </CTooltip>
                terry richardson vinyl chambray. Beard stumptown, cardigans banh mi lomo
                thundercats. Tofu biodiesel williamsburg marfa, four loko mcsweeney&#39;&#39;s
                cleanse vegan chambray. A really ironic artisan
                <CTooltip content="Tooltip text">
                  <CLink> whatever keytar </CLink>
                </CTooltip>
                scenester farm-to-table banksy Austin
                <CTooltip content="Tooltip text">
                  <CLink> twitter handle </CLink>
                </CTooltip>
                freegan cred raw denim single-origin coffee viral.
              </p>
            </DocsExample>
            <p className="text-body-secondary small">
              Hover over the buttons below to see the four tooltips directions: top, right, bottom,
              and left. Directions are mirrored when using CoreUI in RTL.
            </p>
            <DocsExample href="components/tooltip">
              <CTooltip
                content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                placement="top"
              >
                <CButton color="secondary">Tooltip on top</CButton>
              </CTooltip>
              <CTooltip
                content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                placement="right"
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
                placement="left"
              >
                <CButton color="secondary">Tooltip on left</CButton>
              </CTooltip>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Tooltips
