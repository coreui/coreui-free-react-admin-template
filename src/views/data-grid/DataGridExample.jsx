import PropTypes from 'prop-types'
import React from 'react'
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCode, cilMediaPlay } from '@coreui/icons'

// Like the shared DocsExample, but href is an absolute URL — the Data Grid
// docs live on their own domain, not under coreui.io/react/docs/.
const DataGridExample = (props) => {
  const { children, href } = props

  return (
    <div className="example">
      <CNav variant="underline-border">
        <CNavItem>
          <CNavLink href="#" active>
            <CIcon icon={cilMediaPlay} className="me-2" />
            Preview
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href={href} target="_blank">
            <CIcon icon={cilCode} className="me-2" />
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

DataGridExample.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
}

export default React.memo(DataGridExample)
