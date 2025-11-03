import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import AppFooter from './AppFooter'

describe('AppFooter', () => {
  it('renders without crashing', () => {
    render(<AppFooter />)
    expect(screen.getByText('CoreUI')).toBeInTheDocument()
  })

  it('displays copyright year 2025', () => {
    render(<AppFooter />)
    expect(screen.getByText(/2025 creativeLabs/)).toBeInTheDocument()
  })

  it('renders CoreUI link with correct attributes', () => {
    render(<AppFooter />)
    const link = screen.getByRole('link', { name: 'CoreUI' })
    expect(link).toHaveAttribute('href', 'https://coreui.io')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders CoreUI React Admin link', () => {
    render(<AppFooter />)
    const link = screen.getByRole('link', { name: /CoreUI React Admin/ })
    expect(link).toHaveAttribute('href', 'https://coreui.io/react')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('displays "Powered by" text', () => {
    render(<AppFooter />)
    expect(screen.getByText('Powered by')).toBeInTheDocument()
  })

  it('is memoized', () => {
    expect(AppFooter).toBe(AppFooter)
  })
})
