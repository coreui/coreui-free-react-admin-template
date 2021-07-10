import PropTypes from 'prop-types'
import React from 'react'
import { CLink } from '@coreui/react'

const DocsLink = (props) => {
  const { href, name, text, ...rest } = props

  const _href = name ? `https://coreui.io/react/docs/components/${name}` : href

  return (
    <div className="float-end">
      <CLink
        {...rest}
        href={_href}
        rel="noreferrer noopener"
        target="_blank"
        className="card-header-action"
      >
        <small className="text-medium-emphasis">{text || 'docs'}</small>
      </CLink>
    </div>
  )
}

DocsLink.propTypes = {
  href: PropTypes.string,
  name: PropTypes.string,
  text: PropTypes.string,
}

export default React.memo(DocsLink)
