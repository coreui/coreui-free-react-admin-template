import React from 'react'
import Error404 from '../assets/images/error404.png'
import PropTypes from 'prop-types'

const AppFallbackRender = ({ error, resetErrorBoundary }) => (
  <div role="alert" className="d-flex flex-column justify-content-center align-items-center">
    <img src={Error404} alt="Error" className="img-fluid" />
    <button
      onClick={() => {
        // this next line is why the fallbackRender is useful
        // resetComponentState()
        // though you could accomplish this with a combination
        // of the FallbackCallback and onReset props as well.
        resetErrorBoundary()
      }}
      className="btn btn-danger mb-3"
    >
      Try again
    </button>
  </div>
)
AppFallbackRender.propTypes = {
  error: PropTypes.object,
  resetErrorBoundary: PropTypes.func,
}
export { AppFallbackRender }
