import type { Placement } from '@popperjs/core'
import type { Placements } from '../../types'
import type { Alignments, Breakpoints } from './types'

export const getAlignmentClassNames = (alignment: Alignments) => {
  const classNames: string[] = []
  if (typeof alignment === 'object') {
    for (const key in alignment) {
      classNames.push(
        `dropdown-menu${key === 'xs' ? '' : `-${key}`}-${alignment[key as keyof Breakpoints]}`,
      )
    }
  }

  if (typeof alignment === 'string') {
    classNames.push(`dropdown-menu-${alignment}`)
  }

  return classNames
}

export const getPlacement = (
  placement: Placement,
  direction: string | undefined,
  alignment: Alignments | string | undefined,
  isRTL: boolean,
): Placements => {
  let _placement = placement

  if (direction === 'dropup') {
    _placement = isRTL ? 'top-end' : 'top-start'
  }

  if (direction === 'dropup-center') {
    _placement = 'top'
  }

  if (direction === 'dropend') {
    _placement = isRTL ? 'left-start' : 'right-start'
  }

  if (direction === 'dropstart') {
    _placement = isRTL ? 'right-start' : 'left-start'
  }

  if (alignment === 'end') {
    _placement = isRTL ? 'bottom-start' : 'bottom-end'
  }

  return _placement
}
