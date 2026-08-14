import React from 'react'
import { CScheduler } from '@coreui/react-scheduler'
import '@coreui/scheduler/dist/css/scheduler.css'

import { resources, timelineEvents } from './data'

const SchedulerTimelineExample = () => (
  <CScheduler
    view="timeline"
    timelineDays={3}
    timelineHourWidth={13}
    resources={resources}
    events={timelineEvents}
  />
)

export default SchedulerTimelineExample
