/**
 * --------------------------------------------------------------------------
 * CoreUI Utils (__COREUI_VERSION__): omitByKeys.ts
 * Licensed under MIT (https://github.com/coreui/coreui-utils/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

const omitByKeys = (originalObject: object, keys: string | string[]) => {
  const newObj = {}
  const objKeys = Object.keys(originalObject)
  for (let i = 0; i < objKeys.length; i++) {
    !keys.includes(objKeys[i]) && (newObj[objKeys[i]] = originalObject[objKeys[i]])
  }
  return newObj
}

export default omitByKeys
