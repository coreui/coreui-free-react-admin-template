/**
 * --------------------------------------------------------------------------
 * CoreUI Utils (__COREUI_VERSION__): makeUid.ts
 * Licensed under MIT (https://github.com/coreui/coreui-utils/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

//function for UI releted ID assignment, due to one in 10^15 probability of duplication
const makeUid = () => {
  const key = Math.random().toString(36).substr(2)
  return 'uid-' + key
}

export default makeUid