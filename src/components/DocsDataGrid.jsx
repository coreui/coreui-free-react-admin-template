import React from 'react'
import { CBadge } from '@coreui/react'

import ComponentsImg from 'src/assets/images/components.webp'

const DocsDataGrid = () => (
  <div className="bg-warning bg-opacity-10 border border-2 border-warning rounded mb-4">
    <div className="row d-flex align-items-center p-3 px-xl-4 flex-xl-nowrap">
      <div className="col-xl-auto col-12 d-none d-xl-block p-0">
        <img
          className="img-fluid"
          src={ComponentsImg}
          width="160px"
          height="160px"
          alt="CoreUI Data Grid hexagon"
        />
      </div>
      <div className="col-md col-12 px-lg-4">
        <h5 className="mb-1">
          CoreUI Data Grid{' '}
          <CBadge color="warning" className="ms-2 text-dark">
            ADD-ON
          </CBadge>
        </h5>
        Your tables choke past a few thousand rows — this one doesn&apos;t.{' '}
        <strong>
          100,000+ rows, buttery-smooth, with sorting, filtering, inline editing and drag-and-drop
          row reordering built in.
        </strong>{' '}
        It&apos;s not bundled with this template — it&apos;s a separately licensed add-on available
        for Bootstrap, React, Vue and Angular.
      </div>
      <div className="col-md-auto col-12 mt-3 mt-lg-0 d-flex flex-column">
        <a
          className="btn btn-warning text-nowrap"
          href="https://coreui.io/data-grid/docs/features/overview/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Explore Documentation
        </a>
        <div className="text-center my-1">or</div>
        <a
          className="btn btn-danger text-nowrap text-white"
          href="https://coreui.io/data-grid/react/?src=free-react-admin-template-data-grid-banner"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get CoreUI Data Grid →
        </a>
      </div>
    </div>
  </div>
)

export default DocsDataGrid
