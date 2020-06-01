import React from 'react'
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader
} from '@coreui/react'
import {
  CChartBar,
  CChartLine,
  CChartDoughnut,
  CChartRadar,
  CChartPie,
  CChartPolarArea
} from '@coreui/react-chartjs'

const Charts = () => {

  return (
    <CCardGroup columns className = "cols-2" >
      <CCard>
        <CCardHeader>
          Bar Chart
          <div className="card-header-actions">
            <a href="http://www.chartjs.org" className="card-header-action">
              <small className="text-muted">docs</small>
            </a>
          </div>
        </CCardHeader>
        <CCardBody>
          <CChartBar
            type="bar"
            datasets={[
              {
                label: 'GitHub Commits',
                backgroundColor: '#f87979',
                data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
              }
            ]}
            labels="months"
            options={{
              tooltips: {
                enabled: true
              }
            }}
          />
        </CCardBody>
      </CCard>

      <CCard>
        <CCardHeader>
          Doughnut Chart
        </CCardHeader>
        <CCardBody>
          <CChartDoughnut
            type="doughnut"
            datasets={[
              {
                backgroundColor: [
                  '#41B883',
                  '#E46651',
                  '#00D8FF',
                  '#DD1B16'
                ],
                data: [40, 20, 80, 10]
              }
            ]}
            labels={['VueJs', 'EmberJs', 'ReactJs', 'AngularJs']}
            options={{
              tooltips: {
                enabled: true
              }
            }}
          />
        </CCardBody>
      </CCard>

      <CCard>
        <CCardHeader>
          Line Chart
        </CCardHeader>
        <CCardBody>
          <CChartLine
            type="line"
            datasets={[
              {
                label: 'Data One',
                backgroundColor: 'rgb(228,102,81,0.9)',
                data: [30, 39, 10, 50, 30, 70, 35]
              },
              {
                label: 'Data Two',
                backgroundColor: 'rgb(0,216,255,0.9)',
                data: [39, 80, 40, 35, 40, 20, 45]
              }
            ]}
            options={{
              tooltips: {
                enabled: true
              }
            }}
            labels="months"
          />
        </CCardBody>
      </CCard>

      <CCard>
        <CCardHeader>
          Pie Chart
        </CCardHeader>
        <CCardBody>
          <CChartPie
            type="pie"
            datasets={[
              {
                backgroundColor: [
                  '#41B883',
                  '#E46651',
                  '#00D8FF',
                  '#DD1B16'
                ],
                data: [40, 20, 80, 10]
              }
            ]}
            labels={['VueJs', 'EmberJs', 'ReactJs', 'AngularJs']}
            options={{
              tooltips: {
                enabled: true
              }
            }}
          />
        </CCardBody>
      </CCard>

      <CCard>
        <CCardHeader>
          Polar Area Chart
        </CCardHeader>
        <CCardBody>
          <CChartPolarArea
            type="polarArea"
            datasets={[
              {
                label: 'My First dataset',
                backgroundColor: 'rgba(179,181,198,0.2)',
                pointBackgroundColor: 'rgba(179,181,198,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: 'rgba(179,181,198,1)',
                pointHoverBorderColor: 'rgba(179,181,198,1)',
                data: [65, 59, 90, 81, 56, 55, 40]
              },
              {
                label: 'My Second dataset',
                backgroundColor: 'rgba(255,99,132,0.2)',
                pointBackgroundColor: 'rgba(255,99,132,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: 'rgba(255,99,132,1)',
                pointHoverBorderColor: 'rgba(255,99,132,1)',
                data: [28, 48, 40, 19, 96, 27, 100]
              }
            ]}
            options={{
              aspectRatio: 1.5,
              tooltips: {
                enabled: true
              }
            }}
            labels={[
              'Eating', 'Drinking', 'Sleeping', 'Designing',
              'Coding', 'Cycling', 'Running'
            ]}
          />
        </CCardBody>
      </CCard>

      <CCard>
        <CCardHeader>
          Radar Chart
        </CCardHeader>
        <CCardBody>
          <CChartRadar
            type="radar"
            datasets={[
              {
                label: '2019',
                backgroundColor: 'rgba(179,181,198,0.2)',
                borderColor: 'rgba(179,181,198,1)',
                pointBackgroundColor: 'rgba(179,181,198,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(179,181,198,1)',
                tooltipLabelColor: 'rgba(179,181,198,1)',
                data: [65, 59, 90, 81, 56, 55, 40]
              },
              {
                label: '2020',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                pointBackgroundColor: 'rgba(255,99,132,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(255,99,132,1)',
                tooltipLabelColor: 'rgba(255,99,132,1)',
                data: [28, 48, 40, 19, 96, 27, 100]
              }
            ]}
            options={{
              aspectRatio: 1.5,
              tooltips: {
                enabled: true
              }
            }}
            labels={[
              'Eating', 'Drinking', 'Sleeping', 'Designing',
              'Coding', 'Cycling', 'Running'
            ]}
          />
        </CCardBody>
      </CCard>
    </CCardGroup>
  )
}

export default Charts
