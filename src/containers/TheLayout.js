import React from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'

const TheLayout = () => {
  const cApp = document.body
  const lightTheme = "c-light-theme"
  const darkTheme = "c-dark-theme"
  let theme

  if (localStorage) {
    theme = localStorage.getItem("theme")
  }
  if (theme === lightTheme || theme === darkTheme) {
    cApp.classList.add(theme)
  } else {
    cApp.classList.add(lightTheme)
  }

  return (
    <div className="c-app c-default-layout">
      <TheSidebar/>
      <div className="c-wrapper">
        <TheHeader/>
        <div className="c-body">
          <TheContent/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default TheLayout
