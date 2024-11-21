/**
 * --------------------------------------------------------------------------
 * CoreUI Utils (__COREUI_VERSION__): getStyle.ts
 * Licensed under MIT (https://github.com/coreui/coreui-utils/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

const getStyle = (property: string, element?: Element) => {
  if (typeof window === 'undefined') {
    return
  }

  if (typeof document === 'undefined') {
    return
  }

  const _element = element ?? document.body

  return window.getComputedStyle(_element, null).getPropertyValue(property).replace(/^\s/, '')
}

export default getStyle
