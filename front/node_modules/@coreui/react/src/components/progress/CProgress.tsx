import React, { forwardRef, HTMLAttributes, useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { CProgressStackedContext } from './CProgressStacked'
import { CProgressBar, CProgressBarProps } from './CProgressBar'

export interface CProgressProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>,
    CProgressBarProps {
  /**
   * A string of all className you want applied to the component.
   */
  className?: string
  /**
   * Sets the height of the component. If you set that value the inner `<CProgressBar>` will automatically resize accordingly.
   */
  height?: number
  /**
   * A string of all className you want applied to the <CProgressBar/> component.
   *
   * @since 4.9.0
   */
  progressBarClassName?: string
  /**
   * Makes progress bar thinner.
   */
  thin?: boolean
  /**
   * The percent to progress the ProgressBar (out of 100).
   */
  value?: number
  /**
   * Change the default color to white.
   */
  white?: boolean
}

export const CProgress = forwardRef<HTMLDivElement, CProgressProps>(
  ({ children, className, height, progressBarClassName, thin, value, white, ...rest }, ref) => {
    const { stacked } = useContext(CProgressStackedContext)

    return (
      <div
        className={classNames(
          'progress',
          {
            'progress-thin': thin,
            'progress-white': white,
          },
          className,
        )}
        {...(value !== undefined && {
          role: 'progressbar',
          'aria-valuenow': value,
          'aria-valuemin': 0,
          'aria-valuemax': 100,
        })}
        style={{
          ...(height ? { height: `${height}px` } : {}),
          ...(stacked ? { width: `${value}%` } : {}),
        }}
        ref={ref}
      >
        {React.Children.toArray(children).some(
          // @ts-expect-error displayName is set in the CProgressBar component
          (child) => child.type && child.type.displayName === 'CProgressBar',
        ) ? (
          React.Children.map(children, (child) => {
            // @ts-expect-error displayName is set in the CProgressBar component
            if (React.isValidElement(child) && child.type.displayName === 'CProgressBar') {
              return React.cloneElement(child, {
                ...(value && { value: value }),
                ...rest,
              })
            }

            return
          })
        ) : (
          <CProgressBar
            {...(progressBarClassName && { className: progressBarClassName })}
            value={value}
            {...rest}
          >
            {children}
          </CProgressBar>
        )}
      </div>
    )
  },
)

CProgress.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  height: PropTypes.number,
  progressBarClassName: PropTypes.string,
  thin: PropTypes.bool,
  value: PropTypes.number,
  white: PropTypes.bool,
}

CProgress.displayName = 'CProgress'
