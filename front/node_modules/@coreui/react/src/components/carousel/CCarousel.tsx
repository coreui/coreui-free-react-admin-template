import React, {
  Children,
  createContext,
  forwardRef,
  HTMLAttributes,
  TouchEvent,
  useState,
  useEffect,
  useRef,
} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { isInViewport } from '../../utils'
import { useForkedRef } from '../../hooks'

export interface CCarouselProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * index of the active item.
   */
  activeIndex?: number
  /**
   * A string of all className you want applied to the base component.
   */
  className?: string
  /**
   * Adding in the previous and next controls.
   */
  controls?: boolean
  /**
   * Add darker controls, indicators, and captions.
   */
  dark?: boolean
  /**
   * The amount of time to delay between automatically cycling an item. If false, carousel will not automatically cycle.
   */
  interval?: boolean | number
  /**
   * Adding indicators at the bottom of the carousel for each item.
   */
  indicators?: boolean
  /**
   * Callback fired when a slide transition end.
   */
  onSlid?: (active: number, direction: string) => void
  /**
   * Callback fired when a slide transition starts.
   */
  onSlide?: (active: number, direction: string) => void
  /**
   * If set to 'hover', pauses the cycling of the carousel on mouseenter and resumes the cycling of the carousel on mouseleave. If set to false, hovering over the carousel won't pause it.
   */
  pause?: boolean | 'hover'
  /**
   * Set whether the carousel should support left/right swipe interactions on touchscreen devices.
   *
   * @since 4.5.0
   */
  touch?: boolean
  /**
   * Set type of the transition.
   */
  transition?: 'slide' | 'crossfade'
  /**
   * Set whether the carousel should cycle continuously or have hard stops.
   */
  wrap?: boolean
}

interface DataType {
  timeout?: null | ReturnType<typeof setTimeout>
}

export interface ContextProps {
  setAnimating: (a: boolean) => void
  setCustomInterval: (a: boolean | number) => void
}

export const CCarouselContext = createContext({} as ContextProps)

export const CCarousel = forwardRef<HTMLDivElement, CCarouselProps>(
  (
    {
      children,
      activeIndex = 0,
      className,
      controls,
      dark,
      indicators,
      interval = 5000,
      onSlid,
      onSlide,
      pause = 'hover',
      touch = true,
      transition,
      wrap = true,
      ...rest
    },
    ref,
  ) => {
    const carouselRef = useRef<HTMLDivElement>(null)
    const forkedRef = useForkedRef(ref, carouselRef)
    const data = useRef<DataType>({}).current

    const [active, setActive] = useState<number>(activeIndex)
    const [animating, setAnimating] = useState<boolean>(false)
    const [customInterval, setCustomInterval] = useState<boolean | number>()
    const [direction, setDirection] = useState<string>('next')
    const [itemsNumber, setItemsNumber] = useState<number>(0)
    const [touchPosition, setTouchPosition] = useState<number | null>(null)
    const [visible, setVisible] = useState<boolean>()

    useEffect(() => {
      setItemsNumber(Children.toArray(children).length)
    })

    useEffect(() => {
      visible && cycle()
    }, [visible])

    useEffect(() => {
      !animating && cycle()
      !animating && onSlid && onSlid(active, direction)
      animating && onSlide && onSlide(active, direction)
    }, [animating])

    useEffect(() => {
      window.addEventListener('scroll', handleScroll)

      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    })

    const cycle = () => {
      _pause()
      if (!wrap && active === itemsNumber - 1) {
        return
      }

      if (typeof interval === 'number') {
        data.timeout = setTimeout(
          () => nextItemWhenVisible(),
          typeof customInterval === 'number' ? customInterval : interval,
        )
      }
    }
    const _pause = () => pause && data.timeout && clearTimeout(data.timeout)

    const nextItemWhenVisible = () => {
      // Don't call next when the page isn't visible
      // or the carousel or its parent isn't visible
      if (!document.hidden && carouselRef.current && isInViewport(carouselRef.current)) {
        if (animating) {
          return
        }
        handleControlClick('next')
      }
    }

    const handleControlClick = (direction: string) => {
      if (animating) {
        return
      }
      setDirection(direction)
      if (direction === 'next') {
        active === itemsNumber - 1 ? setActive(0) : setActive(active + 1)
      } else {
        active === 0 ? setActive(itemsNumber - 1) : setActive(active - 1)
      }
    }

    const handleIndicatorClick = (index: number) => {
      if (active === index) {
        return
      }

      if (active < index) {
        setDirection('next')
        setActive(index)
        return
      }

      if (active > index) {
        setDirection('prev')
        setActive(index)
      }
    }

    const handleScroll = () => {
      if (!document.hidden && carouselRef.current && isInViewport(carouselRef.current)) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      const touchDown = touchPosition

      if (touchDown === null) {
        return
      }

      const currentTouch = e.touches[0].clientX
      const diff = touchDown - currentTouch

      if (diff > 5) {
        handleControlClick('next')
      }

      if (diff < -5) {
        handleControlClick('prev')
      }

      setTouchPosition(null)
    }

    const handleTouchStart = (e: TouchEvent) => {
      const touchDown = e.touches[0].clientX
      setTouchPosition(touchDown)
    }

    return (
      <div
        className={classNames(
          'carousel slide',
          {
            'carousel-fade': transition === 'crossfade',
          },
          className,
        )}
        {...(dark && { 'data-coreui-theme': 'dark' })}
        onMouseEnter={_pause}
        onMouseLeave={cycle}
        {...(touch && { onTouchStart: handleTouchStart, onTouchMove: handleTouchMove })}
        {...rest}
        ref={forkedRef}
      >
        <CCarouselContext.Provider
          value={{
            setAnimating,
            setCustomInterval,
          }}
        >
          {indicators && (
            <div className="carousel-indicators">
              {Array.from({ length: itemsNumber }, (_, i) => i).map((index) => {
                return (
                  <button
                    key={`indicator${index}`}
                    onClick={() => {
                      !animating && handleIndicatorClick(index)
                    }}
                    className={classNames({
                      active: active === index,
                    })}
                    data-coreui-target=""
                    {...(active === index && { 'aria-current': true })}
                    aria-label={`Slide ${index + 1}`}
                  />
                )
              })}
            </div>
          )}
          <div className="carousel-inner">
            {Children.map(children, (child, index) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child as React.ReactElement<any>, {
                  active: active === index ? true : false,
                  direction: direction,
                  key: index,
                })
              }
              return
            })}
          </div>
          {controls && (
            <>
              <button className="carousel-control-prev" onClick={() => handleControlClick('prev')}>
                <span className={`carousel-control-prev-icon`} aria-label="prev" />
              </button>
              <button className="carousel-control-next" onClick={() => handleControlClick('next')}>
                <span className={`carousel-control-next-icon`} aria-label="next" />
              </button>
            </>
          )}
        </CCarouselContext.Provider>
      </div>
    )
  },
)

CCarousel.propTypes = {
  activeIndex: PropTypes.number,
  children: PropTypes.node,
  className: PropTypes.string,
  controls: PropTypes.bool,
  dark: PropTypes.bool,
  indicators: PropTypes.bool,
  interval: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  onSlid: PropTypes.func,
  onSlide: PropTypes.func,
  pause: PropTypes.oneOf([false, 'hover']),
  touch: PropTypes.bool,
  transition: PropTypes.oneOf(['slide', 'crossfade']),
  wrap: PropTypes.bool,
}

CCarousel.displayName = 'CCarousel'
