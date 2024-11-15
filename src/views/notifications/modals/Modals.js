import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CLink,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CPopover,
  CRow,
  CTooltip,
} from '@coreui/react'
import { DocsComponents, DocsExample } from 'src/components'

const LiveDemo = () => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <CButton color="primary" onClick={() => setVisible(!visible)}>
        Launch demo modal
      </CButton>
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Modal title</CModalTitle>
        </CModalHeader>
        <CModalBody>Woohoo, you&#39;re reading this text in a modal!</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

const StaticBackdrop = () => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <CButton color="primary" onClick={() => setVisible(!visible)}>
        Launch static backdrop modal
      </CButton>
      <CModal backdrop="static" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Modal title</CModalTitle>
        </CModalHeader>
        <CModalBody>
          I will not close if you click outside me. Don&#39;teven try to press escape key.
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

const ScrollingLongContent = () => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <CButton color="primary" onClick={() => setVisible(!visible)}>
        Launch demo modal
      </CButton>
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Modal title</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </p>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </p>
          <p>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
            auctor fringilla.
          </p>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </p>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </p>
          <p>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
            auctor fringilla.
          </p>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </p>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </p>
          <p>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
            auctor fringilla.
          </p>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </p>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </p>
          <p>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
            auctor fringilla.
          </p>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </p>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </p>
          <p>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
            auctor fringilla.
          </p>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </p>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </p>
          <p>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
            auctor fringilla.
          </p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

const ScrollingLongContent2 = () => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <CButton color="primary" onClick={() => setVisible(!visible)}>
        Launch demo modal
      </CButton>
      <CModal scrollable visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Modal title</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </p>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </p>
          <p>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
            auctor fringilla.
          </p>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </p>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </p>
          <p>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
            auctor fringilla.
          </p>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </p>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </p>
          <p>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
            auctor fringilla.
          </p>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </p>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </p>
          <p>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
            auctor fringilla.
          </p>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </p>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </p>
          <p>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
            auctor fringilla.
          </p>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </p>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </p>
          <p>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
            auctor fringilla.
          </p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

const VerticallyCentered = () => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <CButton color="primary" onClick={() => setVisible(!visible)}>
        Vertically centered modal
      </CButton>
      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Modal title</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
          in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

const VerticallyCentered2 = () => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <CButton color="primary" onClick={() => setVisible(!visible)}>
        Vertically centered scrollable modal
      </CButton>
      <CModal alignment="center" scrollable visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Modal title</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </p>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </p>
          <p>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
            auctor fringilla.
          </p>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </p>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

const TooltipsPopovers = () => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <CButton color="primary" onClick={() => setVisible(!visible)}>
        Launch demo modal
      </CButton>
      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Modal title</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <h5>Popover in a modal</h5>
          <p>
            This
            <CPopover title="Popover title" content="Popover body content is set in this property.">
              <CButton color="primary">button</CButton>
            </CPopover>{' '}
            triggers a popover on click.
          </p>
          <hr />
          <h5>Tooltips in a modal</h5>
          <p>
            <CTooltip content="Tooltip">
              <CLink>This link</CLink>
            </CTooltip>{' '}
            and
            <CTooltip content="Tooltip">
              <CLink>that link</CLink>
            </CTooltip>{' '}
            have tooltips on hover.
          </p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

const OptionalSizes = () => {
  const [visibleXL, setVisibleXL] = useState(false)
  const [visibleLg, setVisibleLg] = useState(false)
  const [visibleSm, setVisibleSm] = useState(false)
  return (
    <>
      <CButton color="primary" onClick={() => setVisibleXL(!visibleXL)}>
        Extra large modal
      </CButton>
      <CButton color="primary" onClick={() => setVisibleLg(!visibleLg)}>
        Large modal
      </CButton>
      <CButton color="primary" onClick={() => setVisibleSm(!visibleSm)}>
        Small large modal
      </CButton>
      <CModal size="xl" visible={visibleXL} onClose={() => setVisibleXL(false)}>
        <CModalHeader>
          <CModalTitle>Extra large modal</CModalTitle>
        </CModalHeader>
        <CModalBody>...</CModalBody>
      </CModal>
      <CModal size="lg" visible={visibleLg} onClose={() => setVisibleLg(false)}>
        <CModalHeader>
          <CModalTitle>Large modal</CModalTitle>
        </CModalHeader>
        <CModalBody>...</CModalBody>
      </CModal>
      <CModal size="sm" visible={visibleSm} onClose={() => setVisibleSm(false)}>
        <CModalHeader>
          <CModalTitle>Small modal</CModalTitle>
        </CModalHeader>
        <CModalBody>...</CModalBody>
      </CModal>
    </>
  )
}

