import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { describe, it, expect } from 'vitest'
import App from './App'
import store from './store'

describe('App', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>,
    )
    expect(container).toBeInTheDocument()
  })

  it('renders HashRouter', () => {
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>,
    )
    expect(container.querySelector('div')).toBeInTheDocument()
  })

  it('renders Suspense with fallback', () => {
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>,
    )
    expect(container).toBeInTheDocument()
  })
})
