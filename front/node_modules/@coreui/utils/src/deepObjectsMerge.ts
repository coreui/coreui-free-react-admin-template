/**
 * --------------------------------------------------------------------------
 * CoreUI Utils (__COREUI_VERSION__): deepObjectsMerge.ts
 * Licensed under MIT (https://github.com/coreui/coreui-utils/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

const deepObjectsMerge = (target: object, source: object) => {
  // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object) {
      Object.assign(source[key], deepObjectsMerge(target[key], source[key]))
    }
  }

  // Join `target` and modified `source`
  Object.assign(target || {}, source)
  return target
}

export default deepObjectsMerge
