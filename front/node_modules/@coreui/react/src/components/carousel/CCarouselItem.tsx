import React, { forwardRef, HTMLAttributes, useContext, useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useForkedRef } from '../../hooks'
import { CCarouselContext } from './CCarousel'
export interface CCarouselItemProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * @ignore
   */
  active?: boolean
  /**
   * A string of all className you want applied to the base component.
   */
  className?: string
  /**
   * @ignore
   */
  direction?: string
  /**
   * The amount of time to delay between automatically cycling an item.
   */
  interval?: boolean | number
}

export const CCarouselItem = forwardRef<HTMLDivElement, CCarouselItemProps>(
  ({ children, className, active, direction, interval = false, ...rest }, ref) => {
    const { setAnimating, setCustomInterval } = useContext(CCarouselContext)
    const carouselItemRef = useRef<HTMLDivElement>(null)
    const forkedRef = useForkedRef(ref, carouselItemRef)

    const prevActive = useRef<boolean>()
    const [directionClassName, setDirectionClassName] = useState<string>()
    const [orderClassName, setOrderClassName] = useState<string>()
    const [activeClassName, setActiveClassName] = useState(active && 'active')
    const [count, setCount] = useState(0)

    useEffect(() => {
      if (active) {
        setCustomInterval(interval)
        if (count !== 0) setOrderClassName(`carousel-item-${direction}`)
      }

      if (prevActive.current && !active) {
        setActiveClassName('active')
      }

      if (active || prevActive.current) {
        setTimeout(() => {
          if (count !== 0) {
            // @ts-expect-error reflow is necessary to proper transition
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const reflow = carouselItemRef.current?.offsetHeight
            setDirectionClassName(`carousel-item-${direction === 'next' ? 'start' : 'end'}`)
          }
        }, 0)
      }

      prevActive.current = active

      if (count === 0) setCount(count + 1)
    }, [active])

    useEffect(() => {
      carouselItemRef.current?.addEventListener('transitionstart', () => {
        active && setAnimating(true)
      })
      carouselItemRef.current?.addEventListener('transitionend', () => {
        active && setAnimating(false)
        setDirectionClassName('')
        setOrderClassName('')
        if (active) {
          setActiveClassName('active')
        }
        if (!active) {
          setActiveClassName('')
        }
      })
      return () => {
        carouselItemRef.current?.removeEventListener('transitionstart', () => {
          active && setAnimating(true)
        })
        carouselItemRef.current?.removeEventListener('transitionend', () => {
          active && setAnimating(false)
          setDirectionClassName('')
          setOrderClassName('')
          if (active) {
            setActiveClassName('active')
          }
          if (!active) {
            setActiveClassName('')
          }
        })
      }
    })

    return (
      <div
        className={classNames(
          'carousel-item',
          activeClassName,
          directionClassName,
          orderClassName,
          className,
        )}
        ref={forkedRef}
        {...rest}
      >
        {children}
      </div>
    )
  },
)

CCarouselItem.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  direction: PropTypes.string,
  interval: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
}

CCarouselItem.displayName = 'CCarouselItem'
