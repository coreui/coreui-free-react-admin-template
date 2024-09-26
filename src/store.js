import React from 'react'
import { legacy_createStore as createStore } from 'redux'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import rootReducer from './reducers'

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

const StoreProvider = ({ children }) => <Provider store={store}>{children}</Provider>

StoreProvider.propTypes = {
  children: PropTypes.node,
}
export default StoreProvider
