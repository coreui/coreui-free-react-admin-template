import React, { forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export interface CDropdownDividerProps extends HTMLAttributes<HTMLHRElement> {
  /**
   * A string of all className you want applied to the component.
   */
  className?: string
}

export const CDropdownDivider = forwardRef<HTMLHRElement, CDropdownDividerProps>(
  ({ className, ...rest }, ref) => {
    return <hr className={classNames('dropdown-divider', className)} {...rest} ref={ref} />
  },
)

CDropdownDivider.propTypes = {
  className: PropTypes.string,
}

CDropdownDivider.displayName = 'CDropdownDivider'