const FullscreenModal = () => {
  const [visible, setVisible] = useState(false)
  const [visibleSm, setVisibleSm] = useState(false)
  const [visibleMd, setVisibleMd] = useState(false)
  const [visibleLg, setVisibleLg] = useState(false)
  const [visibleXL, setVisibleXL] = useState(false)
  const [visibleXXL, setVisibleXXL] = useState(false)

  return (
    <>
      <CButton color="primary" onClick={() => setVisible(!visible)}>
        Full screen
      </CButton>
      <CButton color="primary" onClick={() => setVisibleSm(!visibleSm)}>
        Full screen below sm
      </CButton>
      <CButton color="primary" onClick={() => setVisibleMd(!visibleMd)}>
        Full screen below md
      </CButton>
      <CButton color="primary" onClick={() => setVisibleLg(!visibleLg)}>
        Full screen below lg
      </CButton>
      <CButton color="primary" onClick={() => setVisibleXL(!visibleXL)}>
        Full screen below xl
      </CButton>
      <CButton color="primary" onClick={() => setVisibleXXL(!visibleXXL)}>
        Full screen below xxl
      </CButton>
      <CModal fullscreen visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Full screen</CModalTitle>
        </CModalHeader>
        <CModalBody>...</CModalBody>
      </CModal>
      <CModal fullscreen="sm" visible={visibleSm} onClose={() => setVisibleSm(false)}>
        <CModalHeader>
          <CModalTitle>Full screen below sm</CModalTitle>
        </CModalHeader>
        <CModalBody>...</CModalBody>
      </CModal>
      <CModal fullscreen="md" visible={visibleMd} onClose={() => setVisibleMd(false)}>
        <CModalHeader>
          <CModalTitle>Full screen below md</CModalTitle>
        </CModalHeader>
        <CModalBody>...</CModalBody>
      </CModal>
      <CModal fullscreen="lg" visible={visibleLg} onClose={() => setVisibleLg(false)}>
        <CModalHeader>
          <CModalTitle>Full screen below lg</CModalTitle>
        </CModalHeader>
        <CModalBody>...</CModalBody>
      </CModal>
      <CModal fullscreen="xl" visible={visibleXL} onClose={() => setVisibleXL(false)}>
        <CModalHeader>
          <CModalTitle>Full screen below xl</CModalTitle>
        </CModalHeader>
        <CModalBody>...</CModalBody>
      </CModal>
      <CModal fullscreen="xxl" visible={visibleXXL} onClose={() => setVisibleXXL(false)}>
        <CModalHeader>
          <CModalTitle>Full screen below xxl</CModalTitle>
        </CModalHeader>
        <CModalBody>...</CModalBody>
      </CModal>
    </>
  )
}

