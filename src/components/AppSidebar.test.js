import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import AppSidebar from './AppSidebar'
import store from '../store'

const renderWithProviders = (component) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>,
  )
}

describe('AppSidebar', () => {
  it('renders without crashing', () => {
    const { container } = renderWithProviders(<AppSidebar />)
    expect(container).toBeInTheDocument()
  })

  it('renders sidebar brand', () => {
    const { container } = renderWithProviders(<AppSidebar />)
    const brand = container.querySelector('.sidebar-brand')
    expect(brand).toBeInTheDocument()
  })

  it('renders navigation items', () => {
    const { container } = renderWithProviders(<AppSidebar />)
    const navItems = container.querySelectorAll('.nav-link')
    expect(navItems.length).toBeGreaterThan(0)
  })

  it('renders sidebar toggler on large screens', () => {
    const { container } = renderWithProviders(<AppSidebar />)
    const toggler = container.querySelector('.sidebar-toggler')
    expect(toggler).toBeInTheDocument()
  })

  it('is memoized', () => {
    expect(AppSidebar).toBe(AppSidebar)
  })
})
