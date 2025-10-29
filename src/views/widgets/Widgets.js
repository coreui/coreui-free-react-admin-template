import React, { useMemo } from 'react'
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

// Constants
const CHART_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S', 'M']

const COMMON_CHART_OPTIONS = {
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
}

const LINE_CHART_OPTIONS = {
  ...COMMON_CHART_OPTIONS,
  elements: {
    line: {
      tension: 0.4,
    },
    point: {
      radius: 0,
    },
  },
}

// Helper to generate random data
const generateRandomData = (count, min = 40, max = 100) =>
  Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1) + min))

// Footer component for widgets
const WidgetFooter = () => (
  <CLink
    className="font-weight-bold font-xs text-body-secondary"
    href="https://coreui.io/"
    rel="noopener noreferrer" // Fixed typo: norefferer -> noreferrer
    target="_blank"
  >
    View more
    <CIcon icon={cilArrowRight} className="float-end" width={16} />
  </CLink>
)

// Chart factory functions
const createBarChartConfig = (color, data) => ({
  labels: CHART_LABELS,
  datasets: [
    {
      backgroundColor: getStyle(color),
      borderColor: 'transparent',
      borderWidth: 1,
      data,
    },
  ],
})

const createLineChartConfig = (color, data) => ({
  labels: CHART_LABELS,
  datasets: [
    {
      backgroundColor: 'transparent',
      borderColor: getStyle(color),
      borderWidth: 2,
      data,
    },
  ],
})

