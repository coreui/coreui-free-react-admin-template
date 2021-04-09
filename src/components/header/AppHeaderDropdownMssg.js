import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImage
} from '@coreui/react-ts'
import CIcon from '@coreui/icons-react'

const AppHeaderDropdownMssg = () => {
  const itemsCount = 4
  return (
    <CDropdown
      variant="nav-item"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon name="cil-envelope-open" /><CBadge shape="rounded-pill" color="info">{itemsCount}</CBadge>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
        >
          <strong>You have {itemsCount} messages</strong>
        </CDropdownItem>
        <CDropdownItem href="#">
          <div className="message">
            <div className="pt-3 me-3 float-start">
              <CAvatar image={'avatars/7.jpg'} status="success" />
            </div>
            <div>
              <small className="text-muted">John Doe</small>
              <small className="text-muted float-end mt-1">Just now</small>
            </div>
            <div className="text-truncate font-weight-bold">
              <span className="fa fa-exclamation text-danger"></span> Important message
            </div>
            <div className="small text-muted text-truncate">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...
            </div>
          </div>
        </CDropdownItem>

        <CDropdownItem href="#">
          <div className="message">
            <div className="pt-3 me-3 float-start">
              <CAvatar image={'avatars/6.jpg'} status="warning" />
            </div>
            <div>
              <small className="text-muted">Jane Dovve</small>
              <small className="text-muted float-end mt-1">5 minutes ago</small>
            </div>
            <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
            <div className="small text-muted text-truncate">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...
            </div>
          </div>
        </CDropdownItem>

        <CDropdownItem href="#">
          <div className="message">
            <div className="pt-3 me-3 float-start">
              <CAvatar image={'avatars/5.jpg'} status="danger" />
            </div>
            <div>
              <small className="text-muted">Janet Doe</small>
              <small className="text-muted float-end mt-1">1:52 PM</small>
            </div>
            <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
            <div className="small text-muted text-truncate">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...
            </div>
          </div>
        </CDropdownItem>

        <CDropdownItem href="#">
          <div className="message">
            <div className="pt-3 me-3 float-start">
              <CAvatar image={'avatars/4.jpg'} status="info" />
            </div>
            <div>
              <small className="text-muted">Joe Doe</small>
              <small className="text-muted float-end mt-1">4:03 AM</small>
            </div>
            <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
            <div className="small text-muted text-truncate">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...
            </div>
          </div>
        </CDropdownItem>
        <CDropdownItem href="#" className="text-center border-top"><strong>View all messages</strong></CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdownMssg
