import getTransitionDurationFromElement from './getTransitionDurationFromElement'

const execute = (callback: () => void) => {
  if (typeof callback === 'function') {
    callback()
  }
}

const triggerTransitionEnd = (element: HTMLElement) => {
  element.dispatchEvent(new Event('transitionend'))
}

const executeAfterTransition = (
  callback: () => void,
  transitionElement: HTMLElement,
  waitForTransition = true,
) => {
  if (!waitForTransition) {
    execute(callback)
    return
  }

  const durationPadding = 5
  const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding

  let called = false

  const handler = ({ target }: { target: any }) => {
    if (target !== transitionElement) {
      return
    }

    called = true
    transitionElement.removeEventListener('transitionend', handler)
    execute(callback)
  }

  transitionElement.addEventListener('transitionend', handler)
  setTimeout(() => {
    if (!called) {
      triggerTransitionEnd(transitionElement)
    }
  }, emulatedDuration)
}

export default executeAfterTransition
