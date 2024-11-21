/**
 * --------------------------------------------------------------------------
 * CoreUI Utils (__COREUI_VERSION__): getColor.ts
 * Licensed under MIT (https://github.com/coreui/coreui-utils/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import getStyle from './getStyle'

const getColor = (rawProperty: string, element?: Element) => {
  const property = `--${rawProperty}`
  const style = getStyle(property, element)
  return style ? style : rawProperty
}

export default getColor
