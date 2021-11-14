import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CFormLabel, CFormRange, CRow } from '@coreui/react'
import { DocsCallout, DocsExample } from 'src/components'

const Range = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <DocsCallout name="Range" href="forms/range" />
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Range</strong> <small></small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Create custom <code>&lt;input type=&#34;range&#34;&gt;</code> controls with{' '}
              <code>&lt;CFormRange&gt;</code>.
            </p>
            <DocsExample href="forms/range">
              <CFormLabel htmlFor="customRange1">Example range</CFormLabel>
              <CFormRange id="customRange1" />
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Range</strong> <small>Disabled</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Add the <code>disabled</code> boolean attribute on an input to give it a grayed out
              appearance and remove pointer events.
            </p>
            <DocsExample href="forms/range#disabled">
              <CFormLabel htmlFor="disabledRange">Disabled range</CFormLabel>
              <CFormRange id="disabledRange" disabled />
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Range</strong> <small>Min and max</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Range inputs have implicit values for <code>min</code> and <code>max</code>—
              <code>0</code> and <code>100</code>, respectively. You may specify new values for
              those using the <code>min</code> and <code>max</code> attributes.
            </p>
            <DocsExample href="forms/range#min-and-max">
              <CFormLabel htmlFor="customRange2">Example range</CFormLabel>
              <CFormRange min="0" max="5" defaultValue="3" id="customRange2" />
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Range</strong> <small>Steps</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              By default, range inputs &#34;snap&#34; to integer values. To change this, you can
              specify a <code>step</code> value. In the example below, we double the number of steps
              by using <code>step=&#34;0.5&#34;</code>.
            </p>
            <DocsExample href="forms/range#steps">
              <CFormLabel htmlFor="customRange3">Example range</CFormLabel>
              <CFormRange min="0" max="5" step="0.5" defaultValue="3" id="customRange3" />
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Range
