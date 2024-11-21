import React, { forwardRef, HTMLAttributes, ReactNode } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { CCard, CCardBody, CCardHeader } from '../card'
import { CCol } from '../grid/CCol'

import { colorPropType } from '../../props'
import type { Colors } from '../../types'

type Value = {
  title?: string | ReactNode
  value?: number | string | ReactNode
}

export interface CWidgetStatsDProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * A string of all className you want applied to the base component.
   */
  className?: string
  /**
   * Chart node for your component.
   */
  chart?: string | ReactNode
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
   * Values and titles for your component.
   */
  values?: Value[]
}

export const CWidgetStatsD = forwardRef<HTMLDivElement, CWidgetStatsDProps>(
  ({ className, chart, color, icon, values, ...rest }, ref) => {
    return (
      <CCard className={className} {...rest} ref={ref}>
        <CCardHeader
          className={classNames(
            'position-relative d-flex justify-content-center align-items-center',
            {
              [`bg-${color}`]: color,
            },
          )}
        >
          {icon}
          {chart}
        </CCardHeader>
        <CCardBody className="row text-center">
          {values &&
            values.map((value: Value, index: number) => {
              return (
                <React.Fragment key={index}>
                  {index % 2 !== 0 && <div className="vr"></div>}
                  <CCol>
                    <div className="fs-5 fw-semibold">{value.value}</div>
                    <div className="text-uppercase text-body-secondary small">{value.title}</div>
                  </CCol>
                </React.Fragment>
              )
            })}
        </CCardBody>
      </CCard>
    )
  },
)

CWidgetStatsD.propTypes = {
  chart: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  className: PropTypes.string,
  color: colorPropType,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  values: PropTypes.arrayOf(PropTypes.any),
}

CWidgetStatsD.displayName = 'CWidgetStatsD'
