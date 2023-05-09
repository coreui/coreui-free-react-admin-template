import { createStore } from 'redux'

const initialState = {
  sidebarShow: true,
  theme: localStorage.getItem('coreui-free-react-admin-template-theme') ?? 'light',
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'setTheme':
      const event = new Event('ColorSchemeChange')
      document.documentElement.dispatchEvent(event)
      localStorage.setItem('coreui-free-react-admin-template-theme', rest.theme)
      return { ...state, ...rest }
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store
