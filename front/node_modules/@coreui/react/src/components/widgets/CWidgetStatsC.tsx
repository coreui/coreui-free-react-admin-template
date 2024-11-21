import React, { forwardRef, HTMLAttributes, ReactNode } from 'react'
import PropTypes from 'prop-types'

import { CCard, CCardBody } from '../card'
import { CProgress, CProgressProps } from '../progress/CProgress'

import { colorPropType } from '../../props'
import type { Colors } from '../../types'
import classNames from 'classnames'

export interface CWidgetStatsCProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
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
   * Icon node for your component.
   */
  icon?: string | ReactNode
  /**
   * Colors have been inverted from their default dark shade.
   */
  inverse?: boolean
  /**
   * Sets the color context of the progress bar to one of CoreUI’s themed colors.
   *
   * @type 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | string
   */
  progress?: CProgressProps
  /**
   * Title node for your component.
   */
  title?: string | ReactNode
  /**
   * Value node for your component.
   */
  value?: string | number | ReactNode
}

export const CWidgetStatsC = forwardRef<HTMLDivElement, CWidgetStatsCProps>(
  ({ className, color, icon, inverse, progress, title, value, ...rest }, ref) => {
    return (
      <CCard
        className={className}
        color={color}
        {...(inverse && { textColor: 'white' })}
        {...rest}
        ref={ref}
      >
        <CCardBody>
          {icon && (
            <div
              className={classNames(
                'text-end mb-4',
                inverse ? 'text-white text-opacity-75' : 'text-body-secondary',
              )}
            >
              {icon}
            </div>
          )}
          {value && <div className="fs-4 fw-semibold">{value}</div>}
          {title && (
            <div className={inverse ? 'text-white text-opacity-75' : 'text-body-secondary'}>
              {title}
            </div>
          )}
          <CProgress
            className="mt-3 mb-0"
            height={4}
            {...(inverse && { white: true })}
            {...progress}
          />
        </CCardBody>
      </CCard>
    )
  },
)

CWidgetStatsC.propTypes = {
  className: PropTypes.string,
  color: colorPropType,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  inverse: PropTypes.bool,
  progress: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.number]),
}

CWidgetStatsC.displayName = 'CWidgetStatsCWidgetStatsC'
