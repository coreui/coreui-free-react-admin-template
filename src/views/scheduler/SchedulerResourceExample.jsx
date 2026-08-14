import React from 'react'
import { CScheduler } from '@coreui/react-scheduler'
import '@coreui/scheduler/dist/css/scheduler.css'

import { resourceEvents, resources } from './data'

const SchedulerResourceExample = () => (
  <CScheduler
    view="resource"
    dayStartHour={8}
    dayEndHour={18}
    resources={resources}
    events={resourceEvents}
  />
)

export default SchedulerResourceExample