const Modals = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <DocsComponents href="components/modal/" />
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Modal</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Below is a static modal example (meaning its <code>position</code> and{' '}
              <code>display</code> have been overridden). Included are the modal header, modal body
              (required for <code>padding</code>), and modal footer (optional). We ask that you
              include modal headers with dismiss actions whenever possible, or provide another
              explicit dismiss action.
            </p>
            <DocsExample href="components/modal">
              <CModal
                className="show d-block position-static"
                backdrop={false}
                keyboard={false}
                portal={false}
                visible
              >
                <CModalHeader>
                  <CModalTitle>Modal title</CModalTitle>
                </CModalHeader>
                <CModalBody>Modal body text goes here.</CModalBody>
                <CModalFooter>
                  <CButton color="secondary">Close</CButton>
                  <CButton color="primary">Save changes</CButton>
                </CModalFooter>
              </CModal>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Modal</strong> <small>Live demo</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Toggle a working modal demo by clicking the button below. It will slide down and fade
              in from the top of the page.
            </p>
            <DocsExample href="components/modal#live-demo">{LiveDemo()}</DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Modal</strong> <small>Static backdrop</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              If you don’t provide an <code>onDimsiss</code> handler to the Modal component, your
              modal will behave as though the backdrop is static, meaning it will not close when
              clicking outside it. Click the button below to try it.
            </p>
            <DocsExample href="components/modal#static-backdrop">{StaticBackdrop()}</DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Modal</strong> <small>Scrolling long content</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              If you don’t provide an <code>onDimsiss</code> handler to the Modal component, your
              modal will behave as though the backdrop is static, meaning it will not close when
              clicking outside it. Click the button below to try it.
            </p>
            <DocsExample href="components/modal#scrolling-long-content">
              {ScrollingLongContent()}
            </DocsExample>
            <p className="text-body-secondary small">
              You can also create a scrollable modal that allows scroll the modal body by adding{' '}
              <code>scrollable</code> prop.
            </p>
            <DocsExample href="components/modal#scrolling-long-content">
              {ScrollingLongContent2()}
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Modal</strong> <small>Vertically centered</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Add <code>alignment=&#34;center&#34;</code> to <code>&lt;CModal&gt;</code> to
              vertically center the modal.
            </p>
            <DocsExample href="components/modal#vertically-centered">
              {VerticallyCentered()}
            </DocsExample>
            <DocsExample href="components/modal#vertically-centered">
              {VerticallyCentered2()}
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Modal</strong> <small>Tooltips and popovers</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              <code>&lt;CTooltips&gt;</code> and <code>&lt;CPopovers&gt;</code> can be placed within
              modals as needed. When modals are closed, any tooltips and popovers within are also
              automatically dismissed.
            </p>
            <DocsExample href="components/modal#tooltips-and-popovers">
              {TooltipsPopovers()}
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Modal</strong> <small>Optional sizes</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Modals have three optional sizes, available via modifier classes to be placed on a{' '}
              <code>&lt;CModal&gt;</code>. These sizes kick in at certain breakpoints to avoid
              horizontal scrollbars on narrower viewports.
            </p>
            <table className="table">
              <thead>
                <tr>
                  <th>Size</th>
                  <th>Property size</th>
                  <th>Modal max-width</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Small</td>
                  <td>
                    <code>&#39;sm&#39;</code>
                  </td>
                  <td>
                    <code>300px</code>
                  </td>
                </tr>
                <tr>
                  <td>Default</td>
                  <td className="text-body-secondary">None</td>
                  <td>
                    <code>500px</code>
                  </td>
                </tr>
                <tr>
                  <td>Large</td>
                  <td>
                    <code>&#39;lg&#39;</code>
                  </td>
                  <td>
                    <code>800px</code>
                  </td>
                </tr>
                <tr>
                  <td>Extra large</td>
                  <td>
                    <code>&#39;xl&#39;</code>
                  </td>
                  <td>
                    <code>1140px</code>
                  </td>
                </tr>
              </tbody>
            </table>
            <DocsExample href="components/modal#optional-sizes">{OptionalSizes()}</DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Modal</strong> <small>Fullscreen Modal</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Another override is the option to pop up a modal that covers the user viewport,
              available via property <code>fullscrean</code>.
            </p>
            <table className="table">
              <thead>
                <tr>
                  <th>Property fullscrean</th>
                  <th>Availability</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>true</code>
                  </td>
                  <td>Always</td>
                </tr>
                <tr>
                  <td>
                    <code>&#39;sm&#39;</code>
                  </td>
                  <td>
                    Below <code>576px</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>&#39;md&#39;</code>
                  </td>
                  <td>
                    Below <code>768px</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>&#39;lg&#39;</code>
                  </td>
                  <td>
                    Below <code>992px</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>&#39;xl&#39;</code>
                  </td>
                  <td>
                    Below <code>1200px</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>&#39;xxl&#39;</code>
                  </td>
                  <td>
                    Below <code>1400px</code>
                  </td>
                </tr>
              </tbody>
            </table>
            <DocsExample href="components/modal#fullscreen-modal">{FullscreenModal()}</DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Modals
