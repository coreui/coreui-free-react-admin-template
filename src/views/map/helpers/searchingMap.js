import React, { useEffect, useRef } from 'react'
import { CFormInput, CButton, CCard, CCardHeader, CCardBody, CAlert } from '@coreui/react'

const SearchPanel = ({
  searchQuery,
  onSearchQueryChange,
  onSearch,
  searchResults,
  onResultClick,
  onClearResults,
}) => {
  const debounceRef = useRef(null)

  useEffect(() => {
    
    if (debounceRef.current) clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(() => {
      if (searchQuery.trim()) {
        onSearch(searchQuery)
      } else {
        onClearResults()
      }
    }, 400)

    // Clean up on unmount or query change
    return () => clearTimeout(debounceRef.current)
  }, [searchQuery])

  return (
    <CCard
      className="search-panel"
      style={{ backgroundColor: '#FFFFFF', border: '1px solid #DDDDDD' }}
    >
      <CCardHeader
        className="search-header"
        style={{
          padding: '0',
          borderRadius: '4px',
          backgroundColor: '#FFFFFF',
         
        }}
      >
        <div className="search-input-container">
          <CFormInput
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            className="form-controller"
            style={{
              backgroundColor: 'white',
              color: 'black',
              border: 'none',
              boxShadow: 'none',
              
            }}
          />
          {searchQuery !== '' && (
            <CButton
              onClick={onClearResults}
              className="close-button"
              title="Close results"
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: '#6C757D',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </CButton>
          )}
        </div>
      </CCardHeader>
      <CCardBody className="p-0" style={{ backgroundColor: '#FFFFFF' }}>
        {searchResults === null && (
          <CAlert
            color="warning"
            className="m-2"
            style={{
              backgroundColor: '#FFF3CD',
              color: '#856404',
              border: '1px solid #FFEEBA',
            }}
          >
            An error occurred while searching. Please try again.
          </CAlert>
        )}

        {searchResults !== null && searchResults.length === 0 && searchQuery.trim() !== '' && (
          <CAlert
            color="info"
            className="m-2"
            style={{
              backgroundColor: '#D1ECF1',
              color: '#0C5460',
              border: '1px solid #BEE5EB',
            }}
          >
            No results found for "{searchQuery}".
          </CAlert>
        )}

        {searchResults !== null && searchResults.length > 0 && (
          <div className="search-results" style={{ backgroundColor: '#FFFFFF' }}>
            <div
              className="search-results-header"
              style={{
                borderBottom: '1px solid #EEEEEE',
                backgroundColor: '#FAFAFA',
              }}
            >
              <h5
                style={{
                  margin: 0,
                  fontSize: '14px',
                  color: '#0056b3',
                  fontWeight: 600,
                }}
              >
                Search Results ({searchResults.length})
              </h5>
            </div>
            <ul className="search-results-list" style={{ backgroundColor: '#FFFFFF' }}>
              {searchResults.map((result, index) => (
                <li
                  key={index}
                  onClick={() => onResultClick(result)}
                  className="search-result-item"
                  style={{
                    borderBottom: '1px solid #EEEEEE',
                    backgroundColor: '#FFFFFF',
                    ':hover': {
                      backgroundColor: '#F0F0F0',
                    },
                  }}
                >
                  <div style={{ fontWeight: 500, color: '#0056b3' }}>{result.data.name}</div>
                  <div style={{ fontSize: '0.875rem', color: '#6C757D' }}>
                    Cadastre: {result.data.kadastr}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#6C757D' }}>
                    Address: {result.data.manzil}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CCardBody>
    </CCard>
  )
}

export default SearchPanel
