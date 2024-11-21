import PropTypes from 'prop-types'

import type { Placements, Triggers } from './types'

export const colorPropType = PropTypes.oneOfType([
  PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'dark',
    'light',
  ]),
  PropTypes.string,
])

export const fallbackPlacementsPropType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.oneOf<Placements>(['top', 'bottom', 'right', 'left']).isRequired),
  PropTypes.oneOf<Placements>(['top', 'bottom', 'right', 'left']),
])

export const placementPropType = PropTypes.oneOf<Placements>([
  'auto',
  'auto-start',
  'auto-end',
  'top-end',
  'top',
  'top-start',
  'bottom-end',
  'bottom',
  'bottom-start',
  'right-start',
  'right',
  'right-end',
  'left-start',
  'left',
  'left-end',
])

export const shapePropType = PropTypes.oneOfType([
  PropTypes.oneOf([
    'rounded',
    'rounded-top',
    'rounded-end',
    'rounded-bottom',
    'rounded-start',
    'rounded-circle',
    'rounded-pill',
    'rounded-0',
    'rounded-1',
    'rounded-2',
    'rounded-3',
  ]),
  PropTypes.string,
])

export const textColorsPropType = PropTypes.oneOfType([
  colorPropType,
  PropTypes.oneOf(['white', 'muted']),
  PropTypes.string,
])

export const triggerPropType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.oneOf<Triggers>(['hover', 'focus', 'click']).isRequired),
  PropTypes.oneOf<Triggers>(['hover', 'focus', 'click']),
])
