import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import { AppSidebarNav } from './AppSidebarNav'
import { CNavItem, CNavGroup } from '@coreui/react'

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('AppSidebarNav', () => {
  const mockItems = [
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/dashboard',
      icon: <span className="test-icon">Icon</span>,
    },
    {
      component: CNavGroup,
      name: 'Base',
      icon: <span className="test-icon">Icon</span>,
      items: [
        {
          component: CNavItem,
          name: 'Accordion',
          to: '/base/accordion',
        },
      ],
    },
  ]

  it('renders without crashing', () => {
    const { container } = renderWithRouter(<AppSidebarNav items={mockItems} />)
    expect(container).toBeInTheDocument()
  })

  it('renders navigation items', () => {
    const { getByText } = renderWithRouter(<AppSidebarNav items={mockItems} />)
    expect(getByText('Dashboard')).toBeInTheDocument()
    expect(getByText('Base')).toBeInTheDocument()
  })

  it('renders nested navigation items', () => {
    const { getByText } = renderWithRouter(<AppSidebarNav items={mockItems} />)
    expect(getByText('Accordion')).toBeInTheDocument()
  })

  it('renders with empty items array', () => {
    const { container } = renderWithRouter(<AppSidebarNav items={[]} />)
    expect(container).toBeInTheDocument()
  })

  it('renders badges when provided', () => {
    const itemsWithBadge = [
      {
        component: CNavItem,
        name: 'Dashboard',
        to: '/dashboard',
        badge: {
          color: 'info',
          text: 'NEW',
        },
      },
    ]
    const { getByText } = renderWithRouter(<AppSidebarNav items={itemsWithBadge} />)
    expect(getByText('NEW')).toBeInTheDocument()
  })
})
