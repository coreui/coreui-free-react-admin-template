import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import AppBreadcrumb from './AppBreadcrumb'

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('AppBreadcrumb', () => {
  it('renders without crashing', () => {
    const { container } = renderWithRouter(<AppBreadcrumb />)
    expect(container).toBeInTheDocument()
  })

  it('renders breadcrumb container', () => {
    const { container } = renderWithRouter(<AppBreadcrumb />)
    const breadcrumb = container.querySelector('.breadcrumb')
    expect(breadcrumb).toBeInTheDocument()
  })
})
