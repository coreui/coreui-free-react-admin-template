import React from 'react'
import PropTypes from 'prop-types'
import { CWidgetBrand, CRow, CCol } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { CChart } from '@coreui/react-chartjs'

const WidgetsBrand = ({ withCharts }) => {
  const chartOptions = {
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      },
    },
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

  return (
    <CRow>
      <CCol sm="6" lg="3">
        <CWidgetBrand
          className="mb-4"
          headerChildren={
            <>
              <CIcon name="cib-facebook" height="52" className="my-4 text-white" />
              {withCharts && (
                <CChart
                  className="position-absolute w-100 h-100"
                  type="line"
                  data={{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [
                      {
                        backgroundColor: 'rgba(255,255,255,.1)',
                        borderColor: 'rgba(255,255,255,.55)',
                        pointHoverBackgroundColor: '#fff',
                        borderWidth: 2,
                        data: [65, 59, 84, 84, 51, 55, 40],
                        fill: true,
                      },
                    ],
                  }}
                  options={chartOptions}
                />
              )}
            </>
          }
          values={[
            ['89k', 'friends'],
            ['459', 'feeds'],
          ]}
          style={{
            '--cui-card-cap-bg': '#3b5998',
          }}
        />
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetBrand
          className="mb-4"
          headerChildren={
            <>
              <CIcon name="cib-twitter" height="52" className="my-4 text-white" />
              {withCharts && (
                <CChart
                  className="position-absolute w-100 h-100"
                  type="line"
                  data={{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [
                      {
                        backgroundColor: 'rgba(255,255,255,.1)',
                        borderColor: 'rgba(255,255,255,.55)',
                        pointHoverBackgroundColor: '#fff',
                        borderWidth: 2,
                        data: [1, 13, 9, 17, 34, 41, 38],
                        fill: true,
                      },
                    ],
                  }}
                  options={chartOptions}
                />
              )}
            </>
          }
          values={[
            ['973k', 'followers'],
            ['1.792', 'tweets'],
          ]}
          style={{
            '--cui-card-cap-bg': '#00aced',
          }}
        />
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetBrand
          className="mb-4"
          headerChildren={
            <>
              <CIcon name="cib-linkedin" height="52" className="my-4 text-white" />
              {withCharts && (
                <CChart
                  className="position-absolute w-100 h-100"
                  type="line"
                  data={{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [
                      {
                        backgroundColor: 'rgba(255,255,255,.1)',
                        borderColor: 'rgba(255,255,255,.55)',
                        pointHoverBackgroundColor: '#fff',
                        borderWidth: 2,
                        data: [78, 81, 80, 45, 34, 12, 40],
                        fill: true,
                      },
                    ],
                  }}
                  options={chartOptions}
                />
              )}
            </>
          }
          values={[
            ['500+', 'contacts'],
            ['292', 'feeds'],
          ]}
          style={{
            '--cui-card-cap-bg': '#4875b4',
          }}
        />
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetBrand
          className="mb-4"
          color="warning"
          headerChildren={
            <>
              <CIcon name="cil-calendar" height="52" className="my-4 text-white" />
              {withCharts && (
                <CChart
                  className="position-absolute w-100 h-100"
                  type="line"
                  data={{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [
                      {
                        backgroundColor: 'rgba(255,255,255,.1)',
                        borderColor: 'rgba(255,255,255,.55)',
                        pointHoverBackgroundColor: '#fff',
                        borderWidth: 2,
                        data: [35, 23, 56, 22, 97, 23, 64],
                        fill: true,
                      },
                    ],
                  }}
                  options={chartOptions}
                />
              )}
            </>
          }
          values={[
            ['12+', 'events'],
            ['4', 'meetings'],
          ]}
        />
      </CCol>
    </CRow>
  )
}

WidgetsBrand.propTypes = {
  withCharts: PropTypes.bool,
}

export default WidgetsBrand
