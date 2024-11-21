import React, { FC, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'

export interface CTableResponsiveWrapperProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Make any table responsive across all viewports or pick a maximum breakpoint with which to have a responsive table up to.
   */
  responsive?: boolean | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
}

export const CTableResponsiveWrapper: FC<CTableResponsiveWrapperProps> = ({
  children,
  responsive,
  ...rest
}) => {
  return responsive ? (
    <div
      className={
        typeof responsive === 'boolean' ? 'table-responsive' : `table-responsive-${responsive}`
      }
      {...rest}
    >
      {children}
    </div>
  ) : (
    <>{children}</>
  )
}

CTableResponsiveWrapper.propTypes = {
  children: PropTypes.node,
  responsive: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf<'sm' | 'md' | 'lg' | 'xl' | 'xxl'>(['sm', 'md', 'lg', 'xl', 'xxl']),
  ]),
}

CTableResponsiveWrapper.displayName = 'CTableResponsiveWrapper'
