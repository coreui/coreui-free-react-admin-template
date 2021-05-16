import React from 'react'
import { CLink, CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react'

const Example = (props) => {
  const { children, href, ...rest } = props

  // const href = name ? `https://coreui.io/react/docs/components/${name}` : props.href

  return (
    <div className="example">
      <CNav variant="tabs">
        <CNavItem>
          <CNavLink href="#" active>
            Preview
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href={href} target="_blank">
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

export default React.memo(Example)
