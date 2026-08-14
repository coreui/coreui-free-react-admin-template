import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { DocsScheduler } from 'src/components'

import SchedulerCalendarExample from './SchedulerCalendarExample'
import SchedulerExample from './SchedulerExample'
import SchedulerResourceExample from './SchedulerResourceExample'
import SchedulerTimelineExample from './SchedulerTimelineExample'

const Scheduler = () => (
  <CRow>
    <CCol xs={12}>
      <DocsScheduler />
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Scheduler</strong> <small>month, week, day &amp; agenda views</small>
        </CCardHeader>
        <CCardBody>
          <p className="text-body-secondary">
            The everyday calendar: drag an event to another day to reschedule it, drag its edge to
            resize, drag across empty space to create one, or click it to open the edit dialog.
            Switch between the{' '}
            <a
              href="https://coreui.io/scheduler/react/docs/views/month/"
              target="_blank"
              rel="noopener noreferrer"
            >
              month
            </a>
            ,{' '}
            <a
              href="https://coreui.io/scheduler/react/docs/views/day-week/"
              target="_blank"
              rel="noopener noreferrer"
            >
              week and day
            </a>{' '}
            and{' '}
            <a
              href="https://coreui.io/scheduler/react/docs/views/agenda/"
              target="_blank"
              rel="noopener noreferrer"
            >
              agenda
            </a>{' '}
            views from the toolbar — the same events, the same interactions.
            <br />
            <br />
            The daily standup is a single{' '}
            <a
              href="https://coreui.io/scheduler/react/docs/features/recurrence/"
              target="_blank"
              rel="noopener noreferrer"
            >
              recurring event
            </a>{' '}
            (an RRULE, expanded on the fly), working hours come from{' '}
            <a
              href="https://coreui.io/scheduler/react/docs/features/business-hours/"
              target="_blank"
              rel="noopener noreferrer"
            >
              businessHours
            </a>
            , and every drag has a{' '}
            <a
              href="https://coreui.io/scheduler/react/docs/features/keyboard-accessibility/"
              target="_blank"
              rel="noopener noreferrer"
            >
              keyboard equivalent
            </a>
            .
          </p>
          <SchedulerExample href="https://coreui.io/scheduler/react/">
            <SchedulerCalendarExample />
          </SchedulerExample>
        </CCardBody>
      </CCard>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Scheduler</strong> <small>resource view</small>
        </CCardHeader>
        <CCardBody>
          <p className="text-body-secondary">
            One column per room, person or machine, for a single day. Events land in a column by
            their <code>resourceId</code>, and dragging one into another column reassigns it. Past a
            dozen resources the columns render through a horizontal virtualizer — see the{' '}
            <a
              href="https://coreui.io/scheduler/react/docs/views/resources/"
              target="_blank"
              rel="noopener noreferrer"
            >
              resource view docs
            </a>
            .
          </p>
          <SchedulerExample href="https://coreui.io/scheduler/react/docs/views/resources/">
            <SchedulerResourceExample />
          </SchedulerExample>
        </CCardBody>
      </CCard>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Scheduler</strong> <small>timeline view</small>
        </CCardHeader>
        <CCardBody>
          <p className="text-body-secondary">
            The scheduler turned sideways: resources become rows and time runs horizontally across a
            continuous multi-day axis, so a bar spanning midnight is not split. Overlapping bars
            stack into sub-lanes and the row grows to fit — see the{' '}
            <a
              href="https://coreui.io/scheduler/react/docs/views/timeline/"
              target="_blank"
              rel="noopener noreferrer"
            >
              timeline view docs
            </a>
            .
          </p>
          <SchedulerExample href="https://coreui.io/scheduler/react/docs/views/timeline/">
            <SchedulerTimelineExample />
          </SchedulerExample>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
)

export default Scheduler
