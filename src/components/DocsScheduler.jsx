import React from 'react'
import { CBadge } from '@coreui/react'

import ComponentsImg from 'src/assets/images/components.webp'

const DocsScheduler = () => (
  <div className="bg-warning bg-opacity-10 border border-2 border-warning rounded mb-4">
    <div className="row d-flex align-items-center p-3 px-xl-4 flex-xl-nowrap">
      <div className="col-xl-auto col-12 d-none d-xl-block p-0">
        <img
          className="img-fluid"
          src={ComponentsImg}
          width="160px"
          height="160px"
          alt="CoreUI Scheduler hexagon"
        />
      </div>
      <div className="col-md col-12 px-lg-4">
        <h5 className="mb-1">
          CoreUI Scheduler{' '}
          <CBadge color="warning" className="ms-2 text-dark">
            ADD-ON
          </CBadge>
        </h5>
        Calendars that only render are easy — one people actually book in is not.{' '}
        <strong>
          Day, week, month, agenda, resource and timeline views, with drag-to-reschedule, resize,
          recurring events and full keyboard support on a headless core.
        </strong>{' '}
        It&apos;s not bundled with this template — it&apos;s a separately licensed add-on available
        for Bootstrap, React, Vue and Angular.
      </div>
      <div className="col-md-auto col-12 mt-3 mt-lg-0 d-flex flex-column">
        <a
          className="btn btn-warning text-nowrap"
          href="https://coreui.io/scheduler/react/docs/getting-started/introduction/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Explore Documentation
        </a>
        <div className="text-center my-1">or</div>
        <a
          className="btn btn-danger text-nowrap text-white"
          href="https://coreui.io/scheduler/react/?src=free-react-admin-template-scheduler-banner"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get CoreUI Scheduler →
        </a>
      </div>
    </div>
  </div>
)

export default DocsScheduler
