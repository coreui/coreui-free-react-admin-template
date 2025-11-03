import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import AppHeader from './AppHeader'
import store from '../store'

const renderWithProviders = (component) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>,
  )
}

describe('AppHeader', () => {
  let addEventListenerSpy
  let removeEventListenerSpy

  beforeEach(() => {
    addEventListenerSpy = vi.spyOn(document, 'addEventListener')
    removeEventListenerSpy = vi.spyOn(document, 'removeEventListener')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders without crashing', () => {
    const { container } = renderWithProviders(<AppHeader />)
    expect(container).toBeInTheDocument()
  })

  it('renders navigation items', () => {
    renderWithProviders(<AppHeader />)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Users')).toBeInTheDocument()
    expect(screen.getAllByText('Settings').length).toBeGreaterThan(0)
  })

  it('adds scroll event listener on mount', () => {
    renderWithProviders(<AppHeader />)
    expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
  })

  it('removes scroll event listener on unmount', () => {
    const { unmount } = renderWithProviders(<AppHeader />)
    const scrollHandler = addEventListenerSpy.mock.calls[0][1]

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', scrollHandler)
  })

  it('renders theme switcher dropdown', () => {
    renderWithProviders(<AppHeader />)
    const dropdowns = document.querySelectorAll('.dropdown')
    expect(dropdowns.length).toBeGreaterThan(0)
  })

  it('renders header icons', () => {
    renderWithProviders(<AppHeader />)
    const icons = document.querySelectorAll('.nav-link')
    expect(icons.length).toBeGreaterThan(0)
  })
})
