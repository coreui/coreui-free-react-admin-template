import { useRef } from 'react'
import { createPopper } from '@popperjs/core'
import type { Instance, Options } from '@popperjs/core'

interface UsePopperOutput {
  popper: Instance | undefined
  initPopper: (reference: HTMLElement, popper: HTMLElement, options: Partial<Options>) => void
  destroyPopper: () => void
  updatePopper: (options?: Partial<Options>) => void
}

export const usePopper = (): UsePopperOutput => {
  const _popper = useRef<Instance>()
  const el = useRef<HTMLElement>()

  const initPopper = (reference: HTMLElement, popper: HTMLElement, options: Partial<Options>) => {
    _popper.current = createPopper(reference, popper, options)
    el.current = popper
  }

  const destroyPopper = () => {
    const popperInstance = _popper.current

    if (popperInstance && el.current) {
      popperInstance.destroy()
    }

    _popper.current = undefined
  }

  const updatePopper = (options?: Partial<Options>) => {
    const popperInstance = _popper.current

    if (popperInstance && options) {
      popperInstance.setOptions(options)
    }

    if (popperInstance) {
      popperInstance.update()
    }
  }

  return {
    popper: _popper.current,
    initPopper,
    destroyPopper,
    updatePopper,
  }
}
