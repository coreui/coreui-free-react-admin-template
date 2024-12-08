import { CPagination, CPaginationItem, CFormSelect, CRow, CCol } from '@coreui/react';

const Pagination = ({ pagination, onPageChange, onPageSizeChange, maxVisiblePages = 3 }) => {
    const { currentPage, totalPages, pageSize } = pagination;

    const getPageNumbers = () => {
        const pages = [];
        const half = Math.floor(maxVisiblePages / 2);
        let start = Math.max(1, currentPage - half);
        let end = Math.min(totalPages, currentPage + half);

        if (start > 2) {
            pages.push(1);
            pages.push('...');
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (end < totalPages - 1) {
            pages.push('...');
            pages.push(totalPages);
        }

        return pages;
    };

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
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
                <CFormSelect aria-label="Default select"
                    key="pageSize"
                    value={pageSize}
                    onChange={handlePageSizeChange}
                >
                    {[5, 10, 20, 50, 120].map((size) => (
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
                            <CPaginationItem key={"bl" + index} className="ellipsis">...</CPaginationItem>
                        ) : (
                            <CPaginationItem
                                key={page}
                                className={currentPage === page ? 'active' : ''}
                                onClick={() => handlePageChange(page)}
                                style={{
                                    cursor: currentPage === page ? '' : 'pointer',
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
