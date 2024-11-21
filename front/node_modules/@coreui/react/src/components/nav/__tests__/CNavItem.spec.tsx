import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CNavItem } from '../../../index'

test('loads and displays CNavItem component', async () => {
  const { container } = render(<CNavItem>Test</CNavItem>)
  expect(container).toMatchSnapshot()
})

test('CNavItem customize', async () => {
  const { container } = render(
    <CNavItem active={true} className="bazinga" as="h3" disabled={true} href="/bazinga">
      Test
    </CNavItem>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild?.firstChild).toHaveClass('nav-link')
  expect(container.firstChild).toHaveClass('nav-item')
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container).toMatchSnapshot()
})
