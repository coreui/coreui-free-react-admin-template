import React, { forwardRef, HTMLAttributes, ReactNode } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { CCard, CCardBody } from '../card'

export interface CWidgetStatsEProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * A string of all className you want applied to the base component.
   */
  className?: string
  /**
   * Chart node for your component.
   */
  chart?: string | ReactNode
  /**
   * Title node for your component.
   */
  title?: string | ReactNode
  /**
   * Value node for your component.
   */
  value?: string | number | ReactNode
}

export const CWidgetStatsE = forwardRef<HTMLDivElement, CWidgetStatsEProps>(
  ({ chart, className, title, value, ...rest }, ref) => {
    return (
      <CCard className={classNames(className)} {...rest} ref={ref}>
        <CCardBody className="text-center">
          {title && (
            <div className="text-body-secondary small text-uppercase fw-semibold">{title}</div>
          )}
          {value && <div className="fs-6 fw-semibold py-3">{value}</div>}
          {chart}
        </CCardBody>
      </CCard>
    )
  },
)

CWidgetStatsE.propTypes = {
  children: PropTypes.node,
  chart: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  className: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.number]),
}

CWidgetStatsE.displayName = 'CWidgetStatsE'
