import React from 'react'
import { CLink } from '@coreui/react'

const DocsLink = (props) => {
  const { name, text, ...rest } = props

  const href = name ? `https://coreui.io/react/docs/components/${name}` : props.href

  return (
    <div className="float-end">
      <CLink
        {...rest}
        href={href}
        rel="noreferrer noopener"
        target="_blank"
        className="card-header-action"
      >
        <small className="text-medium-emphasis">{text || 'docs'}</small>
      </CLink>
    </div>
  )
}

export default React.memo(DocsLink)
