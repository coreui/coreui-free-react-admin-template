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
          <h6>Default</h6>
          <CPagination>
            <CPaginationItem>Previous</CPaginationItem>
            <CPaginationItem>1</CPaginationItem>
            <CPaginationItem>2</CPaginationItem>
            <CPaginationItem>3</CPaginationItem>
            <CPaginationItem>Next</CPaginationItem>
          </CPagination>
          <br></br>

          <h6>Small</h6>
          <CPagination
            size="sm"
            activePage={currentPage}
            pages={10}
            onActivePageChange={setCurrentPage}
          />
          <br></br>

          <div className="d-md-down-none">
            <h6>Large</h6>
            <CPagination
              size="lg"
              activePage={currentPage}
              pages={10}
              onActivePageChange={setCurrentPage}
            />
            <br></br>
          </div>

          <div>currentPage: {currentPage}</div>
        </CCardBody>
      </CCard>
      <CCard className="mb-4">
        <CCardHeader>
          <strong> Pagination </strong>
          <small>alignment</small>
        </CCardHeader>
        <CCardBody>
          <h6>Left alignment (default)</h6>
          <CPagination activePage={currentPage} pages={10} onActivePageChange={setCurrentPage} />
          <br></br>

          <h6>Center alignment</h6>
          <CPagination
            align="center"
            addListClass="some-class"
            activePage={currentPage}
            pages={10}
            onActivePageChange={setCurrentPage}
          />
          <br></br>

          <h6>Right (end) alignment</h6>
          <CPagination
            align="end"
            activePage={currentPage}
            pages={10}
            onActivePageChange={setCurrentPage}
          />
          <br></br>

          <div>currentPage: {currentPage}</div>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Paginations
