// code borrowed from https://github.com/reach/reach-ui
// problem described https://github.com/facebook/react/issues/13029

import { useMemo } from 'react'

export type AssignableRef<ValueType> =
  | {
      bivarianceHack(instance: ValueType | null): void
    }['bivarianceHack']
  | React.MutableRefObject<ValueType | null>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useForkedRef<RefValueType = any>(
  ...refs: (AssignableRef<RefValueType> | null | undefined)[]
) {
  return useMemo(() => {
    if (refs.every((ref) => ref == null)) {
      return null
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (node: any) => {
      refs.forEach((ref) => {
        assignRef(ref, node)
      })
    }
  }, refs)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function assignRef<RefValueType = any>(
  ref: AssignableRef<RefValueType> | null | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
) {
  if (ref == null) return
  if (isFunction(ref)) {
    ref(value)
  } else {
    try {
      ref.current = value
    } catch {
      throw new Error(`Cannot assign value "${value}" to ref "${ref}"`)
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
export function isFunction(value: any): value is Function {
  return !!(value && {}.toString.call(value) == '[object Function]')
}
