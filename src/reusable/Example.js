import PropTypes from 'prop-types'
import React from 'react'
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import packageJson from '../../package.json'

const Example = (props) => {
  const { children, href } = props

  const _href = `https://coreui.io/react/docs/${packageJson.config.coreui_library_short_version}/${href}`

  return (
    <div className="example">
      <CNav variant="tabs">
        <CNavItem>
          <CNavLink href="#" active>
            <CIcon name="cil-media-play" className="me-2" />
            Preview
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href={_href} target="_blank">
            <CIcon name="cil-code" className="me-2" />
            Code
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent className="rounded-bottom">
        <CTabPane className="p-3 preview" visible>
          {children}
        </CTabPane>
      </CTabContent>
    </div>
  )
}

Example.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
}

export default React.memo(Example)
