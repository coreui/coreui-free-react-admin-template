import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CPagination,
  CPaginationItem,
  CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'

const Paginations = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Pagination</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              We use a large block of connected links for our pagination, making links hard to miss
              and easily scalable—all while providing large hit areas. Pagination is built with list
              HTML elements so screen readers can announce the number of available links. Use a
              wrapping <code>&lt;nav&gt;</code> element to identify it as a navigation section to
              screen readers and other assistive technologies.
            </p>
            <p className="text-medium-emphasis small">
              In addition, as pages likely have more than one such navigation section, it&#39;s
              advisable to provide a descriptive <code>aria-label</code> for the{' '}
              <code>&lt;nav&gt;</code> to reflect its purpose. For example, if the pagination
              component is used to navigate between a set of search results, an appropriate label
              could be <code>aria-label=&#34;Search results pages&#34;</code>.
            </p>
            <DocsExample href="components/pagination">
              <CPagination aria-label="Page navigation example">
                <CPaginationItem>Previous</CPaginationItem>
                <CPaginationItem>1</CPaginationItem>
                <CPaginationItem>2</CPaginationItem>
                <CPaginationItem>3</CPaginationItem>
                <CPaginationItem>Next</CPaginationItem>
              </CPagination>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Pagination</strong> <small>Working with icons</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Looking to use an icon or symbol in place of text for some pagination links? Be sure
              to provide proper screen reader support with <code>aria</code> attributes.
            </p>
            <DocsExample href="components/pagination#working-with-icons">
              <CPagination aria-label="Page navigation example">
                <CPaginationItem aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </CPaginationItem>
                <CPaginationItem>1</CPaginationItem>
                <CPaginationItem>2</CPaginationItem>
                <CPaginationItem>3</CPaginationItem>
                <CPaginationItem aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </CPaginationItem>
              </CPagination>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Pagination</strong> <small>Disabled and active states</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Pagination links are customizable for different circumstances. Use{' '}
              <code>disabled</code> for links that appear un-clickable and <code>.active</code> to
              indicate the current page.
            </p>
            <p className="text-medium-emphasis small">
              While the <code>disabled</code> prop uses <code>pointer-events: none</code> to{' '}
              <em>try</em> to disable the link functionality of <code>&lt;a&gt;</code>s, that CSS
              property is not yet standardized and doesn&#39;taccount for keyboard navigation. As
              such, we always add <code>tabindex=&#34;-1&#34;</code> on disabled links and use
              custom JavaScript to fully disable their functionality.
            </p>
            <DocsExample href="components/pagination#disabled-and-active-states">
              <CPagination aria-label="Page navigation example">
                <CPaginationItem aria-label="Previous" disabled>
                  <span aria-hidden="true">&laquo;</span>
                </CPaginationItem>
                <CPaginationItem active>1</CPaginationItem>
                <CPaginationItem>2</CPaginationItem>
                <CPaginationItem>3</CPaginationItem>
                <CPaginationItem aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </CPaginationItem>
              </CPagination>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Pagination</strong> <small>Sizing</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Fancy larger or smaller pagination? Add <code>size=&#34;lg&#34;</code> or{' '}
              <code>size=&#34;sm&#34;</code> for additional sizes.
            </p>
            <DocsExample href="components/pagination#sizing">
              <CPagination size="lg" aria-label="Page navigation example">
                <CPaginationItem>Previous</CPaginationItem>
                <CPaginationItem>1</CPaginationItem>
                <CPaginationItem>2</CPaginationItem>
                <CPaginationItem>3</CPaginationItem>
                <CPaginationItem>Next</CPaginationItem>
              </CPagination>
            </DocsExample>
            <DocsExample href="components/pagination#sizing">
              <CPagination size="sm" aria-label="Page navigation example">
                <CPaginationItem>Previous</CPaginationItem>
                <CPaginationItem>1</CPaginationItem>
                <CPaginationItem>2</CPaginationItem>
                <CPaginationItem>3</CPaginationItem>
                <CPaginationItem>Next</CPaginationItem>
              </CPagination>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Pagination</strong> <small>Alignment</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Change the alignment of pagination components with{' '}
              <a href="https://coreui.io/docs/utilities/flex/">flexbox utilities</a>.
            </p>
            <DocsExample href="components/pagination#aligment">
              <CPagination className="justify-content-center" aria-label="Page navigation example">
                <CPaginationItem disabled>Previous</CPaginationItem>
                <CPaginationItem>1</CPaginationItem>
                <CPaginationItem>2</CPaginationItem>
                <CPaginationItem>3</CPaginationItem>
                <CPaginationItem>Next</CPaginationItem>
              </CPagination>
            </DocsExample>
            <DocsExample href="components/pagination#aligment">
              <CPagination className="justify-content-end" aria-label="Page navigation example">
                <CPaginationItem disabled>Previous</CPaginationItem>
                <CPaginationItem>1</CPaginationItem>
                <CPaginationItem>2</CPaginationItem>
                <CPaginationItem>3</CPaginationItem>
                <CPaginationItem>Next</CPaginationItem>
              </CPagination>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Paginations
