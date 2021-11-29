import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardImage,
  CCardText,
  CCardTitle,
  CCol,
  CPlaceholder,
  CRow,
} from '@coreui/react'
import { DocsCallout, DocsExample } from 'src/components'

import ReactImg from 'src/assets/images/react.jpg'

const Placeholders = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <DocsCallout name="Placeholder" href="components/placeholder" />
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Placeholder</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              In the example below, we take a typical card component and recreate it with
              placeholders applied to create a &#34;loading card&#34;. Size and proportions are the
              same between the two.
            </p>
            <DocsExample href="components/placeholder">
              <div className="d-flex justify-content-around p-3">
                <CCard style={{ width: '18rem' }}>
                  <CCardImage orientation="top" src={ReactImg} />
                  <CCardBody>
                    <CCardTitle>Card title</CCardTitle>
                    <CCardText>
                      Some quick example text to build on the card title and make up the bulk of the
                      card&#39;s content.
                    </CCardText>
                    <CButton href="#">Go somewhere</CButton>
                  </CCardBody>
                </CCard>
                <CCard style={{ width: '18rem' }}>
                  <CCardImage
                    component="svg"
                    orientation="top"
                    width="100%"
                    height="162"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Placeholder"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                  >
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="#868e96"></rect>
                  </CCardImage>
                  <CCardBody>
                    <CPlaceholder component={CCardTitle} animation="glow" xs={7}>
                      <CPlaceholder xs={6} />
                    </CPlaceholder>
                    <CPlaceholder component={CCardText} animation="glow">
                      <CPlaceholder xs={7} />
                      <CPlaceholder xs={4} />
                      <CPlaceholder xs={4} />
                      <CPlaceholder xs={6} />
                      <CPlaceholder xs={8} />
                    </CPlaceholder>
                    <CPlaceholder
                      component={CButton}
                      disabled
                      href="#"
                      tabIndex={-1}
                      xs={6}
                    ></CPlaceholder>
                  </CCardBody>
                </CCard>
              </div>
            </DocsExample>
          </CCardBody>
        </CCard>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Placeholder</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Create placeholders with the <code>&lt;CPlaceholder&gt;</code> component and a grid
              column propx (e.g., <code>xs={6}</code>) to set the <code>width</code>. They can
              replace the text inside an element or be added as a modifier class to an existing
              component.
            </p>
            <DocsExample href="components/placeholder">
              <p aria-hidden="true">
                <CPlaceholder xs={6} />
              </p>
              <CPlaceholder
                component={CButton}
                aria-hidden="true"
                disabled
                href="#"
                tabIndex={-1}
                xs={4}
              ></CPlaceholder>
            </DocsExample>
          </CCardBody>
        </CCard>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Placeholder</strong> <small> Width</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              You can change the <code>width</code> through grid column classes, width utilities, or
              inline styles.
            </p>
            <DocsExample href="components/placeholder#width">
              <CPlaceholder xs={6} />
              <CPlaceholder className="w-75" />
              <CPlaceholder style={{ width: '30%' }} />
            </DocsExample>
          </CCardBody>
        </CCard>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Placeholder</strong> <small> Color</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              By default, the <code>&lt;CPlaceholder&gt;</code> uses <code>currentColor</code>. This
              can be overridden with a custom color or utility class.
            </p>
            <DocsExample href="components/placeholder#color">
              <CPlaceholder xs={12} />

              <CPlaceholder color="primary" xs={12} />
              <CPlaceholder color="secondary" xs={12} />
              <CPlaceholder color="success" xs={12} />
              <CPlaceholder color="danger" xs={12} />
              <CPlaceholder color="warning" xs={12} />
              <CPlaceholder color="info" xs={12} />
              <CPlaceholder color="light" xs={12} />
              <CPlaceholder color="dark" xs={12} />
            </DocsExample>
          </CCardBody>
        </CCard>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Placeholder</strong> <small> Sizing</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              The size of <code>&lt;CPlaceholder&gt;</code>s are based on the typographic style of
              the parent element. Customize them with <code>size</code> prop: <code>lg</code>,{' '}
              <code>sm</code>, or <code>xs</code>.
            </p>
            <DocsExample href="components/placeholder#sizing">
              <CPlaceholder xs={12} size="lg" />
              <CPlaceholder xs={12} />
              <CPlaceholder xs={12} size="sm" />
              <CPlaceholder xs={12} size="xs" />
            </DocsExample>
          </CCardBody>
        </CCard>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Placeholder</strong> <small> Animation</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Animate placeholders with <code>animation=&#34;glow&#34;</code> or{' '}
              <code>animation=&#34;wave&#34;</code> to better convey the perception of something
              being <em>actively</em> loaded.
            </p>
            <DocsExample href="components/placeholder#animation">
              <CPlaceholder component="p" animation="glow">
                <CPlaceholder xs={12} />
              </CPlaceholder>

              <CPlaceholder component="p" animation="wave">
                <CPlaceholder xs={12} />
              </CPlaceholder>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Placeholders
