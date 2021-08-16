import React from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell } from '@coreui/icons'
import { DocsCallout, DocsExample } from 'src/components'

const Buttons = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <DocsCallout name="Button" href="components/buttons" />
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Button</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              CoreUI includes a bunch of predefined buttons components, each serving its own
              semantic purpose. Buttons show what action will happen when the user clicks or touches
              it. CoreUI buttons are used to initialize operations, both in the background or
              foreground of an experience.
            </p>
            <DocsExample href="components/buttons">
              {['normal', 'active', 'disabled'].map((state, index) => (
                <CRow className="align-items-center mb-3" key={index}>
                  <CCol xs={12} xl={2} className="mb-3 mb-xl-0">
                    {state.charAt(0).toUpperCase() + state.slice(1)}
                  </CCol>
                  <CCol xs>
                    {[
                      'primary',
                      'secondary',
                      'success',
                      'danger',
                      'warning',
                      'info',
                      'light',
                      'dark',
                    ].map((color, index) => (
                      <CButton
                        color={color}
                        key={index}
                        active={state === 'active'}
                        disabled={state === 'disabled'}
                      >
                        {color.charAt(0).toUpperCase() + color.slice(1)}
                      </CButton>
                    ))}
                    <CButton color="link">Link</CButton>
                  </CCol>
                </CRow>
              ))}
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Button</strong> <small>with icons</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              You can combine button with our <a href="https://icons.coreui.io/">CoreUI Icons</a>.
            </p>
            <DocsExample href="components/buttons">
              {['normal', 'active', 'disabled'].map((state, index) => (
                <CRow className="align-items-center mb-3" key={index}>
                  <CCol xs={12} xl={2} className="mb-3 mb-xl-0">
                    {state.charAt(0).toUpperCase() + state.slice(1)}
                  </CCol>
                  <CCol xs>
                    {[
                      'primary',
                      'secondary',
                      'success',
                      'danger',
                      'warning',
                      'info',
                      'light',
                      'dark',
                    ].map((color, index) => (
                      <CButton
                        color={color}
                        key={index}
                        active={state === 'active'}
                        disabled={state === 'disabled'}
                      >
                        <CIcon icon={cilBell} className="me-2" />
                        {color.charAt(0).toUpperCase() + color.slice(1)}
                      </CButton>
                    ))}
                    <CButton color="link">
                      <CIcon icon={cilBell} className="me-2" />
                      Link
                    </CButton>
                  </CCol>
                </CRow>
              ))}
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Button</strong> <small>Button components</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              The <code>&lt;CButton&gt;</code> component are designed for{' '}
              <code>&lt;button&gt;</code> , <code>&lt;a&gt;</code> or <code>&lt;input&gt;</code>{' '}
              elements (though some browsers may apply a slightly different rendering).
            </p>
            <p className="text-medium-emphasis small">
              If you&#39;re using <code>&lt;CButton&gt;</code> component as <code>&lt;a&gt;</code>{' '}
              elements that are used to trigger functionality ex. collapsing content, these links
              should be given a <code>role=&#34;button&#34;</code> to adequately communicate their
              meaning to assistive technologies such as screen readers.
            </p>
            <DocsExample href="components/buttons#button-components">
              <CButton component="a" color="primary" href="#" role="button">
                Link
              </CButton>
              <CButton type="submit" color="primary">
                Button
              </CButton>
              <CButton component="input" type="button" color="primary" value="Input" />
              <CButton component="input" type="submit" color="primary" value="Submit" />
              <CButton component="input" type="reset" color="primary" value="Reset" />
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Button</strong> <small>outline</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              If you need a button, but without the strong background colors. Set{' '}
              <code>variant=&#34;outline&#34;</code> prop to remove all background colors.
            </p>
            <DocsExample href="components/buttons#outline-buttons">
              {['normal', 'active', 'disabled'].map((state, index) => (
                <CRow className="align-items-center mb-3" key={index}>
                  <CCol xs={12} xl={2} className="mb-3 mb-xl-0">
                    {state.charAt(0).toUpperCase() + state.slice(1)}
                  </CCol>
                  <CCol xs>
                    {[
                      'primary',
                      'secondary',
                      'success',
                      'danger',
                      'warning',
                      'info',
                      'light',
                      'dark',
                    ].map((color, index) => (
                      <CButton
                        color={color}
                        variant="outline"
                        key={index}
                        active={state === 'active'}
                        disabled={state === 'disabled'}
                      >
                        {color.charAt(0).toUpperCase() + color.slice(1)}
                      </CButton>
                    ))}
                  </CCol>
                </CRow>
              ))}
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Button</strong> <small>ghost</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              If you need a ghost variant of button, set <code>variant=&#34;ghost&#34;</code> prop
              to remove all background colors.
            </p>
            <DocsExample href="components/buttons#ghost-buttons">
              {['normal', 'active', 'disabled'].map((state, index) => (
                <CRow className="align-items-center mb-3" key={index}>
                  <CCol xs={12} xl={2} className="mb-3 mb-xl-0">
                    {state.charAt(0).toUpperCase() + state.slice(1)}
                  </CCol>
                  <CCol xs>
                    {[
                      'primary',
                      'secondary',
                      'success',
                      'danger',
                      'warning',
                      'info',
                      'light',
                      'dark',
                    ].map((color, index) => (
                      <CButton
                        color={color}
                        variant="ghost"
                        key={index}
                        active={state === 'active'}
                        disabled={state === 'disabled'}
                      >
                        {color.charAt(0).toUpperCase() + color.slice(1)}
                      </CButton>
                    ))}
                  </CCol>
                </CRow>
              ))}
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Button</strong> <small>Sizes</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Larger or smaller buttons? Add <code>size=&#34;lg&#34;</code> or{' '}
              <code>size=&#34;sm&#34;</code> for additional sizes.
            </p>
            <DocsExample href="components/buttons#sizes">
              <CButton color="primary" size="lg">
                Large button
              </CButton>
              <CButton color="secondary" size="lg">
                Large button
              </CButton>
            </DocsExample>
            <DocsExample href="components/buttons#sizes">
              <CButton color="primary" size="sm">
                Small button
              </CButton>
              <CButton color="secondary" size="sm">
                Small button
              </CButton>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Button</strong> <small>Pill</small>
          </CCardHeader>
          <CCardBody>
            <DocsExample href="components/buttons#pill-buttons">
              {[
                'primary',
                'secondary',
                'success',
                'danger',
                'warning',
                'info',
                'light',
                'dark',
              ].map((color, index) => (
                <CButton color={color} shape="rounded-pill" key={index}>
                  {color.charAt(0).toUpperCase() + color.slice(1)}
                </CButton>
              ))}
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Button</strong> <small>Square</small>
          </CCardHeader>
          <CCardBody>
            <DocsExample href="components/buttons#square">
              {[
                'primary',
                'secondary',
                'success',
                'danger',
                'warning',
                'info',
                'light',
                'dark',
              ].map((color, index) => (
                <CButton color={color} shape="rounded-0" key={index}>
                  {color.charAt(0).toUpperCase() + color.slice(1)}
                </CButton>
              ))}
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Button</strong> <small>Disabled state</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Add the <code>disabled</code> boolean prop to any <code>&lt;CButton&gt;</code>{' '}
              component to make buttons look inactive. Disabled button has{' '}
              <code>pointer-events: none</code> applied to, disabling hover and active states from
              triggering.
            </p>
            <DocsExample href="components/buttons#disabled-state">
              <CButton color="primary" size="lg" disabled>
                Primary button
              </CButton>
              <CButton color="secondary" size="lg" disabled>
                Button
              </CButton>
            </DocsExample>
            <p className="text-medium-emphasis small">
              Disabled buttons using the <code>&lt;a&gt;</code> component act a little different:
            </p>
            <p className="text-medium-emphasis small">
              <code>&lt;a&gt;</code>s don&#39;tsupport the <code>disabled</code> attribute, so
              CoreUI has to add <code>.disabled</code> className to make buttons look inactive.
              CoreUI also has to add to the disabled button component{' '}
              <code>aria-disabled=&#34;true&#34;</code> attribute to show the state of the component
              to assistive technologies.
            </p>
            <DocsExample href="components/buttons#disabled-state">
              <CButton component="a" href="#" color="primary" size="lg" disabled>
                Primary link
              </CButton>
              <CButton component="a" href="#" color="secondary" size="lg" disabled>
                Link
              </CButton>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Button</strong> <small>Block buttons</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Create buttons that span the full width of a parent—by using utilities.
            </p>
            <DocsExample href="components/buttons#block-buttons">
              <div className="d-grid gap-2">
                <CButton color="primary">Button</CButton>
                <CButton color="primary">Button</CButton>
              </div>
            </DocsExample>
            <p className="text-medium-emphasis small">
              Here we create a responsive variation, starting with vertically stacked buttons until
              the <code>md</code> breakpoint, where <code>.d-md-block</code> replaces the{' '}
              <code>.d-grid</code> class, thus nullifying the <code>gap-2</code> utility. Resize
              your browser to see them change.
            </p>
            <DocsExample href="components/buttons#block-buttons">
              <div className="d-grid gap-2 d-md-block">
                <CButton color="primary">Button</CButton>
                <CButton color="primary">Button</CButton>
              </div>
            </DocsExample>
            <p className="text-medium-emphasis small">
              You can adjust the width of your block buttons with grid column width classes. For
              example, for a half-width &#34;block button&#34;, use <code>.col-6</code>. Center it
              horizontally with <code>.mx-auto</code>, too.
            </p>
            <DocsExample href="components/buttons#block-buttons">
              <div className="d-grid gap-2 col-6 mx-auto">
                <CButton color="primary">Button</CButton>
                <CButton color="primary">Button</CButton>
              </div>
            </DocsExample>
            <p className="text-medium-emphasis small">
              Additional utilities can be used to adjust the alignment of buttons when horizontal.
              Here we&#39;ve taken our previous responsive example and added some flex utilities and
              a margin utility on the button to right align the buttons when they&#39;re no longer
              stacked.
            </p>
            <DocsExample href="components/buttons#block-buttons">
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <CButton color="primary" className="me-md-2">
                  Button
                </CButton>
                <CButton color="primary">Button</CButton>
              </div>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Buttons
