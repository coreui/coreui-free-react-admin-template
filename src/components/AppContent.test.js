import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { describe, it, expect } from 'vitest'
import AppContent from './AppContent'
import store from '../store'

const renderWithProviders = (component) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>,
  )
}

describe('AppContent', () => {
  it('renders without crashing', () => {
    const { container } = renderWithProviders(<AppContent />)
    expect(container).toBeInTheDocument()
  })

  it('renders container', () => {
    const { container } = renderWithProviders(<AppContent />)
    const contentContainer = container.querySelector('.container-lg')
    expect(contentContainer).toBeInTheDocument()
  })

  it('renders Suspense fallback', () => {
    const { container } = renderWithProviders(<AppContent />)
    expect(container).toBeInTheDocument()
  })
})
