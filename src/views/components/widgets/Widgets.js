import React from 'react'
import {
  CCardGroup,
  CCol,
  CLink,
  CRow,
  CWidgetIcon,
  CWidgetProgress,
  CWidgetProgressIcon,
  CWidgetSimple,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'

import WidgetsBrand from './WidgetsBrand'
import WidgetsDropdown from './WidgetsDropdown'

const Widgets = () => {
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

  return (
    <>
      <WidgetsDropdown />
      <CRow>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetProgress
            className="mb-4"
            value="89.9%"
            title="Widget title"
            progressColor="success"
            progressValue={89.9}
            text="Lorem ipsum dolor sit amet enim."
          />
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetProgress
            className="mb-4"
            value="12.124"
            title="Widget title"
            progressColor="info"
            progressValue={89.9}
            text="Lorem ipsum dolor sit amet enim."
          />
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetProgress
            className="mb-4"
            value="$98.111,00"
            title="Widget title"
            progressColor="warning"
            progressValue={89.9}
            text="Lorem ipsum dolor sit amet enim."
          />
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetProgress
            className="mb-4"
            value="2 TB"
            title="Widget title"
            progressValue={89.9}
            text="Lorem ipsum dolor sit amet enim."
          />
        </CCol>

        <CCol xs="12" sm="6" lg="3">
          <CWidgetProgress
            className="mb-4"
            color="success"
            textColor="white"
            value="89.9%"
            title="Widget title"
            progressWhite
            progressValue={89.9}
            text="Lorem ipsum dolor sit amet enim."
          />
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetProgress
            className="mb-4"
            color="info"
            textColor="white"
            value="12.124"
            title="Widget title"
            progressWhite
            progressValue={89.9}
            text="Lorem ipsum dolor sit amet enim."
          />
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetProgress
            className="mb-4"
            color="warning"
            textColor="white"
            value="$98.111,00"
            title="Widget title"
            progressWhite
            progressValue={89.9}
            text="Lorem ipsum dolor sit amet enim."
          />
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetProgress
            className="mb-4"
            color="primary"
            textColor="white"
            value="2 TB"
            title="Widget title"
            progressWhite
            progressValue={89.9}
            text="Lorem ipsum dolor sit amet enim."
          />
        </CCol>
      </CRow>

      <CRow>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetIcon
            className="mb-3"
            icon={<CIcon width={24} name="cil-settings" className="icon icon-xl" />}
            iconPadding={3}
            title="income"
            value="$1.999,50"
            color="primary"
          />
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetIcon
            className="mb-3"
            icon={<CIcon width={24} name="cil-user" className="icon icon-xl" />}
            iconPadding={3}
            title="income"
            value="$1.999,50"
            color="info"
          />
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetIcon
            className="mb-3"
            icon={<CIcon width={24} name="cil-moon" className="icon icon-xl" />}
            iconPadding={3}
            title="income"
            value="$1.999,50"
            color="warning"
          />
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetIcon
            className="mb-3"
            icon={<CIcon width={24} name="cil-bell" className="icon icon-xl" />}
            iconPadding={3}
            title="income"
            value="$1.999,50"
            color="danger"
          />
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetIcon
            className="mb-3"
            icon={<CIcon width={24} name="cil-settings" className="icon icon-xl" />}
            iconPadding={3}
            title="income"
            value="$1.999,50"
            color="primary"
            footer={
              <CLink
                className="font-weight-bold font-xs btn-block text-medium-emphasis"
                href="https://coreui.io/"
                rel="noopener norefferer"
                target="_blank"
              >
                View more
                <CIcon name="cil-arrow-right" className="float-end" width="16" />
              </CLink>
            }
          />
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetIcon
            className="mb-3"
            icon={<CIcon width={24} name="cil-laptop" className="icon icon-xl" />}
            iconPadding={3}
            title="income"
            value="$1.999,50"
            color="info"
            footer={
              <CLink
                className="font-weight-bold font-xs btn-block text-medium-emphasis"
                href="https://coreui.io/"
                rel="noopener norefferer"
                target="_blank"
              >
                View more
                <CIcon name="cil-arrow-right" className="float-end" width="16" />
              </CLink>
            }
          />
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetIcon
            className="mb-3"
            icon={<CIcon width={24} name="cil-moon" className="icon icon-xl" />}
            iconPadding={3}
            title="income"
            value="$1.999,50"
            color="warning"
            footer={
              <CLink
                className="font-weight-bold font-xs btn-block text-medium-emphasis"
                href="https://coreui.io/"
                rel="noopener norefferer"
                target="_blank"
              >
                View more
                <CIcon name="cil-arrow-right" className="float-end" width="16" />
              </CLink>
            }
          />
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetIcon
            className="mb-3"
            icon={<CIcon width={24} name="cil-bell" className="icon icon-xl" />}
            iconPadding={3}
            title="income"
            value="$1.999,50"
            color="danger"
            footer={
              <CLink
                className="font-weight-bold font-xs btn-block text-medium-emphasis"
                href="https://coreui.io/"
                rel="noopener norefferer"
                target="_blank"
              >
                View more
                <CIcon name="cil-arrow-right" className="float-end" width="16" />
              </CLink>
            }
          />
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetIcon
            className="mb-3"
            padding={0}
            icon={<CIcon width={24} name="cil-settings" className="icon icon-xl" />}
            iconPadding={4}
            title="income"
            value="$1.999,50"
            color="primary"
          />
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetIcon
            className="mb-3"
            padding={0}
            icon={<CIcon width={24} name="cil-user" className="icon icon-xl" />}
            iconPadding={4}
            title="income"
            value="$1.999,50"
            color="info"
          />
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetIcon
            className="mb-3"
            padding={0}
            icon={<CIcon width={24} name="cil-moon" className="icon icon-xl" />}
            iconPadding={4}
            title="income"
            value="$1.999,50"
            color="warning"
          />
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetIcon
            className="mb-3"
            padding={0}
            icon={<CIcon width={24} name="cil-bell" className="icon icon-xl" />}
            iconPadding={4}
            title="income"
            value="$1.999,50"
            color="danger"
          />
        </CCol>
      </CRow>
      <WidgetsBrand />
      <WidgetsBrand withCharts />
      <CCardGroup className="mb-4">
        <CWidgetProgressIcon
          icon={<CIcon name="cil-people" className="icon icon-2xl" />}
          value="87.500"
          title="Visitors"
          progressColor="info"
          progressValue={75}
        />
        <CWidgetProgressIcon
          icon={<CIcon name="cil-userFollow" className="icon icon-2xl" />}
          value="385"
          title="New Clients"
          progressColor="success"
          progressValue={75}
        />
        <CWidgetProgressIcon
          icon={<CIcon name="cil-basket" className="icon icon-2xl" />}
          value="1238"
          title="Products sold"
          progressColor="warning"
          progressValue={75}
        />
        <CWidgetProgressIcon
          icon={<CIcon name="cil-chartPie" className="icon icon-2xl" />}
          value="28%"
          title="Returning Visitors"
          progressValue={75}
        />
        <CWidgetProgressIcon
          icon={<CIcon name="cil-speedometer" className="icon icon-2xl" />}
          value="5:34:11"
          title="Avg. Time"
          progressColor="danger"
          progressValue={75}
        />
      </CCardGroup>
      <CRow>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            icon={<CIcon name="cil-people" height="36" />}
            value="87.500"
            title="Visitors"
            progressColor="info"
            progressValue={75}
            className="mb-4"
          />
        </CCol>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            icon={<CIcon name="cil-userFollow" height="36" />}
            value="385"
            title="New Clients"
            progressColor="success"
            progressValue={75}
            className="mb-4"
          />
        </CCol>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            icon={<CIcon name="cil-basket" height="36" />}
            value="1238"
            title="Products sold"
            progressColor="warning"
            progressValue={75}
            className="mb-4"
          />
        </CCol>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            icon={<CIcon name="cil-chartPie" height="36" />}
            value="28%"
            title="Returning Visitors"
            progressColor="primary"
            progressValue={75}
            className="mb-4"
          />
        </CCol>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            icon={<CIcon name="cil-speedometer" height="36" />}
            value="5:34:11"
            title="Avg. Time"
            progressColor="danger"
            progressValue={75}
            className="mb-4"
          />
        </CCol>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            icon={<CIcon name="cil-speech" height="36" />}
            value="972"
            title="comments"
            progressColor="info"
            progressValue={75}
            className="mb-4"
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            color="info"
            icon={<CIcon name="cil-people" height="36" />}
            value="87.500"
            title="Visitors"
            progressValue={75}
            progressWhite
            className="mb-4"
          />
        </CCol>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            color="success"
            icon={<CIcon name="cil-userFollow" height="36" />}
            value="385"
            title="New Clients"
            progressValue={75}
            progressWhite
            className="mb-4"
          />
        </CCol>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            color="warning"
            icon={<CIcon name="cil-basket" height="36" />}
            value="1238"
            title="Products sold"
            progressValue={75}
            progressWhite
            className="mb-4"
          />
        </CCol>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            color="primary"
            icon={<CIcon name="cil-chartPie" height="36" />}
            value="28%"
            title="Returning Visitors"
            progressValue={75}
            progressWhite
            className="mb-4"
          />
        </CCol>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            color="danger"
            icon={<CIcon name="cil-speedometer" height="36" />}
            value="5:34:11"
            title="Avg. Time"
            progressValue={75}
            progressWhite
            className="mb-4"
          />
        </CCol>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            color="info"
            icon={<CIcon name="cil-speech" height="36" />}
            value="972"
            title="comments"
            progressValue={75}
            progressWhite
            className="mb-4"
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol sm="4" lg="2">
          <CWidgetSimple title="title" value="1,123" className="mb-4">
            <CChartBar
              style={{ height: '40px' }}
              data={{
                labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S', 'M'],
                datasets: [
                  {
                    backgroundColor: getStyle('--cui-danger'),
                    borderColor: 'transparent',
                    borderWidth: 1,
                    data: [
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                    ],
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    display: false,
                  },
                  y: {
                    display: false,
                  },
                },
              }}
            />
          </CWidgetSimple>
        </CCol>
        <CCol sm="4" lg="2">
          <CWidgetSimple title="title" value="1,123" className="mb-4">
            <CChartBar
              style={{ height: '40px' }}
              data={{
                labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S', 'M'],
                datasets: [
                  {
                    backgroundColor: getStyle('--cui-primary'),
                    borderColor: 'transparent',
                    borderWidth: 1,
                    data: [
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                    ],
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    display: false,
                  },
                  y: {
                    display: false,
                  },
                },
              }}
            />
          </CWidgetSimple>
        </CCol>
        <CCol sm="4" lg="2">
          <CWidgetSimple title="title" value="1,123" className="mb-4">
            <CChartBar
              style={{ height: '40px' }}
              data={{
                labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S', 'M'],
                datasets: [
                  {
                    backgroundColor: getStyle('--cui-success'),
                    borderColor: 'transparent',
                    borderWidth: 1,
                    data: [
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                    ],
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    display: false,
                  },
                  y: {
                    display: false,
                  },
                },
              }}
            />
          </CWidgetSimple>
        </CCol>
        <CCol sm="4" lg="2">
          <CWidgetSimple title="title" value="1,123" className="mb-4">
            <CChartLine
              style={{ height: '40px' }}
              data={{
                labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S', 'M'],
                datasets: [
                  {
                    backgroundColor: 'transparent',
                    borderColor: getStyle('--cui-danger'),
                    borderWidth: 2,
                    data: [
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                    ],
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                elements: {
                  line: {
                    tension: 0.4,
                  },
                  point: {
                    radius: 0,
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    display: false,
                  },
                  y: {
                    display: false,
                  },
                },
              }}
            />
          </CWidgetSimple>
        </CCol>
        <CCol sm="4" lg="2">
          <CWidgetSimple title="title" value="1,123" className="mb-4">
            <CChartLine
              style={{ height: '40px' }}
              data={{
                labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S', 'M'],
                datasets: [
                  {
                    backgroundColor: 'transparent',
                    borderColor: getStyle('--cui-success'),
                    borderWidth: 2,
                    data: [
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                    ],
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                elements: {
                  line: {
                    tension: 0.4,
                  },
                  point: {
                    radius: 0,
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    display: false,
                  },
                  y: {
                    display: false,
                  },
                },
              }}
            />
          </CWidgetSimple>
        </CCol>
        <CCol sm="4" lg="2">
          <CWidgetSimple title="title" value="1,123" className="mb-4">
            <CChartLine
              style={{ height: '40px' }}
              data={{
                labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S', 'M'],
                datasets: [
                  {
                    backgroundColor: 'transparent',
                    borderColor: getStyle('--cui-info'),
                    borderWidth: 2,
                    data: [
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                      random(40, 100),
                    ],
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                elements: {
                  line: {
                    tension: 0.4,
                  },
                  point: {
                    radius: 0,
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    display: false,
                  },
                  y: {
                    display: false,
                  },
                },
              }}
            />
          </CWidgetSimple>
        </CCol>
      </CRow>
    </>
  )
}

export default Widgets
