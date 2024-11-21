import React, {
  CSSProperties,
  ElementType,
  forwardRef,
  HTMLAttributes,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Transition } from 'react-transition-group'
import type { TransitionStatus } from 'react-transition-group'

import { PolymorphicRefForwardingComponent } from '../../helpers'

import { CNavContext } from '../sidebar/CSidebarNav'

export interface CNavGroupProps extends HTMLAttributes<HTMLDivElement | HTMLLIElement> {
  /**
   * Component used for the root node. Either a string to use a HTML element or a component.
   *
   * @since 5.0.0
   */
  as?: ElementType
  /**
   * A string of all className you want applied to the component.
   */
  className?: string
  /**
   * Make nav group more compact by cutting all `padding` in half.
   */
  compact?: boolean
  /**
   * Set group toggler label.
   */
  toggler?: string | ReactNode
  /**
   * Show nav group items.
   */
  visible?: boolean
  /**
   * @ignore
   */
  idx?: string
}

const isInVisibleGroup = (el1: string, el2: string) => {
  const array1 = el1.toString().split('.')
  const array2 = el2.toString().split('.')

  return array2.every((item, index) => item === array1[index])
}

export const CNavGroup: PolymorphicRefForwardingComponent<'li', CNavGroupProps> = forwardRef<
  HTMLDivElement | HTMLLIElement,
  CNavGroupProps
>(({ children, as: Component = 'li', className, compact, idx, toggler, visible, ...rest }, ref) => {
  const [height, setHeight] = useState<number | string>(0)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navItemsRef = useRef<any>(null)

  const { visibleGroup, setVisibleGroup } = useContext(CNavContext)

  const [_visible, setVisible] = useState(
    Boolean(visible || (idx && visibleGroup && isInVisibleGroup(visibleGroup, idx))),
  )

  useEffect(() => {
    setVisible(Boolean(idx && visibleGroup && isInVisibleGroup(visibleGroup, idx)))
  }, [visibleGroup])

  const handleTogglerOnCLick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    setVisibleGroup(
      _visible ? (idx?.toString().includes('.') ? idx.slice(0, idx.lastIndexOf('.')) : '') : idx,
    )
    setVisible(!_visible)
  }

  const style: CSSProperties = {
    height: 0,
  }

  const onEntering = () => {
    navItemsRef.current && setHeight(navItemsRef.current.scrollHeight)
  }

  const onEntered = () => {
    setHeight('auto')
  }

  const onExit = () => {
    navItemsRef.current && setHeight(navItemsRef.current.scrollHeight)
  }

  const onExiting = () => {
    // @ts-expect-error reflow is necessary to get correct height of the element
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const reflow = navItemsRef.current?.offsetHeight
    setHeight(0)
  }

  const onExited = () => {
    setHeight(0)
  }

  const transitionStyles = {
    entering: { display: 'block', height: height },
    entered: { display: 'block', height: height },
    exiting: { display: 'block', height: height },
    exited: { height: height },
    unmounted: {},
  }

  const NavGroupItemsComponent = Component === 'li' ? 'ul' : 'div'

  return (
    <Component
      className={classNames('nav-group', { show: _visible }, className)}
      {...rest}
      ref={ref}
    >
      {toggler && (
        <a className="nav-link nav-group-toggle" onClick={(event) => handleTogglerOnCLick(event)}>
          {toggler}
        </a>
      )}
      <Transition
        in={_visible}
        nodeRef={navItemsRef}
        onEntering={onEntering}
        onEntered={onEntered}
        onExit={onExit}
        onExiting={onExiting}
        onExited={onExited}
        timeout={300}
      >
        {(state) => (
          <NavGroupItemsComponent
            className={classNames('nav-group-items', {
              compact: compact,
            })}
            style={{
              ...style,
              ...transitionStyles[state as TransitionStatus],
            }}
            ref={navItemsRef}
          >
            {children}
          </NavGroupItemsComponent>
        )}
      </Transition>
    </Component>
  )
})

CNavGroup.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  compact: PropTypes.bool,
  idx: PropTypes.string,
  toggler: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  visible: PropTypes.bool,
}

CNavGroup.displayName = 'CNavGroup'
