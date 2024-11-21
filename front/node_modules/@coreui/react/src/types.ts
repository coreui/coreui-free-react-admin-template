export type Breakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

export type Colors =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'dark'
  | 'light'
  | string

export type Placements =
  | 'auto'
  | 'auto-start'
  | 'auto-end'
  | 'top-end'
  | 'top'
  | 'top-start'
  | 'bottom-end'
  | 'bottom'
  | 'bottom-start'
  | 'right-start'
  | 'right'
  | 'right-end'
  | 'left-start'
  | 'left'
  | 'left-end'
  | undefined

export type Shapes =
  | 'rounded'
  | 'rounded-top'
  | 'rounded-end'
  | 'rounded-bottom'
  | 'rounded-start'
  | 'rounded-circle'
  | 'rounded-pill'
  | 'rounded-0'
  | 'rounded-1'
  | 'rounded-2'
  | 'rounded-3'
  | string

export type TextColors =
  | Colors
  | 'primary-emphasis'
  | 'secondary-emphasis'
  | 'success-emphasis'
  | 'danger-emphasis'
  | 'warning-emphasis'
  | 'info-emphasis'
  | 'light-emphasis'
  | 'body'
  | 'body-emphasis'
  | 'body-secondary'
  | 'body-tertiary'
  | 'black'
  | 'black-50'
  | 'white'
  | 'white-50'
  | string

export type Triggers = 'hover' | 'focus' | 'click'