const Widgets = () => {
  // Generate random data once per render
  const chartData = useMemo(() => ({
    bar1: generateRandomData(15),
    bar2: generateRandomData(15),
    bar3: generateRandomData(15),
    line1: generateRandomData(15),
    line2: generateRandomData(15),
    line3: generateRandomData(15),
  }), [])

  // Reusable chart components
  const BarChart = ({ color, data }) => (
    <CChartBar
      className="mx-auto"
      style={{ height: '40px', width: '80px' }}
      data={createBarChartConfig(color, data)}
      options={COMMON_CHART_OPTIONS}
    />
  )

  const LineChart = ({ color, data }) => (
    <CChartLine
      className="mx-auto"
      style={{ height: '40px', width: '80px' }}
      data={createLineChartConfig(color, data)}
      options={LINE_CHART_OPTIONS}
    />
  )

  return (
    <CCard className="mb-4">
      <CCardHeader>Widgets</CCardHeader>
      <CCardBody>
        {/* CWidgetStatsA Example */}
        <DocsExample href="components/widgets/#cwidgetstatsa">
          <WidgetsDropdown />
        </DocsExample>

        {/* CWidgetStatsB Example - Default */}
        <DocsExample href="components/widgets/#cwidgetstatsb">
          <CRow xs={{ gutter: 4 }}>
            <CCol xs={12} sm={6} xl={4} xxl={3}>
              <CWidgetStatsB
                progress={{ color: 'success', value: 89.9 }}
                text="Lorem ipsum dolor sit amet enim."
                title="Widget title"
                value="89.9%"
              />
            </CCol>
            <CCol xs={12} sm={6} xl={4} xxl={3}>
              <CWidgetStatsB
                value="12.124"
                title="Widget title"
                progress={{ color: 'info', value: 89.9 }}
                text="Lorem ipsum dolor sit amet enim."
              />
            </CCol>
            <CCol xs={12} sm={6} xl={4} xxl={3}>
              <CWidgetStatsB
                value="$98.111,00"
                title="Widget title"
                progress={{ color: 'warning', value: 89.9 }}
                text="Lorem ipsum dolor sit amet enim."
              />
            </CCol>
            <CCol xs={12} sm={6} xl={4} xxl={3}>
              <CWidgetStatsB
                value="2 TB"
                title="Widget title"
                progress={{ color: 'primary', value: 89.9 }}
                text="Lorem ipsum dolor sit amet enim."
              />
            </CCol>
          </CRow>
        </DocsExample>

        {/* CWidgetStatsB Example - Inverse */}
        <DocsExample href="components/widgets/#cwidgetstatsb">
          <CRow xs={{ gutter: 4 }}>
            <CCol xs={12} sm={6} xl={4} xxl={3}>
              <CWidgetStatsB
                color="success"
                inverse
                value="89.9%"
                title="Widget title"
                progress={{ value: 89.9 }}
                text="Lorem ipsum dolor sit amet enim."
              />
            </CCol>
            <CCol xs={12} sm={6} xl={4} xxl={3}>
              <CWidgetStatsB
                color="info"
                inverse
                value="12.124"
                title="Widget title"
                progress={{ value: 89.9 }}
                text="Lorem ipsum dolor sit amet enim."
              />
            </CCol>
            <CCol xs={12} sm={6} xl={4} xxl={3}>
              <CWidgetStatsB
                color="warning"
                inverse
                value="$98.111,00"
                title="Widget title"
                progress={{ value: 89.9 }}
                text="Lorem ipsum dolor sit amet enim."
              />
            </CCol>
            <CCol xs={12} sm={6} xl={4} xxl={3}>
              <CWidgetStatsB
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

        {/* CWidgetStatsE Example - With Charts */}
        <DocsExample href="components/widgets/#cwidgetstatse">
          <CRow xs={{ gutter: 4 }}>
            <CCol sm={4} md={3} xl={2}>
              <CWidgetStatsE
                chart={<BarChart color="--cui-danger" data={chartData.bar1} />}
                title="title"
                value="1,123"
              />
            </CCol>
            <CCol sm={4} md={3} xl={2}>
              <CWidgetStatsE
                chart={<BarChart color="--cui-primary" data={chartData.bar2} />}
                title="title"
                value="1,123"
              />
            </CCol>
            <CCol sm={4} md={3} xl={2}>
              <CWidgetStatsE
                chart={<BarChart color="--cui-success" data={chartData.bar3} />}
                title="title"
                value="1,123"
              />
            </CCol>
            <CCol sm={4} md={3} xl={2}>
              <CWidgetStatsE
                chart={<LineChart color="--cui-danger" data={chartData.line1} />}
                title="title"
                value="1,123"
              />
            </CCol>
            <CCol sm={4} md={3} xl={2}>
              <CWidgetStatsE
                chart={<LineChart color="--cui-success" data={chartData.line2} />}
                title="title"
                value="1,123"
              />
            </CCol>
            <CCol sm={4} md={3} xl={2}>
              <CWidgetStatsE
                chart={<LineChart color="--cui-info" data={chartData.line3} />}
                title="title"
                value="1,123"
              />
            </CCol>
          </CRow>
        </DocsExample>

        {/* CWidgetStatsF Example - Basic */}
        <DocsExample href="components/widgets/#cwidgetstatsf">
          <CRow xs={{ gutter: 4 }}>
            <CCol xs={12} sm={6} xl={4} xxl={3}>
              <CWidgetStatsF
                icon={<CIcon width={24} icon={cilSettings} size="xl" />}
                title="income"
                value="$1.999,50"
                color="primary"
              />
            </CCol>
            <CCol xs={12} sm={6} xl={4} xxl={3}>
              <CWidgetStatsF
                icon={<CIcon width={24} icon={cilUser} size="xl" />}
                title="income"
                value="$1.999,50"
                color="info"
              />
            </CCol>
            <CCol xs={12} sm={6} xl={4} xxl={3}>
              <CWidgetStatsF
                icon={<CIcon width={24} icon={cilMoon} size="xl" />}
                title="income"
                value="$1.999,50"
                color="warning"
              />
            </CCol>
            <CCol xs={12} sm={6} xl={4} xxl={3}>
              <CWidgetStatsF
                icon={<CIcon width={24} icon={cilBell} size="xl" />}
                title="income"
                value="$1.999,50"
                color="danger"
              />
            </CCol>
          </CRow>
        </DocsExample>

        {/* CWidgetStatsF Example - With Footer */}
        <DocsExample href="components/widgets/#cwidgetstatf">
          <CRow xs={{ gutter: 4 }}>
            <CCol xs={12} sm={6} xl={4} xxl={3}>
              <CWidgetStatsF
                icon={<CIcon width={24} icon={cilSettings} size="xl" />}
                title="income"
                value="$1.999,50"
                color="primary"
                footer={<WidgetFooter />}
              />
            </CCol>
            <CCol xs={12} sm={6} xl={4} xxl={3}>
              <CWidgetStatsF
                icon={<CIcon width={24} icon={cilLaptop} size="xl" />}
                title="income"
                value="$1.999,50"
                color="info"
                footer={<WidgetFooter />}
              />
            </CCol>
            <CCol xs={12} sm={6} xl={4} xxl={3}>
              <CWidgetStatsF
                icon={<CIcon width={24} icon={cilMoon} size="xl" />}
                title="income"
                value="$1.999,50"
                color="warning"
                footer={<WidgetFooter />}
              />
            </CCol>
            <CCol xs={12} sm={6} xl={4} xxl={3}>
              <CWidgetStatsF
                icon={<CIcon width={24} icon={cilBell} size="xl" />}
                title="income"
                value="$1.999,50"
                color="danger"
                footer={<WidgetFooter />}
              />
            </CCol>
          </CRow>
        </DocsExample>

        {/* CWidgetStatsF Example - No Padding */}
        <DocsExample href="components/widgets/#cwidgetstatf">
          <CRow xs={{ gutter: 4 }}>
            <CCol xs={12} sm={6} xl={4} xxl={3}>
              <CWidgetStatsF
                icon={<CIcon width={24} icon={cilSettings} size="xl" />}
                padding={false}
                title="income"
                value="$1.999,50"
                color="primary"
              />
            </CCol>
            <CCol xs={12} sm={6} xl={4} xxl={3}>
              <CWidgetStatsF
                icon={<CIcon width={24} icon={cilUser} size="xl" />}
                padding={false}
                title="income"
                value="$1.999,50"
                color="info"
              />
            </CCol>
            <CCol xs={12} sm={6} xl={4} xxl={3}>
              <CWidgetStatsF
                icon={<CIcon width={24} icon={cilMoon} size="xl" />}
                padding={false}
                title="income"
                value="$1.999,50"
                color="warning"
              />
            </CCol>
            <CCol xs={12} sm={6} xl={4} xxl={3}>
              <CWidgetStatsF
                icon={<CIcon width={24} icon={cilBell} size="xl" />}
                padding={false}
                title="income"
                value="$1.999,50"
                color="danger"
              />
            </CCol>
          </CRow>
        </DocsExample>

        {/* WidgetsBrand Examples */}
        <DocsExample href="components/widgets/#cwidgetstatsd">
          <WidgetsBrand />
        </DocsExample>

        <DocsExample href="components/widgets/#cwidgetstatsd">
          <WidgetsBrand withCharts />
        </DocsExample>

        {/* CWidgetStatsC Example - Card Group */}
        <DocsExample href="components/widgets/#cwidgetstatsc">
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

        {/* CWidgetStatsC Example - Grid */}
        <DocsExample href="components/widgets/#cwidgetstatsc">
          <CRow xs={{ gutter: 4 }}>
            <CCol xs={6} lg={4} xxl={2}>
              <CWidgetStatsC
                icon={<CIcon icon={cilPeople} height={36} />}
                value="87.500"
                title="Visitors"
                progress={{ color: 'info', value: 75 }}
              />
            </CCol>
            <CCol xs={6} lg={4} xxl={2}>
              <CWidgetStatsC
                icon={<CIcon icon={cilUserFollow} height={36} />}
                value="385"
                title="New Clients"
                progress={{ color: 'success', value: 75 }}
              />
            </CCol>
            <CCol xs={6} lg={4} xxl={2}>
              <CWidgetStatsC
                icon={<CIcon icon={cilBasket} height={36} />}
                value="1238"
                title="Products sold"
                progress={{ color: 'warning', value: 75 }}
              />
            </CCol>
            <CCol xs={6} lg={4} xxl={2}>
              <CWidgetStatsC
                icon={<CIcon icon={cilChartPie} height={36} />}
                value="28%"
                title="Returning Visitors"
                progress={{ color: 'primary', value: 75 }}
              />
            </CCol>
            <CCol xs={6} lg={4} xxl={2}>
              <CWidgetStatsC
                icon={<CIcon icon={cilSpeedometer} height={36} />}
                value="5:34:11"
                title="Avg. Time"
                progress={{ color: 'danger', value: 75 }}
              />
            </CCol>
            <CCol xs={6} lg={4} xxl={2}>
              <CWidgetStatsC
                icon={<CIcon icon={cilSpeech} height={36} />}
                value="972"
                title="Comments"
                progress={{ color: 'info', value: 75 }}
              />
            </CCol>
          </CRow>
        </DocsExample>

        {/* CWidgetStatsC Example - Inverse */}
        <DocsExample href="components/widgets/#cwidgetstatsc">
          <CRow xs={{ gutter: 4 }}>
            <CCol xs={6} lg={4} xxl={2}>
              <CWidgetStatsC
                color="info"
                icon={<CIcon icon={cilPeople} height={36} />}
                value="87.500"
                title="Visitors"
                inverse
                progress={{ value: 75 }}
              />
            </CCol>
            <CCol xs={6} lg={4} xxl={2}>
              <CWidgetStatsC
                color="success"
                icon={<CIcon icon={cilUserFollow} height={36} />}
                value="385"
                title="New Clients"
                inverse
                progress={{ value: 75 }}
              />
            </CCol>
            <CCol xs={6} lg={4} xxl={2}>
              <CWidgetStatsC
                color="warning"
                icon={<CIcon icon={cilBasket} height={36} />}
                value="1238"
                title="Products sold"
                inverse
                progress={{ value: 75 }}
              />
            </CCol>
            <CCol xs={6} lg={4} xxl={2}>
              <CWidgetStatsC
                color="primary"
                icon={<CIcon icon={cilChartPie} height={36} />}
                value="28%"
                title="Returning Visitors"
                inverse
                progress={{ value: 75 }}
              />
            </CCol>
            <CCol xs={6} lg={4} xxl={2}>
              <CWidgetStatsC
                color="danger"
                icon={<CIcon icon={cilSpeedometer} height={36} />}
                value="5:34:11"
                title="Avg. Time"
                inverse
                progress={{ value: 75 }}
              />
            </CCol>
            <CCol xs={6} lg={4} xxl={2}>
              <CWidgetStatsC
                color="info"
                icon={<CIcon icon={cilSpeech} height={36} />}
                value="972"
                title="Comments"
                inverse
                progress={{ value: 75 }}
              />
            </CCol>
          </CRow>
        </DocsExample>
      </CCardBody>
    </CCard>
  )
}

export default Widgets