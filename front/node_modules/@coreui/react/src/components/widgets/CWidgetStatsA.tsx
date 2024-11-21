import React, { forwardRef, HTMLAttributes, ReactNode } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { CCard, CCardBody } from '../card'

import { colorPropType } from '../../props'
import type { Colors } from '../../types'

export interface CWidgetStatsAProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Action node for your component.
   */
  action?: ReactNode
  /**
   * Chart node for your component.
   */
  chart?: string | ReactNode
  /**
   * A string of all className you want applied to the base component.
   */
  className?: string
  /**
   * Sets the color context of the component to one of CoreUI’s themed colors.
   *
   * @type 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | string
   */
  color?: Colors
  /**
   * Title node for your component.
   */
  title?: string | ReactNode
  /**
   * Value node for your component.
   */
  value?: string | number | ReactNode
}

export const CWidgetStatsA = forwardRef<HTMLDivElement, CWidgetStatsAProps>(
  ({ action, chart, className, color, title, value, ...rest }, ref) => {
    return (
      <CCard
        className={classNames({ [`bg-${color}`]: color, 'text-white': color }, className)}
        {...rest}
        ref={ref}
      >
        <CCardBody className="pb-0 d-flex justify-content-between align-items-start">
          <div>
            {value && <div className="fs-4 fw-semibold">{value}</div>}
            {title && <div>{title}</div>}
          </div>
          {action}
        </CCardBody>
        {chart}
      </CCard>
    )
  },
)

CWidgetStatsA.propTypes = {
  action: PropTypes.node,
  chart: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  className: PropTypes.string,
  color: colorPropType,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.number]),
}

CWidgetStatsA.displayName = 'CWidgetStatsA'
