import { Placement } from '@popperjs/core'
import isRTL from './isRTL'

const getRTLPlacement = (placement: string, element: HTMLDivElement | null): Placement => {
  switch (placement) {
    case 'right': {
      return isRTL(element) ? 'left' : 'right'
    }
    case 'left': {
      return isRTL(element) ? 'right' : 'left'
    }
    default: {
      return placement as Placement
    }
  }
}

export default getRTLPlacement
