import PropTypes from 'prop-types'
import React from 'react'

import ComponentsImg from 'src/assets/images/components.webp'

const DocsComponents = (props) => (
  <div className="bg-primary bg-opacity-10 border border-2 border-primary rounded mb-4">
    <div className="row d-flex align-items-center p-3 px-xl-4 flex-xl-nowrap">
      <div className="col-xl-auto col-12 d-none d-xl-block p-0">
        <img
          className="img-fluid"
          src={ComponentsImg}
          width="160px"
          height="160px"
          alt="CoreUI PRO hexagon"
        />
      </div>
      <div className="col-md col-12 px-lg-4">
        Our Admin Panel isn’t just a mix of third-party components. It’s{' '}
        <strong>
          the only open-source React dashboard built on a professional, enterprise-grade UI
          Components Library
        </strong>
        . This component is part of this library, and we present only the basic usage of it here. To
        explore extended examples, detailed API documentation, and customization options, refer to
        our docs.
      </div>
      <div className="col-md-auto col-12 mt-3 mt-lg-0">
        <a
          className="btn btn-primary text-nowrap text-white"
          href={`https://coreui.io/react/docs/${props.href}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Explore Documentation
        </a>
      </div>
    </div>
  </div>
)

DocsComponents.propTypes = {
  href: PropTypes.string,
}

export default DocsComponents
