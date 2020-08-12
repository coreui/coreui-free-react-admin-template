import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CTooltip,
  CRow,
  CCol,
  CLink
} from '@coreui/react'
import { DocsLink } from 'src/reusable'

const Tooltips = () => {
  const placements = [
    'top-start', 'top', 'top-end',
    'bottom-start', 'bottom', 'bottom-end',
    'right-start', 'right', 'right-end',
    'left-start', 'left', 'left-end'
  ]

  return (
    <>
      <CCard>
        <CCardHeader>
          Tooltips
          <DocsLink name="CTooltip"/>
        </CCardHeader>
        <CCardBody>
          {/*eslint-disable-next-line*/}

          <p className="text-muted">
            Hover over the links below to see tooltips:
          </p>

          <p className="muted">
            Tight pants next level keffiyeh
            <CTooltip content="Tooltip text">
              <CLink> you probably </CLink>
            </CTooltip>
              haven't heard of them.
            Photo booth beard raw denim letterpress vegan messenger
            bag stumptown. Farm-to-table seitan, mcsweeney's fixie
            sustainable quinoa 8-bit american apparel
            <CTooltip content="Tooltip text">
              <CLink> have a </CLink>
            </CTooltip>
            terry richardson vinyl chambray. Beard stumptown,
            cardigans banh mi lomo thundercats. Tofu biodiesel
            williamsburg marfa, four loko mcsweeney''s cleanse
            vegan chambray. A really ironic artisan
            <CTooltip content="Tooltip text">
              <CLink> whatever keytar </CLink>
            </CTooltip>
            scenester farm-to-table banksy Austin
            <CTooltip content="Tooltip text">
              <CLink> twitter handle </CLink>
            </CTooltip>

            freegan cred raw denim single-origin coffee viral.
          </p>
        </CCardBody>
      </CCard>

      <hr/>

      <CCard>
        <CCardHeader>
          Tooltips
          <small> placement</small>
        </CCardHeader>
        <CCardBody>
          <div className="my-3">
            <CRow>
              {placements.map(placement => {
                return (<CCol
                  md="4"
                  className="py-4 text-center"
                  key={placement}
                >
                  <CTooltip
                    content={`Tooltip with placement: ${placement}`}
                    placement={placement}
                  >
                    <CButton color="primary">
                      { placement }
                    </CButton>
                  </CTooltip>
                </CCol>)
              })}
            </CRow>
          </div>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Tooltips;
