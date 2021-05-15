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

const AppHeaderDropdownTasks = () => {
  const itemsCount = 5
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle>
        <CIcon name="cil-list" />
        <CBadge shape="rounded-pill" color="warning">
          {itemsCount}
        </CBadge>
      </CDropdownToggle>
      <CDropdownMenu placement="bottom-end" className="pt-0">
        <CDropdownItem header tag="div" className="text-center" color="light">
          <strong>You have {itemsCount} pending tasks</strong>
        </CDropdownItem>
        <CDropdownItem className="d-block">
          <div className="small mb-1">
            Upgrade NPM &amp; Bower{' '}
            <span className="float-end">
              <strong>0%</strong>
            </span>
          </div>
          <CProgress size="xs" color="info" value={0} />
        </CDropdownItem>
        <CDropdownItem className="d-block">
          <div className="small mb-1">
            ReactJS Version{' '}
            <span className="float-end">
              <strong>25%</strong>
            </span>
          </div>
          <CProgress size="xs" color="danger" value={25} />
        </CDropdownItem>
        <CDropdownItem className="d-block">
          <div className="small mb-1">
            VueJS Version{' '}
            <span className="float-end">
              <strong>50%</strong>
            </span>
          </div>
          <CProgress size="xs" color="warning" value={50} />
        </CDropdownItem>
        <CDropdownItem className="d-block">
          <div className="small mb-1">
            Add new layouts{' '}
            <span className="float-end">
              <strong>75%</strong>
            </span>
          </div>
          <CProgress size="xs" color="info" value={75} />
        </CDropdownItem>
        <CDropdownItem className="d-block">
          <div className="small mb-1">
            Angular 2 Cli Version{' '}
            <span className="float-end">
              <strong>100%</strong>
            </span>
          </div>
          <CProgress size="xs" color="success" value={100} />
        </CDropdownItem>
        <CDropdownItem className="text-center border-top">
          <strong>View all tasks</strong>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdownTasks
