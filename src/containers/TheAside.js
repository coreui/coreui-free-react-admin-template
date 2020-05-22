import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CNav,
  CNavItem,
  CNavLink,
  CTabs,
  CTabContent,
  CTabPane,
  CListGroup,
  CListGroupItem,
  CSwitch,
  CProgress,
  CSidebar,
  CImg,
  CSidebarClose
} from '@coreui/react'
import { CIcon } from '@coreui/icons-react'

const TheAside = () => {
  const show = useSelector(state => state.asideShow)
  const dispatch = useDispatch()
  const setState = (state) => dispatch({type: 'set', asideShow: state})
  
  return (
    <CSidebar
      aside
      colorScheme='light'
      size='lg'
      overlaid
      show={show}
      onShowChange={(state) => setState(state)}
    >
      <CSidebarClose onClick={() => setState(false) } />
      <CTabs>
        <CNav variant='tabs' className='nav-underline nav-underline-primary'>
          <CNavItem>
            <CNavLink>
              <CIcon name="cil-list" alt="CoreUI Icons List" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink>
              <CIcon name="cil-speech" alt="CoreUI Icons Speech" />
              </CNavLink>
            </CNavItem>
          <CNavItem>
            <CNavLink>
              <CIcon name="cil-settings" alt="CoreUI Icons Settings" />
            </CNavLink>
          </CNavItem>
        </CNav>

        <CTabContent>

          <CTabPane>
            <CListGroup variant="accent">
              <CListGroupItem color="secondary" className="bg-light text-center font-weight-bold text-muted text-uppercase small">Today</CListGroupItem>
              <CListGroupItem accent="warning" href="#" className="list-group-item-divider">
                <div className="c-avatar float-right">
                  <CImg
                    className="c-avatar-img"
                    src="avatars/7.jpg"
                    alt="admin@bootstrapmaster.com"
                  />
                </div>
                <div>Meeting with <strong>Lucas</strong></div>
                <small className="text-muted mr-3"><CIcon name="cil-calendar" /> 1 - 3pm</small>
                <small className="text-muted"><CIcon name="cil-location-pin" /> Palo Alto, CA</small>
              </CListGroupItem>
              <CListGroupItem accent="info" href="#">
                <div className="c-avatar float-right">
                  <CImg
                    className="c-avatar-img"
                    src="avatars/4.jpg"
                    alt="admin@bootstrapmaster.com"
                  />
                </div>
                <div>Skype with <strong>Megan</strong></div>
                <small className="text-muted mr-3"><CIcon name="cil-calendar" />  4 - 5pm</small>
                <small className="text-muted"><CIcon name="cib-skype" />  On-line</small>
              </CListGroupItem>
              <hr className="transparent mx-3 my-0" />
              <CListGroupItem color="secondary" className="bg-light text-center font-weight-bold text-muted text-uppercase small">Tomorrow</CListGroupItem>
              <CListGroupItem accent="danger" href="#" className="list-group-item-divider">
                <div>New UI Project - <strong>deadline</strong></div>
                <small className="text-muted mr-3"><CIcon name="cil-calendar" /> 10 - 11pm</small>
                <small className="text-muted"><CIcon name="cil-home" /> creativeLabs HQ</small>
                <div className="c-avatars-stack mt-2">
                  <div className="c-avatar c-avatar-xs"><CImg className="c-avatar-img" src="avatars/2.jpg" alt="admin@bootstrapmaster.com" /></div>
                  <div className="c-avatar c-avatar-xs"><CImg className="c-avatar-img" src="avatars/3.jpg" alt="admin@bootstrapmaster.com" /></div>
                  <div className="c-avatar c-avatar-xs"><CImg className="c-avatar-img" src="avatars/4.jpg" alt="admin@bootstrapmaster.com" /></div>
                  <div className="c-avatar c-avatar-xs"><CImg className="c-avatar-img" src="avatars/5.jpg" alt="admin@bootstrapmaster.com" /></div>
                  <div className="c-avatar c-avatar-xs"><CImg className="c-avatar-img" src="avatars/6.jpg" alt="admin@bootstrapmaster.com" /></div>
                </div>
              </CListGroupItem>
              <CListGroupItem accent="success" href="#" className="c-list-group-item-divider">
                <div><strong>#10 Startups.Garden</strong> Meetup</div>
                <small className="text-muted mr-3"><CIcon name="cil-calendar" /> 1 - 3pm</small>
                <small className="text-muted"><CIcon name="cil-location-pin" /> Palo Alto, CA</small>
              </CListGroupItem>
              <CListGroupItem accent="primary" href="#" className="c-list-group-item-divider">
                <div><strong>Team meeting</strong></div>
                <small className="text-muted mr-3"><CIcon name="cil-calendar" /> 4 - 6pm</small>
                <small className="text-muted"><CIcon name="cil-home" /> creativeLabs HQ</small>
                <div className="c-avatars-stack mt-2">
                  <div className="c-avatar c-avatar-xs"><CImg className="c-avatar-img" src="avatars/2.jpg" alt="admin@bootstrapmaster.com" /></div>
                  <div className="c-avatar c-avatar-xs"><CImg className="c-avatar-img" src="avatars/3.jpg" alt="admin@bootstrapmaster.com" /></div>
                  <div className="c-avatar c-avatar-xs"><CImg className="c-avatar-img" src="avatars/4.jpg" alt="admin@bootstrapmaster.com" /></div>
                  <div className="c-avatar c-avatar-xs"><CImg className="c-avatar-img" src="avatars/5.jpg" alt="admin@bootstrapmaster.com" /></div>
                  <div className="c-avatar c-avatar-xs"><CImg className="c-avatar-img" src="avatars/6.jpg" alt="admin@bootstrapmaster.com" /></div>
                  <div className="c-avatar c-avatar-xs"><CImg className="c-avatar-img" src="avatars/7.jpg" alt="admin@bootstrapmaster.com" /></div>
                  <div className="c-avatar c-avatar-xs"><CImg className="c-avatar-img" src="avatars/8.jpg" alt="admin@bootstrapmaster.com" /></div>
                </div>
              </CListGroupItem>
            </CListGroup>
          </CTabPane>

          <CTabPane className="p-3">
            <div className="message">
              <div className="py-3 pb-5 mr-3 float-left">
                <div className="c-avatar">
                  <CImg className="c-avatar-img" src="avatars/7.jpg" alt="admin@bootstrapmaster.com" />
                  <span className="c-avatar-status bg-success"></span>
                </div>
              </div>
              <div>
                <small className="text-muted">Lukasz Holeczek</small>
                <small className="text-muted float-right mt-1">1:52 PM</small>
              </div>
              <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
              <small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...</small>
            </div>
            <hr />
            <div className="message">
              <div className="py-3 pb-5 mr-3 float-left">
                <div className="c-avatar">
                  <CImg className="c-avatar-img" src="avatars/7.jpg" alt="admin@bootstrapmaster.com" />
                  <span className="c-avatar-status bg-success"></span>
                </div>
              </div>
              <div>
                <small className="text-muted">Lukasz Holeczek</small>
                <small className="text-muted float-right mt-1">1:52 PM</small>
              </div>
              <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
              <small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...</small>
            </div>
            <hr />
            <div className="message">
              <div className="py-3 pb-5 mr-3 float-left">
                <div className="c-avatar">
                  <CImg className="c-avatar-img" src="avatars/7.jpg" alt="admin@bootstrapmaster.com" />
                  <span className="c-avatar-status bg-success"></span>
                </div>
              </div>
              <div>
                <small className="text-muted">Lukasz Holeczek</small>
                <small className="text-muted float-right mt-1">1:52 PM</small>
              </div>
              <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
              <small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...</small>
            </div>
            <hr />
            <div className="message">
              <div className="py-3 pb-5 mr-3 float-left">
                <div className="c-avatar">
                  <CImg className="c-avatar-img" src="avatars/7.jpg" alt="admin@bootstrapmaster.com" />
                  <span className="c-avatar-status bg-success"></span>
                </div>
              </div>
              <div>
                <small className="text-muted">Lukasz Holeczek</small>
                <small className="text-muted float-right mt-1">1:52 PM</small>
              </div>
              <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
              <small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...</small>
            </div>
            <hr />
            <div className="message">
              <div className="py-3 pb-5 mr-3 float-left">
                <div className="c-avatar">
                  <CImg className="c-avatar-img" src="avatars/7.jpg" alt="admin@bootstrapmaster.com" />
                  <span className="c-avatar-status bg-success"></span>
                </div>
              </div>
              <div>
                <small className="text-muted">Lukasz Holeczek</small>
                <small className="text-muted float-right mt-1">1:52 PM</small>
              </div>
              <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
              <small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...</small>
            </div>
          </CTabPane>

          <CTabPane className="p-3">
            <h6>Settings</h6>
            <div>
              <div className="clearfix mt-4"><small><b>Option 1</b></small>
                <CSwitch className="float-right" shape="pill" variant="opposite" color="success" size="sm" labelOn="on" labelOff="off" defaultChecked />
              </div>
              <div><small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</small></div>
            </div>
            <div>
              <div className="clearfix mt-3"><small><b>Option 2</b></small>
                <CSwitch className="float-right" shape="pill" variant="opposite" color="success" size="sm" labelOn="on" labelOff="off" />
              </div>
              <div><small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</small></div>
            </div>
            <div>
              <div className="clearfix mt-3"><small><b>Option 3</b></small>
                <CSwitch className="float-right" shape="pill" variant="opposite" color="success" size="sm" labelOn="on" labelOff="off" />
              </div>
            </div>
            <div>
              <div className="clearfix mt-3"><small><b>Option 4</b></small>
                <CSwitch className="float-right" shape="pill" variant="opposite" color="success" size="sm" labelOn="on" labelOff="off" defaultChecked />
              </div>
            </div>
            <hr />
            <h6>System Utilization</h6>
            <div className="text-uppercase mb-1 mt-4"><small><b>CPU Usage</b></small></div>
            <CProgress size="xs" color="info" value={25} />
            <small className="text-muted">348 Processes. 1/4 Cores.</small>
            <div className="text-uppercase mb-1 mt-2"><small><b>Memory Usage</b></small></div>
            <CProgress size="xs" color="warning" value={70} />
            <small className="text-muted">11444GB/16384MB</small>
            <div className="text-uppercase mb-1 mt-2"><small><b>SSD 1 Usage</b></small></div>
            <CProgress size="xs" color="danger" value={95} />
            <small className="text-muted">243GB/256GB</small>
            <div className="text-uppercase mb-1 mt-2"><small><b>SSD 2 Usage</b></small></div>
            <CProgress size="xs" color="success" value={10} />
            <small className="text-muted">25GB/256GB</small>
          </CTabPane>

        </CTabContent>
      </CTabs>
    </CSidebar>
  )
}

export default React.memo(TheAside)
