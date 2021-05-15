import React from 'react'
import { CLink, CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react'

const Example = (props) => {
  const { children, href, ...rest } = props

  // const href = name ? `https://coreui.io/react/docs/components/${name}` : props.href

  return (
    <>
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
      <CTabContent>
        <CTabPane visible>{children}</CTabPane>
      </CTabContent>
    </>
  )
}

export default React.memo(Example)
