import React, { FC, ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'

const getContainer = (
  container?: DocumentFragment | Element | (() => DocumentFragment | Element | null) | null,
) => {
  if (container) {
    return typeof container === 'function' ? container() : container
  }

  return document.body
}

export interface CConditionalPortalProps {
  /**
   * @ignore
   */
  children: ReactNode
  /**
   * An HTML element or function that returns a single element, with `document.body` as the default.
   *
   * @since 4.11.0
   */
  container?: DocumentFragment | Element | (() => DocumentFragment | Element | null) | null
  /**
   * Render some children into a different part of the DOM
   */
  portal: boolean
}

export const CConditionalPortal: FC<CConditionalPortalProps> = ({
  children,
  container,
  portal,
}) => {
  const [_container, setContainer] = useState<ReturnType<typeof getContainer>>(null)

  useEffect(() => {
    portal && setContainer(getContainer(container) || document.body)
  }, [container, portal])

  return typeof window !== 'undefined' && portal && _container ? (
    createPortal(children, _container)
  ) : (
    <>{children}</>
  )
}

CConditionalPortal.propTypes = {
  children: PropTypes.node,
  container: PropTypes.any, // HTMLElement
  portal: PropTypes.bool.isRequired,
}

CConditionalPortal.displayName = 'CConditionalPortal'
