import React from 'react'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetDropdown,
} from '@coreui/react-ts'
import CIcon from '@coreui/icons-react'
import ChartLineSimple from '../charts/ChartLineSimple'
import ChartBarSimple from '../charts/ChartBarSimple'

const WidgetsDropdown = () => {
  // render
  return (
    <CRow>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          className="mb-4"
          color="primary"
          value="9.823"
          title="Members online"
          action={
            <CDropdown>
              <CDropdownToggle color="transparent" caret={false}>
                <CIcon name="cil-options" className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              {/* TODO: placement doesn't work */}
              <CDropdownMenu placement="bottom-end">
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <ChartLineSimple
              pointed
              className="chart-wrapper mt-3 mx-3"
              style={{ height: '70px' }}
              dataPoints={[65, 59, 84, 84, 51, 55, 40]}
              pointHoverBackgroundColor="primary"
              label="Members"
              labels="months"
            />
          }
        />
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          className="mb-4"
          color="info"
          value="9.823"
          title="Members online"
          action={
            <CDropdown>
              <CDropdownToggle color="transparent" caret={false}>
                <CIcon name="cil-options" className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu placement="bottom-end">
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <ChartLineSimple
              pointed
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              dataPoints={[1, 18, 9, 17, 34, 22, 11]}
              pointHoverBackgroundColor="info"
              options={{ elements: { line: { tension: 0.00001 } } }}
              label="Members"
              labels="months"
            />
          }
        />
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          className="mb-4"
          color="warning"
          value="9.823"
          title="Members online"
          action={
            <CDropdown>
              <CDropdownToggle color="transparent" caret={false}>
                <CIcon name="cil-options" className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu placement="bottom-end">
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <ChartLineSimple
              className="mt-3"
              style={{ height: '70px' }}
              backgroundColor="rgba(255,255,255,.2)"
              dataPoints={[78, 81, 80, 45, 34, 12, 40]}
              options={{ elements: { line: { borderWidth: 2.5 } } }}
              pointHoverBackgroundColor="warning"
              label="Members"
              labels="months"
            />
          }
        />
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          className="mb-4"
          color="danger"
          value="9.823"
          title="Members online"
          action={
            <CDropdown>
              <CDropdownToggle color="transparent" caret={false}>
                <CIcon name="cil-options" className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu placement="bottom-end">
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <ChartBarSimple
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              backgroundColor="rgb(250, 152, 152)"
              label="Members"
              labels="months"
            />
          }
        />
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
