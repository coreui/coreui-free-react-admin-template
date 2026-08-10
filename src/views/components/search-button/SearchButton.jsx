import { useState } from 'react'
import {
  CAlert,
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCloseButton,
  CCol,
  CFormInput,
  CListGroup,
  CListGroupItem,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  COffcanvas,
  COffcanvasBody,
  COffcanvasHeader,
  COffcanvasTitle,
  CRow,
  CSearchButton,
} from '@coreui/react'
import { DocsComponents, DocsExample } from 'src/components'

const BasicExample = () => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <CSearchButton
        onTrigger={() => setVisible(true)}
        aria-label="Open search dialog"
        aria-controls="search-button-basic-example"
      />
      <CModal
        id="search-button-basic-example"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="search-button-basic-example-title"
      >
        <CModalHeader>
          <CModalTitle id="search-button-basic-example-title" className="w-100">
            <CFormInput type="search" placeholder="Search" aria-label="Search" />
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p className="text-body-secondary small mb-2">Recent searches</p>
          <CListGroup flush>
            <CListGroupItem
              as="button"
              type="button"
              className="d-flex justify-content-between align-items-center"
            >
              CoreUI components overview
              <CBadge color="secondary" shape="rounded-pill">
                Open
              </CBadge>
            </CListGroupItem>
            <CListGroupItem
              as="button"
              type="button"
              className="d-flex justify-content-between align-items-center"
            >
              Modal dialog examples
              <CBadge color="secondary" shape="rounded-pill">
                Open
              </CBadge>
            </CListGroupItem>
            <CListGroupItem
              as="button"
              type="button"
              className="d-flex justify-content-between align-items-center"
            >
              Sidebar navigation customization
              <CBadge color="secondary" shape="rounded-pill">
                Open
              </CBadge>
            </CListGroupItem>
          </CListGroup>
        </CModalBody>
      </CModal>
    </>
  )
}

const CustomShortcutExample = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <CSearchButton
        placeholder="Command palette"
        shortcut="meta+i,ctrl+i"
        onTrigger={() => setCount((value) => value + 1)}
        aria-label="Open command palette"
      />
      <CAlert color="info" className="mt-3 mb-0">
        Triggered {count} {count === 1 ? 'time' : 'times'} with click or shortcut.
      </CAlert>
    </div>
  )
}

const OffcanvasExample = () => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <CSearchButton
        onTrigger={() => setVisible(true)}
        shortcut="meta+shift+o,ctrl+shift+o"
        aria-label="Open search panel"
        aria-controls="search-button-offcanvas-example"
      />
      <COffcanvas
        id="search-button-offcanvas-example"
        placement="end"
        visible={visible}
        onHide={() => setVisible(false)}
      >
        <COffcanvasHeader>
          <COffcanvasTitle>Search panel</COffcanvasTitle>
          <CCloseButton className="text-reset" onClick={() => setVisible(false)} />
        </COffcanvasHeader>
        <COffcanvasBody>
          <CFormInput
            type="search"
            className="mb-3"
            placeholder="Search..."
            aria-label="Search in panel"
          />
          <p className="mb-0">Use this space for filters, recent searches, or command shortcuts.</p>
        </COffcanvasBody>
      </COffcanvas>
    </>
  )
}

const SearchButton = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <DocsComponents href="components/search-button/" />
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Search Button</strong> <small>Basic example</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Use <code>CSearchButton</code> as the entry point for a controlled search dialog. Fire{' '}
              <code>onTrigger</code> — called on click or on the keyboard shortcut — to open a{' '}
              <code>CModal</code> you own.
            </p>
            <DocsExample href="components/search-button/#basic-example">
              <BasicExample />
            </DocsExample>
          </CCardBody>
        </CCard>

        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Search Button</strong> <small>Custom shortcut</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Configure <code>shortcut</code> to match your command palette or product conventions,
              and customize the <code>placeholder</code> text.
            </p>
            <DocsExample href="components/search-button/#custom-shortcut">
              <CustomShortcutExample />
            </DocsExample>
          </CCardBody>
        </CCard>

        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Search Button</strong> <small>Launch an offcanvas</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              <code>CSearchButton</code> is a trigger only — pair it with a <code>COffcanvas</code>{' '}
              instead of a modal when you want a docked panel for quick navigation or command
              results.
            </p>
            <DocsExample href="components/search-button/#launch-an-offcanvas">
              <OffcanvasExample />
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default SearchButton
