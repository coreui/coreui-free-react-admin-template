import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
  CNav,
  CNavItem,
  CNavLink,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '../../../index'

test('loads and displays CNav component', async () => {
  const { container } = render(<CNav>Test</CNav>)
  expect(container).toMatchSnapshot()
})

test('CNav customize', async () => {
  const { container } = render(
    <CNav className="bazinga" as="h3" layout="justified" variant="pills">
      Test
    </CNav>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('nav')
  expect(container.firstChild).toHaveClass('nav-justified')
  expect(container.firstChild).toHaveClass('nav-pills')
  expect(container.firstChild).toHaveClass('bazinga')
})

test('CNav example', async () => {
  const { container } = render(
    <CNav>
      <CNavItem>
        <CNavLink href="#" active>
          Active
        </CNavLink>
      </CNavItem>
      <CNavItem>
        <CNavLink href="#">Link</CNavLink>
      </CNavItem>
      <CDropdown variant="nav-item">
        <CDropdownToggle>A</CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem href="#">B</CDropdownItem>
          <CDropdownItem href="#">C</CDropdownItem>
          <CDropdownItem href="#">D</CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
      <CNavItem>
        <CNavLink href="#">Link</CNavLink>
      </CNavItem>
      <CNavItem>
        <CNavLink href="#" disabled>
          Disabled
        </CNavLink>
      </CNavItem>
    </CNav>,
  )
  expect(container).toMatchSnapshot()
})
