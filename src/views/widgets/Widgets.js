import React from 'react'
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader,
  CCol,
  CLink,
  CRow,
  CWidgetStatsB,
  CWidgetStatsC,
  CWidgetStatsE,
  CWidgetStatsF,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cilArrowRight,
  cilBasket,
  cilBell,
  cilChartPie,
  cilMoon,
  cilLaptop,
  cilPeople,
  cilSettings,
  cilSpeech,
  cilSpeedometer,
  cilUser,
  cilUserFollow,
} from '@coreui/icons'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import { DocsExample } from 'src/components'

import WidgetsBrand from './WidgetsBrand'
import WidgetsDropdown from './WidgetsDropdown'

const Widgets = () => {
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

  return (
    <CCard className="mb-4">
      <CCardHeader>Widgets</CCardHeader>
      <CCardBody>
        <DocsExample href="/components/widgets/#cwidgetstatsa">
          <WidgetsDropdown />
        </DocsExample>
        <DocsExample href="/components/widgets/#cwidgetstatsb">
          <CRow>
            <CCol xs={12} sm={6} lg={3}>
              <CWidgetStatsB
                className="mb-4"
                progress={{ color: 'success', value: 89.9 }}
                text="Lorem ipsum dolor sit amet enim."
                title="Widget title"
                value="89.9%"
              />
            </CCol>
            <CCol xs={12} sm={6} lg={3}>
              <CWidgetStatsB
                className="mb-4"
                value="12.124"
                title="Widget title"
                progress={{ color: 'info', value: 89.9 }}
                text="Lorem ipsum dolor sit amet enim."
              />
            </CCol>
            <CCol xs={12} sm={6} lg={3}>
              <CWidgetStatsB
                className="mb-4"
                value="$98.111,00"
                title="Widget title"
                progress={{ color: 'warning', value: 89.9 }}
                text="Lorem ipsum dolor sit amet enim."
              />
            </CCol>
            <CCol xs={12} sm={6} lg={3}>
              <CWidgetStatsB
                className="mb-4"
                value="2 TB"
                title="Widget title"
                progress={{ color: 'primary', value: 89.9 }}
                text="Lorem ipsum dolor sit amet enim."
              />
            </CCol>
          </CRow>
        </DocsExample>
        <DocsExample href="/components/widgets/#cwidgetstatsb">
          <CRow>
            <CCol xs={12} sm={6} lg={3}>
              <CWidgetStatsB
                className="mb-4"
                color="success"
                inverse
                value="89.9%"
                title="Widget title"
                progress={{ value: 89.9 }}
                text="Lorem ipsum dolor sit amet enim."
              />
            </CCol>
            <CCol xs={12} sm={6} lg={3}>
              <CWidgetStatsB
                className="mb-4"
                color="info"
                inverse
                value="12.124"
                title="Widget title"
                progress={{ value: 89.9 }}
                text="Lorem ipsum dolor sit amet enim."
              />
            </CCol>
            <CCol xs={12} sm={6} lg={3}>
              <CWidgetStatsB
                className="mb-4"
                color="warning"
                inverse
                value="$98.111,00"
                title="Widget title"
                progress={{ value: 89.9 }}
                text="Lorem ipsum dolor sit amet enim."
              />
            </CCol>
            <CCol xs={12} sm={6} lg={3}>
              <CWidgetStatsB
                className="mb-4"
                color="primary"
                inverse
                value="2 TB"
                title="Widget title"
                progress={{ value: 89.9 }}
                text="Lorem ipsum dolor sit amet enim."
              />
            </CCol>
          </CRow>
        </DocsExample>
        <DocsExample href="/components/widgets/#cwidgetstatse">
          <CRow>
            <CCol sm={4} lg={2}>
              <CWidgetStatsE
                chart={
                  <CChartBar
                    className="mx-auto"
                    style={{ height: '40px', width: '80px' }}
                    data={{
                      labels: [
                        'M',
                        'T',
                        'W',
                        'T',
                        'F',
                        'S',
                        'S',
                        'M',
                        'T',
                        'W',
                        'T',
                        'F',
                        'S',
                        'S',
                        'M',
                      ],
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
                }
                className="mb-4"
                title="title"
                value="1,123"
              />
            </CCol>
            <CCol sm={4} lg={2}>
              <CWidgetStatsE
                chart={
                  <CChartBar
                    className="mx-auto"
                    style={{ height: '40px', width: '80px' }}
                    data={{
                      labels: [
                        'M',
                        'T',
                        'W',
                        'T',
                        'F',
                        'S',
                        'S',
                        'M',
                        'T',
                        'W',
                        'T',
                        'F',
                        'S',
                        'S',
                        'M',
                      ],
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
                }
                className="mb-4"
                title="title"
                value="1,123"
              />
            </CCol>
            <CCol sm={4} lg={2}>
              <CWidgetStatsE
                chart={
                  <CChartBar
                    className="mx-auto"
                    style={{ height: '40px', width: '80px' }}
                    data={{
                      labels: [
                        'M',
                        'T',
                        'W',
                        'T',
                        'F',
                        'S',
                        'S',
                        'M',
                        'T',
                        'W',
                        'T',
                        'F',
                        'S',
                        'S',
                        'M',
                      ],
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
                }
                className="mb-4"
                title="title"
                value="1,123"
              />
            </CCol>
            <CCol sm={4} lg={2}>
              <CWidgetStatsE
                chart={
                  <CChartLine
                    className="mx-auto"
                    style={{ height: '40px', width: '80px' }}
                    data={{
                      labels: [
                        'M',
                        'T',
                        'W',
                        'T',
                        'F',
                        'S',
                        'S',
                        'M',
                        'T',
                        'W',
                        'T',
                        'F',
                        'S',
                        'S',
                        'M',
                      ],
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
                }
                className="mb-4"
                title="title"
                value="1,123"
              />
            </CCol>
            <CCol sm={4} lg={2}>
              <CWidgetStatsE
                chart={
                  <CChartLine
                    className="mx-auto"
                    style={{ height: '40px', width: '80px' }}
                    data={{
                      labels: [
                        'M',
                        'T',
                        'W',
                        'T',
                        'F',
                        'S',
                        'S',
                        'M',
                        'T',
                        'W',
                        'T',
                        'F',
                        'S',
                        'S',
                        'M',
                      ],
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
                }
                className="mb-4"
                title="title"
                value="1,123"
              />
            </CCol>
            <CCol sm={4} lg={2}>
              <CWidgetStatsE
                chart={
                  <CChartLine
                    className="mx-auto"
                    style={{ height: '40px', width: '80px' }}
                    data={{
                      labels: [
                        'M',
                        'T',
                        'W',
                        'T',
                        'F',
                        'S',
                        'S',
                        'M',
                        'T',
                        'W',
                        'T',
                        'F',
                        'S',
                        'S',
                        'M',
                      ],
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
                }
                className="mb-4"
                title="title"
                value="1,123"
              />
            </CCol>
          </CRow>
        </DocsExample>
        <DocsExample href="/components/widgets/#cwidgetstatsf">
          <CRow>
            <CCol xs={12} sm={6} lg={3}>
              <CWidgetStatsF
                className="mb-3"
                icon={<CIcon width={24} icon={cilSettings} size="xl" />}
                title="income"
                value="$1.999,50"
                color="primary"
              />
            </CCol>
            <CCol xs={12} sm={6} lg={3}>
              <CWidgetStatsF
                className="mb-3"
                icon={<CIcon width={24} icon={cilUser} size="xl" />}
                title="income"
                value="$1.999,50"
                color="info"
              />
            </CCol>
            <CCol xs={12} sm={6} lg={3}>
              <CWidgetStatsF
                className="mb-3"
                icon={<CIcon width={24} icon={cilMoon} size="xl" />}
                title="income"
                value="$1.999,50"
                color="warning"
              />
            </CCol>
            <CCol xs={12} sm={6} lg={3}>
              <CWidgetStatsF
                className="mb-3"
                icon={<CIcon width={24} icon={cilBell} size="xl" />}
                title="income"
                value="$1.999,50"
                color="danger"
              />
            </CCol>
          </CRow>
        </DocsExample>
        <DocsExample href="/components/widgets/#cwidgetstatsf">
          <CRow>
            <CCol xs={12} sm={6} lg={3}>
              <CWidgetStatsF
                className="mb-3"
                icon={<CIcon width={24} icon={cilSettings} size="xl" />}
                title="income"
                value="$1.999,50"
                color="primary"
                footer={
                  <CLink
                    className="font-weight-bold font-xs text-medium-emphasis"
                    href="https://coreui.io/"
                    rel="noopener norefferer"
                    target="_blank"
                  >
                    View more
                    <CIcon icon={cilArrowRight} className="float-end" width={16} />
                  </CLink>
                }
              />
            </CCol>
            <CCol xs={12} sm={6} lg={3}>
              <CWidgetStatsF
                className="mb-3"
                icon={<CIcon width={24} icon={cilLaptop} size="xl" />}
                title="income"
                value="$1.999,50"
                color="info"
                footer={
                  <CLink
                    className="font-weight-bold font-xs text-medium-emphasis"
                    href="https://coreui.io/"
                    rel="noopener norefferer"
                    target="_blank"
                  >
                    View more
                    <CIcon icon={cilArrowRight} className="float-end" width={16} />
                  </CLink>
                }
              />
            </CCol>
            <CCol xs={12} sm={6} lg={3}>
              <CWidgetStatsF
                className="mb-3"
                icon={<CIcon width={24} icon={cilMoon} size="xl" />}
                title="income"
                value="$1.999,50"
                color="warning"
                footer={
                  <CLink
                    className="font-weight-bold font-xs text-medium-emphasis"
                    href="https://coreui.io/"
                    rel="noopener norefferer"
                    target="_blank"
                  >
                    View more
                    <CIcon icon={cilArrowRight} className="float-end" width={16} />
                  </CLink>
                }
              />
            </CCol>
            <CCol xs={12} sm={6} lg={3}>
              <CWidgetStatsF
                className="mb-3"
                icon={<CIcon width={24} icon={cilBell} size="xl" />}
                title="income"
                value="$1.999,50"
                color="danger"
                footer={
                  <CLink
                    className="font-weight-bold font-xs text-medium-emphasis"
                    href="https://coreui.io/"
                    rel="noopener norefferer"
                    target="_blank"
                  >
                    View more
                    <CIcon icon={cilArrowRight} className="float-end" width={16} />
                  </CLink>
                }
              />
            </CCol>
          </CRow>
        </DocsExample>
        <DocsExample href="/components/widgets/#cwidgetstatsf">
          <CRow>
            <CCol xs={12} sm={6} lg={3}>
              <CWidgetStatsF
                className="mb-3"
                icon={<CIcon width={24} icon={cilSettings} size="xl" />}
                padding={false}
                title="income"
                value="$1.999,50"
                color="primary"
              />
            </CCol>
            <CCol xs={12} sm={6} lg={3}>
              <CWidgetStatsF
                className="mb-3"
                icon={<CIcon width={24} icon={cilUser} size="xl" />}
                padding={false}
                title="income"
                value="$1.999,50"
                color="info"
              />
            </CCol>
            <CCol xs={12} sm={6} lg={3}>
              <CWidgetStatsF
                className="mb-3"
                icon={<CIcon width={24} icon={cilMoon} size="xl" />}
                padding={false}
                title="income"
                value="$1.999,50"
                color="warning"
              />
            </CCol>
            <CCol xs={12} sm={6} lg={3}>
              <CWidgetStatsF
                className="mb-3"
                icon={<CIcon width={24} icon={cilBell} size="xl" />}
                padding={false}
                title="income"
                value="$1.999,50"
                color="danger"
              />
            </CCol>
          </CRow>
        </DocsExample>
        <DocsExample href="/components/widgets/#cwidgetstatsd">
          <WidgetsBrand />
        </DocsExample>
        <DocsExample href="/components/widgets/#cwidgetstatsd">
          <WidgetsBrand withCharts />
        </DocsExample>
        <DocsExample href="/components/widgets/#cwidgetstatsc">
          <CCardGroup className="mb-4">
            <CWidgetStatsC
              icon={<CIcon icon={cilPeople} height={36} />}
              value="87.500"
              title="Visitors"
              progress={{ color: 'info', value: 75 }}
            />
            <CWidgetStatsC
              icon={<CIcon icon={cilUserFollow} height={36} />}
              value="385"
              title="New Clients"
              progress={{ color: 'success', value: 75 }}
            />
            <CWidgetStatsC
              icon={<CIcon icon={cilBasket} height={36} />}
              value="1238"
              title="Products sold"
              progress={{ color: 'warning', value: 75 }}
            />
            <CWidgetStatsC
              icon={<CIcon icon={cilChartPie} height={36} />}
              value="28%"
              title="Returning Visitors"
              progress={{ color: 'primary', value: 75 }}
            />
            <CWidgetStatsC
              icon={<CIcon icon={cilSpeedometer} height={36} />}
              value="5:34:11"
              title="Avg. Time"
              progress={{ color: 'danger', value: 75 }}
            />
          </CCardGroup>
        </DocsExample>
        <DocsExample href="/components/widgets/#cwidgetstatsc">
          <CRow>
            <CCol sm={6} md={2}>
              <CWidgetStatsC
                icon={<CIcon icon={cilPeople} height={36} />}
                value="87.500"
                title="Visitors"
                progress={{ color: 'info', value: 75 }}
                className="mb-4"
              />
            </CCol>
            <CCol sm={6} md={2}>
              <CWidgetStatsC
                icon={<CIcon icon={cilUserFollow} height={36} />}
                value="385"
                title="New Clients"
                progress={{ color: 'success', value: 75 }}
                className="mb-4"
              />
            </CCol>
            <CCol sm={6} md={2}>
              <CWidgetStatsC
                icon={<CIcon icon={cilBasket} height={36} />}
                value="1238"
                title="Products sold"
                progress={{ color: 'warning', value: 75 }}
                className="mb-4"
              />
            </CCol>
            <CCol sm={6} md={2}>
              <CWidgetStatsC
                icon={<CIcon icon={cilChartPie} height={36} />}
                value="28%"
                title="Returning Visitors"
                progress={{ color: 'primary', value: 75 }}
                className="mb-4"
              />
            </CCol>
            <CCol sm={6} md={2}>
              <CWidgetStatsC
                icon={<CIcon icon={cilSpeedometer} height={36} />}
                value="5:34:11"
                title="Avg. Time"
                progress={{ color: 'danger', value: 75 }}
                className="mb-4"
              />
            </CCol>
            <CCol sm={6} md={2}>
              <CWidgetStatsC
                icon={<CIcon icon={cilSpeech} height={36} />}
                value="972"
                title="comments"
                progress={{ color: 'info', value: 75 }}
                className="mb-4"
              />
            </CCol>
          </CRow>
        </DocsExample>
        <DocsExample href="/components/widgets/#cwidgetstatsc">
          <CRow>
            <CCol sm={6} md={2}>
              <CWidgetStatsC
                color="info"
                icon={<CIcon icon={cilPeople} height={36} />}
                value="87.500"
                title="Visitors"
                inverse
                progress={{ value: 75 }}
                className="mb-4"
              />
            </CCol>
            <CCol sm={6} md={2}>
              <CWidgetStatsC
                color="success"
                icon={<CIcon icon={cilUserFollow} height={36} />}
                value="385"
                title="New Clients"
                inverse
                progress={{ value: 75 }}
                className="mb-4"
              />
            </CCol>
            <CCol sm={6} md={2}>
              <CWidgetStatsC
                color="warning"
                icon={<CIcon icon={cilBasket} height={36} />}
                value="1238"
                title="Products sold"
                inverse
                progress={{ value: 75 }}
                className="mb-4"
              />
            </CCol>
            <CCol sm={6} md={2}>
              <CWidgetStatsC
                color="primary"
                icon={<CIcon icon={cilChartPie} height={36} />}
                value="28%"
                title="Returning Visitors"
                inverse
                progress={{ value: 75 }}
                className="mb-4"
              />
            </CCol>
            <CCol sm={6} md={2}>
              <CWidgetStatsC
                color="danger"
                icon={<CIcon icon={cilSpeedometer} height={36} />}
                value="5:34:11"
                title="Avg. Time"
                inverse
                progress={{ value: 75 }}
                className="mb-4"
              />
            </CCol>
            <CCol sm={6} md={2}>
              <CWidgetStatsC
                color="info"
                icon={<CIcon icon={cilSpeech} height={36} />}
                value="972"
                title="comments"
                inverse
                progress={{ value: 75 }}
                className="mb-4"
              />
            </CCol>
          </CRow>
        </DocsExample>
      </CCardBody>
    </CCard>
  )
}

export default Widgets
