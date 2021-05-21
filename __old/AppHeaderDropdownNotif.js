import React from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CProgress,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const AppHeaderDropdownNotif = () => {
  const itemsCount = 5
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon name="cil-bell" />
        <CBadge shape="rounded-pill" color="danger">
          {itemsCount}
        </CBadge>
      </CDropdownToggle>
      <CDropdownMenu placement="bottom-end" className="pt-0">
        <CDropdownItem header tag="div" className="text-center" color="light">
          <strong>You have {itemsCount} notifications</strong>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-user-follow" className="me-2 text-success" /> New user registered
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-user-unfollow" className="me-2 text-danger" /> User deleted
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-chart-pie" className="me-2 text-info" /> Sales report is ready
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-basket" className="me-2 text-primary" /> New client
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-speedometer" className="me-2 text-warning" /> Server overloaded
        </CDropdownItem>
        <CDropdownItem header tag="div" color="light">
          <strong>Server</strong>
        </CDropdownItem>
        <CDropdownItem className="d-block">
          <div className="text-uppercase mb-1">
            <small>
              <b>CPU Usage</b>
            </small>
          </div>
          <CProgress size="xs" color="info" value={25} />
          <small className="text-medium-emphasis">348 Processes. 1/4 Cores.</small>
        </CDropdownItem>
        <CDropdownItem className="d-block">
          <div className="text-uppercase mb-1">
            <small>
              <b>Memory Usage</b>
            </small>
          </div>
          <CProgress size="xs" color="warning" value={70} />
          <small className="text-medium-emphasis">11444GB/16384MB</small>
        </CDropdownItem>
        <CDropdownItem className="d-block">
          <div className="text-uppercase mb-1">
            <small>
              <b>SSD 1 Usage</b>
            </small>
          </div>
          <CProgress size="xs" color="danger" value={90} />
          <small className="text-medium-emphasis">243GB/256GB</small>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdownNotif
