import { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface UseColorModesOutput {
  colorMode: string | undefined
  isColorModeSet: () => boolean
  setColorMode: Dispatch<SetStateAction<string>>
}

const getStoredTheme = (localStorageItemName: string) =>
  typeof window !== 'undefined' && localStorage.getItem(localStorageItemName)

const setStoredTheme = (localStorageItemName: string, colorMode: string) =>
  localStorage.setItem(localStorageItemName, colorMode)

const getPreferredColorScheme = (localStorageItemName: string) => {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const storedTheme = getStoredTheme(localStorageItemName)

  if (storedTheme) {
    return storedTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const setTheme = (colorMode: string) => {
  document.documentElement.dataset.coreuiTheme =
    colorMode === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : colorMode

  const event = new Event('ColorSchemeChange')
  document.documentElement.dispatchEvent(event)
}

export const useColorModes = (
  localStorageItemName = 'coreui-react-color-scheme',
): UseColorModesOutput => {
  const [colorMode, setColorMode] = useState<string | undefined>(
    getPreferredColorScheme(localStorageItemName),
  )

  useEffect(() => {
    if (colorMode) {
      setStoredTheme(localStorageItemName, colorMode)
      setTheme(colorMode)
    }
  }, [colorMode])

  useEffect(() => {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      const storedTheme = getStoredTheme(localStorageItemName)
      if (storedTheme !== 'light' && storedTheme !== 'dark' && colorMode) {
        setTheme(colorMode)
      }
    })
  })

  return {
    colorMode,
    isColorModeSet: () => Boolean(getStoredTheme(localStorageItemName)),
    setColorMode,
  }
}
