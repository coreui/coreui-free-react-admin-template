import React from 'react'
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CRow,
} from '@coreui/react'
import { DocsComponents, DocsExample } from 'src/components'

const Dropdowns = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <DocsComponents href="components/dropdown/" />
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Dropdown</strong> <small>Single button</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Here&#39;s how you can put them to work with either <code>&lt;button&gt;</code>{' '}
              elements:
            </p>
            <DocsExample href="components/dropdown#single-button">
              <CDropdown>
                <CDropdownToggle color="secondary">Dropdown button</CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem href="#">Action</CDropdownItem>
                  <CDropdownItem href="#">Another action</CDropdownItem>
                  <CDropdownItem href="#">Something else here</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </DocsExample>
            <p className="text-body-secondary small">
              The best part is you can do this with any button variant, too:
            </p>
            <DocsExample href="components/dropdown#single-button">
              <>
                {['primary', 'secondary', 'success', 'info', 'warning', 'danger'].map(
                  (color, index) => (
                    <CDropdown variant="btn-group" key={index}>
                      <CDropdownToggle color={color}>{color}</CDropdownToggle>
                      <CDropdownMenu>
                        <CDropdownItem href="#">Action</CDropdownItem>
                        <CDropdownItem href="#">Another action</CDropdownItem>
                        <CDropdownItem href="#">Something else here</CDropdownItem>
                        <CDropdownDivider />
                        <CDropdownItem href="#">Separated link</CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
                  ),
                )}
              </>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Dropdown</strong> <small>Split button</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Similarly, create split button dropdowns with virtually the same markup as single
              button dropdowns, but with the addition of boolean prop <code>split</code> for proper
              spacing around the dropdown caret.
            </p>
            <p className="text-body-secondary small">
              We use this extra class to reduce the horizontal <code>padding</code> on either side
              of the caret by 25% and remove the <code>margin-left</code> that&#39;s attached for
              normal button dropdowns. Those additional changes hold the caret centered in the split
              button and implement a more properly sized hit area next to the main button.
            </p>
            <DocsExample href="components/dropdown#split-button">
              <>
                {['primary', 'secondary', 'success', 'info', 'warning', 'danger'].map(
                  (color, index) => (
                    <CDropdown variant="btn-group" key={index}>
                      <CButton color={color}>{color}</CButton>
                      <CDropdownToggle color={color} split />
                      <CDropdownMenu>
                        <CDropdownItem href="#">Action</CDropdownItem>
                        <CDropdownItem href="#">Another action</CDropdownItem>
                        <CDropdownItem href="#">Something else here</CDropdownItem>
                        <CDropdownDivider />
                        <CDropdownItem href="#">Separated link</CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
                  ),
                )}
              </>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Dropdown</strong> <small>Sizing</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Button dropdowns work with buttons of all sizes, including default and split dropdown
              buttons.
            </p>
            <DocsExample href="components/dropdown#sizing">
              <CDropdown variant="btn-group">
                <CDropdownToggle color="secondary" size="lg">
                  Large button
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem href="#">Action</CDropdownItem>
                  <CDropdownItem href="#">Another action</CDropdownItem>
                  <CDropdownItem href="#">Something else here</CDropdownItem>
                  <CDropdownDivider />
                  <CDropdownItem href="#">Separated link</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
              <CDropdown variant="btn-group">
                <CButton color="secondary" size="lg">
                  Large split button
                </CButton>
                <CDropdownToggle color="secondary" size="lg" split />
                <CDropdownMenu>
                  <CDropdownItem href="#">Action</CDropdownItem>
                  <CDropdownItem href="#">Another action</CDropdownItem>
                  <CDropdownItem href="#">Something else here</CDropdownItem>
                  <CDropdownDivider />
                  <CDropdownItem href="#">Separated link</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </DocsExample>
            <DocsExample href="components/dropdown#sizing">
              <CDropdown variant="btn-group">
                <CDropdownToggle color="secondary" size="sm">
                  Small button
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem href="#">Action</CDropdownItem>
                  <CDropdownItem href="#">Another action</CDropdownItem>
                  <CDropdownItem href="#">Something else here</CDropdownItem>
                  <CDropdownDivider />
                  <CDropdownItem href="#">Separated link</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
              <CDropdown variant="btn-group">
                <CButton color="secondary" size="sm">
                  Small split button
                </CButton>
                <CDropdownToggle color="secondary" size="sm" split />
                <CDropdownMenu>
                  <CDropdownItem href="#">Action</CDropdownItem>
                  <CDropdownItem href="#">Another action</CDropdownItem>
                  <CDropdownItem href="#">Something else here</CDropdownItem>
                  <CDropdownDivider />
                  <CDropdownItem href="#">Separated link</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Dropdown</strong> <small>Single button</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Opt into darker dropdowns to match a dark navbar or custom style by set{' '}
              <code>dark</code> property. No changes are required to the dropdown items.
            </p>
            <DocsExample href="components/dropdown#dark-dropdowns">
              <CDropdown dark>
                <CDropdownToggle color="secondary">Dropdown button</CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem href="#">Action</CDropdownItem>
                  <CDropdownItem href="#">Another action</CDropdownItem>
                  <CDropdownItem href="#">Something else here</CDropdownItem>
                  <CDropdownDivider />
                  <CDropdownItem href="#">Separated link</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </DocsExample>
            <p className="text-body-secondary small">And putting it to use in a navbar:</p>
            <DocsExample href="components/dropdown#dark-dropdowns">
              <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                  <a className="navbar-brand" href="https://coreui.io/react/">
                    Navbar
                  </a>
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-coreui-toggle="collapse"
                    data-coreui-target="#navbarNavDarkDropdown"
                    aria-controls="navbarNavDarkDropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
                    <ul className="navbar-nav">
                      <CDropdown dark as="li" variant="nav-item">
                        <CDropdownToggle>Dropdown</CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem href="#">Action</CDropdownItem>
                          <CDropdownItem href="#">Another action</CDropdownItem>
                          <CDropdownItem href="#">Something else here</CDropdownItem>
                          <CDropdownDivider />
                          <CDropdownItem href="#">Separated link</CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                    </ul>
                  </div>
                </div>
              </nav>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Dropdown</strong> <small>Dropup</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Trigger dropdown menus above elements by adding{' '}
              <code>direction=&#34;dropup&#34;</code> to the <code>&lt;CDropdown&gt;</code>{' '}
              component.
            </p>
            <DocsExample href="components/dropdown#dropup">
              <CDropdown variant="btn-group" direction="dropup">
                <CDropdownToggle color="secondary">Dropdown</CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem href="#">Action</CDropdownItem>
                  <CDropdownItem href="#">Another action</CDropdownItem>
                  <CDropdownItem href="#">Something else here</CDropdownItem>
                  <CDropdownDivider />
                  <CDropdownItem href="#">Separated link</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
              <CDropdown variant="btn-group" direction="dropup">
                <CButton color="secondary">Small split button</CButton>
                <CDropdownToggle color="secondary" split />
                <CDropdownMenu>
                  <CDropdownItem href="#">Action</CDropdownItem>
                  <CDropdownItem href="#">Another action</CDropdownItem>
                  <CDropdownItem href="#">Something else here</CDropdownItem>
                  <CDropdownDivider />
                  <CDropdownItem href="#">Separated link</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Dropdown</strong> <small>Dropright</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Trigger dropdown menus at the right of the elements by adding{' '}
              <code>direction=&#34;dropend&#34;</code> to the <code>&lt;CDropdown&gt;</code>{' '}
              component.
            </p>
            <DocsExample href="components/dropdown#dropright">
              <CDropdown variant="btn-group" direction="dropend">
                <CDropdownToggle color="secondary">Dropdown</CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem href="#">Action</CDropdownItem>
                  <CDropdownItem href="#">Another action</CDropdownItem>
                  <CDropdownItem href="#">Something else here</CDropdownItem>
                  <CDropdownDivider />
                  <CDropdownItem href="#">Separated link</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
              <CDropdown variant="btn-group" direction="dropend">
                <CButton color="secondary">Small split button</CButton>
                <CDropdownToggle color="secondary" split />
                <CDropdownMenu>
                  <CDropdownItem href="#">Action</CDropdownItem>
                  <CDropdownItem href="#">Another action</CDropdownItem>
                  <CDropdownItem href="#">Something else here</CDropdownItem>
                  <CDropdownDivider />
                  <CDropdownItem href="#">Separated link</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Dropdown</strong> <small>Dropleft</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Trigger dropdown menus at the left of the elements by adding{' '}
              <code>direction=&#34;dropstart&#34;</code> to the <code>&lt;CDropdown&gt;</code>{' '}
              component.
            </p>
            <DocsExample href="components/dropdown#dropleft">
              <CButtonGroup>
                <CDropdown variant="btn-group" direction="dropstart">
                  <CDropdownToggle color="secondary" split />
                  <CDropdownMenu>
                    <CDropdownItem href="#">Action</CDropdownItem>
                    <CDropdownItem href="#">Another action</CDropdownItem>
                    <CDropdownItem href="#">Something else here</CDropdownItem>
                    <CDropdownDivider />
                    <CDropdownItem href="#">Separated link</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
                <CButton color="secondary">Small split button</CButton>
              </CButtonGroup>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Dropdowns
