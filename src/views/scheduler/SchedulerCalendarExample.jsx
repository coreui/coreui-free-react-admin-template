import React from 'react'
import { CScheduler } from '@coreui/react-scheduler'
import '@coreui/scheduler/dist/css/scheduler.css'

import { calendarEvents } from './data'

const SchedulerCalendarExample = () => (
  <CScheduler
    view="month"
    monthMaxEventsPerDay={3}
    businessHours={{ daysOfWeek: [1, 2, 3, 4, 5], startHour: 9, endHour: 17 }}
    events={calendarEvents}
  />
)

export default SchedulerCalendarExample
