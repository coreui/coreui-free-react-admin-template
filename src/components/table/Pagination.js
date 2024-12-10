import { CPagination, CPaginationItem, CFormSelect, CRow, CCol } from '@coreui/react';

const Pagination = ({ pagination, onPageChange, onPageSizeChange, maxVisiblePages = 7 }) => {
  const { currentPage, totalPages, pageSize } = pagination;

  const getPageNumbers = () => {
    const pages = [];
    const half = Math.floor((maxVisiblePages - 1) / 2);

    if (totalPages <= maxVisiblePages) {
      // Case 1: Show all pages if total pages are less than maxVisiblePages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (currentPage <= half + 1) {
      // Case 2: Current page near the start
      for (let i = 1; i <= maxVisiblePages - 2; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    } else if (currentPage >= totalPages - half) {
      // Case 3: Current page near the end
      pages.push(1);
      pages.push('...');
      for (let i = totalPages - (maxVisiblePages - 3); i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Case 4: Current page in the middle
      pages.push(1);
      pages.push('...');
      for (let i = currentPage - half + 2; i <= currentPage + half - 2; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    onPageSizeChange(newSize);
  };

  const pages = getPageNumbers();

  return (
    <CRow className="align-items-center mb-2">
      <CCol className="col-auto">
        <label htmlFor="pageSize" className="me-2">
          Items per page:
        </label>
      </CCol>
      <CCol className="col-auto">
        <CFormSelect
          aria-label="Default select"
          key="pageSize"
          value={pageSize}
          onChange={handlePageSizeChange}
        >
          {[5, 10, 20, 50, 100].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </CFormSelect>
      </CCol>

      <CCol className="col-auto ms-auto">
        {/* Pagination controls */}
        <CPagination aria-label="Page navigation example" className="m-0">
          <CPaginationItem
            aria-label="Previous"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            style={{
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              opacity: currentPage === 1 ? 0.6 : 1,
            }}
          >
            <span aria-hidden="true">&laquo;</span>
          </CPaginationItem>

          {pages.map((page, index) =>
            page === '...' ? (
              <CPaginationItem key={`ellipsis-${index}`} className="disabled">
                ...
              </CPaginationItem>
            ) : (
              <CPaginationItem
                key={page}
                className={currentPage === page ? 'active' : ''}
                onClick={() => handlePageChange(page)}
                style={{
                  cursor: currentPage === page ? 'default' : 'pointer',
                }}
              >
                {page}
              </CPaginationItem>
            )
          )}

          <CPaginationItem
            aria-label="Next"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            style={{
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              opacity: currentPage === totalPages ? 0.6 : 1,
            }}
          >
            <span aria-hidden="true">&raquo;</span>
          </CPaginationItem>
        </CPagination>
      </CCol>
    </CRow>
  );
};

export default Pagination;
