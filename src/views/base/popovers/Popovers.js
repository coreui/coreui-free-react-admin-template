import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CLink,
  CPopover,
  CRow,
  CCol,
} from '@coreui/react-ts'
import { DocsLink } from 'src/reusable'

const Popovers = () => {
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
    <>
      <CCard className="mb-4">
        <CCardHeader>
          Popovers
          <DocsLink name="CPopover" />
        </CCardHeader>
        <CCardBody>
          {/*eslint-disable-next-line*/}

          <p className="text-muted">Hover over the links below to see popover:</p>

          <p className="muted">
            Tight pants next level keffiyeh
            <CPopover title="Popover header" content="Popover text">
              <CLink> you probably </CLink>
            </CPopover>
            haven't heard of them. Photo booth beard raw denim letterpress vegan messenger bag
            stumptown. Farm-to-table seitan, mcsweeney's fixie sustainable quinoa 8-bit american
            apparel
            <CPopover title="Popover header" content="Popover text">
              <CLink> have a </CLink>
            </CPopover>
            terry richardson vinyl chambray. Beard stumptown, cardigans banh mi lomo thundercats.
            Tofu biodiesel williamsburg marfa, four loko mcsweeney''s cleanse vegan chambray. A
            really ironic artisan
            <CPopover title="Popover header" content="Popover text">
              <CLink> whatever keytar </CLink>
            </CPopover>
            scenester farm-to-table banksy Austin
            <CPopover title="Popover header" content="Popover text">
              <CLink> twitter handle </CLink>
            </CPopover>
            freegan cred raw denim single-origin coffee viral.
          </p>
        </CCardBody>
      </CCard>

      <hr />

      <CCard className="mb-4">
        <CCardHeader>
          Popovers
          <small> placement</small>
        </CCardHeader>
        <CCardBody>
          <div className="my-3">
            <CRow>
              {placements.map((placement) => {
                return (
                  <CCol md="4" className="py-4 text-center" key={placement}>
                    <CPopover
                      title="Popover header"
                      content={`Popover with placement: ${placement}`}
                      placement={placement}
                      trigger="click"
                    >
                      <CButton color="primary">{placement}</CButton>
                    </CPopover>
                  </CCol>
                )
              })}
            </CRow>
          </div>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Popovers
