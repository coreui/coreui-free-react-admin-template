import React from 'react'
import {
  CAlert,
  CCard,
  CCardBody,
  CCardHeader,
} from '@coreui/react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo)
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <CCard className="mb-4">
          <CCardHeader>
            <h4>Something went wrong</h4>
          </CCardHeader>
          <CCardBody>
            <CAlert color="danger">
              <h4 className="alert-heading">Error Details</h4>
              <p>{this.state.error && this.state.error.toString()}</p>
              <hr />
              <p className="mb-0">
                Please try refreshing the page. If the problem persists, contact support.
              </p>
            </CAlert>
            {process.env.NODE_ENV === 'development' && (
              <details style={{ whiteSpace: 'pre-wrap' }}>
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </details>
            )}
          </CCardBody>
        </CCard>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
