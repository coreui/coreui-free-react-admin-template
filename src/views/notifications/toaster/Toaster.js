import React, { useState } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CForm,
  CFormControl,
  CFormCheck,
  CFormSelect,
  CButton,
  CContainer,
  CRow,
  CCol,
  CFormLabel,
  CToast,
  CToaster,
} from '@coreui/react'
import { DocsLink } from 'src/reusable'

const Toaster = () => {
  const placements = [
    'top-start',
    'top-center',
    'top-end',
    'middle-start',
    'middle-center',
    'middle-end',
    'bottom-start',
    'bottom-center',
    'bottom-end',
  ]

  const [toasts, setToasts] = useState([
    { placement: 'static' },
    { placement: 'static' },
    { placement: 'top-end', autohide: 3000 },
  ])

  const [placement, setPlacement] = useState('top-end')
  const [autohide, setAutohide] = useState(true)
  const [autohideValue, setAutohideValue] = useState(5000)
  const [closeButton, setCloseButton] = useState(true)
  const [fade, setFade] = useState(true)

  const addToast = () => {
    setToasts([...toasts, { placement, autohide: autohide && autohideValue, closeButton, fade }])
  }

  const toasters = (() => {
    return toasts.reduce((toasters, toast) => {
      toasters[toast.placement] = toasters[toast.placement] || []
      toasters[toast.placement].push(toast)
      return toasters
    }, {})
  })()

  return (
    <CCard className="mb-4">
      <CCardHeader>
        Toasts.
        <DocsLink name="-Toast" />
      </CCardHeader>
      <CCardBody>
        <CContainer>
          <CRow>
            <CCol sm="12" lg="6">
              <CForm>
                <h5>Add toast with following props:</h5>

                <div variant="custom-checkbox" className="my-2 mt-4">
                  <CFormCheck
                    id="autohide"
                    checked={autohide}
                    onChange={(e) => {
                      setAutohide(e.target.checked)
                    }}
                    custom
                  />
                  <CFormLabel variant="custom-checkbox" htmlFor="autohide">
                    Autohide of the toast
                  </CFormLabel>
                </div>
                {autohide && (
                  <div className="my-2">
                    <CFormLabel htmlFor="ccyear">Time to autohide</CFormLabel>
                    <CFormControl
                      type="number"
                      value={autohideValue}
                      onChange={(e) => {
                        setAutohideValue(Number(e.target.value))
                      }}
                    />
                  </div>
                )}

                <div className="my-2">
                  <CFormLabel htmlFor="ccyear">Placement</CFormLabel>
                  <CFormSelect
                    className="form-control"
                    value={placement}
                    onChange={(e) => {
                      setPlacement(e.target.value)
                    }}
                  >
                    {placements.map((placement, i) => (
                      <option key={i}>{placement}</option>
                    ))}
                  </CFormSelect>
                </div>

                <div variant="custom-checkbox" className="my-2">
                  <CFormCheck
                    id="fade"
                    checked={fade}
                    onChange={(e) => {
                      setFade(e.target.checked)
                    }}
                    custom
                  />
                  <CFormLabel variant="custom-checkbox" htmlFor="fade">
                    fade
                  </CFormLabel>
                </div>

                <div variant="custom-checkbox" className="my-2">
                  <CFormCheck
                    id="close"
                    custom
                    checked={closeButton}
                    onChange={(e) => {
                      setCloseButton(e.target.checked)
                    }}
                  />
                  <CFormLabel variant="custom-checkbox" htmlFor="close">
                    closeButton
                  </CFormLabel>
                </div>

                <CButton className="me-1 w-25" color="success" onClick={addToast}>
                  Add toast
                </CButton>
              </CForm>
            </CCol>
            <CCol sm="12" lg="6">
              {Object.keys(toasters).map((toasterKey) => (
                <CToaster placement={toasterKey} key={'toaster' + toasterKey}>
                  {toasters[toasterKey].map((toast, key) => {
                    return (
                      <CToast
                        key={'toast' + key}
                        icon={
                          <svg
                            className="rounded me-2"
                            width="20"
                            height="20"
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="xMidYMid slice"
                            focusable="false"
                            role="img"
                          >
                            <rect width="100%" height="100%" fill="#007aff"></rect>
                          </svg>
                        }
                        title="CoreUI for React.js"
                        time="7 min ago"
                        autohide={toast.autohide}
                      >
                        {`Hello, ${toasterKey} world! This is a toast ${toasterKey} message.`}
                      </CToast>
                    )
                  })}
                </CToaster>
              ))}
            </CCol>
          </CRow>
        </CContainer>
      </CCardBody>
    </CCard>
  )
}

export default Toaster
