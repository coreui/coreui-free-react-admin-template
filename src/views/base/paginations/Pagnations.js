import React, { useState } from 'react'
import { CCard, CCardBody, CCardHeader, CPagination, CPaginationItem } from '@coreui/react-ts'
import { DocsLink } from 'src/reusable'

const Paginations = () => {
  const [currentPage, setCurrentPage] = useState(2)

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          Pagination
          <DocsLink name="CPagination" />
        </CCardHeader>
        <CCardBody>
          <CPagination>
            <CPaginationItem>Previous</CPaginationItem>
            <CPaginationItem>1</CPaginationItem>
            <CPaginationItem>2</CPaginationItem>
            <CPaginationItem>3</CPaginationItem>
            <CPaginationItem>Next</CPaginationItem>
          </CPagination>
        </CCardBody>
      </CCard>
      <CCard className="mb-4">
        <CCardHeader>
          Pagination
          <small>with icons</small>
        </CCardHeader>
        <CCardBody>
          <CPagination>
            <CPaginationItem aria-label="previous">
              <span aria-hidden="true">&laquo;</span>
            </CPaginationItem>
            <CPaginationItem>1</CPaginationItem>
            <CPaginationItem>2</CPaginationItem>
            <CPaginationItem>3</CPaginationItem>
            <CPaginationItem aria-label="next">
              <span aria-hidden="true">&raquo;</span>
            </CPaginationItem>
          </CPagination>
        </CCardBody>
      </CCard>
      <CCard className="mb-4">
        <CCardHeader>
          Pagination
          <small>with icons</small>
        </CCardHeader>
        <CCardBody>
          <CPagination ariaLabel="Page navigation example">
            <CPaginationItem ariaLabel="Previous" disabled>
              <span aria-hidden="true">&laquo;</span>
            </CPaginationItem>
            <CPaginationItem active>1</CPaginationItem>
            <CPaginationItem>2</CPaginationItem>
            <CPaginationItem>3</CPaginationItem>
            <CPaginationItem ariaLabel="Next">
              <span aria-hidden="true">&raquo;</span>
            </CPaginationItem>
          </CPagination>
        </CCardBody>
      </CCard>
      <CCard className="mb-4">
        <CCardHeader>
          Pagination
          <small>sizing</small>
        </CCardHeader>
        <CCardBody>
          <CPagination size="lg" ariaLabel="Page navigation example">
            <CPaginationItem>Previous</CPaginationItem>
            <CPaginationItem>1</CPaginationItem>
            <CPaginationItem>2</CPaginationItem>
            <CPaginationItem>3</CPaginationItem>
            <CPaginationItem>Next</CPaginationItem>
          </CPagination>
          <hr />
          <CPagination size="sm" ariaLabel="Page navigation example">
            <CPaginationItem>Previous</CPaginationItem>
            <CPaginationItem>1</CPaginationItem>
            <CPaginationItem>2</CPaginationItem>
            <CPaginationItem>3</CPaginationItem>
            <CPaginationItem>Next</CPaginationItem>
          </CPagination>
        </CCardBody>
      </CCard>
      <CCard className="mb-4">
        <CCardHeader>
          Pagination
          <small>alignment</small>
        </CCardHeader>
        <CCardBody>
          <CPagination className="justify-content-start" ariaLabel="Page navigation example">
            <CPaginationItem disabled>Previous</CPaginationItem>
            <CPaginationItem>1</CPaginationItem>
            <CPaginationItem>2</CPaginationItem>
            <CPaginationItem>3</CPaginationItem>
            <CPaginationItem>Next</CPaginationItem>
          </CPagination>
          <hr />
          <CPagination className="justify-content-center" ariaLabel="Page navigation example">
            <CPaginationItem disabled>Previous</CPaginationItem>
            <CPaginationItem>1</CPaginationItem>
            <CPaginationItem>2</CPaginationItem>
            <CPaginationItem>3</CPaginationItem>
            <CPaginationItem>Next</CPaginationItem>
          </CPagination>
          <hr />
          <CPagination className="justify-content-end" ariaLabel="Page navigation example">
            <CPaginationItem disabled>Previous</CPaginationItem>
            <CPaginationItem>1</CPaginationItem>
            <CPaginationItem>2</CPaginationItem>
            <CPaginationItem>3</CPaginationItem>
            <CPaginationItem>Next</CPaginationItem>
          </CPagination>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Paginations
