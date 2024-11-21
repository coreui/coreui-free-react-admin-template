import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CNavLink } from '../../../index'

test('loads and displays CNavLink component', async () => {
  const { container } = render(<CNavLink>Test</CNavLink>)
  expect(container).toMatchSnapshot()
})

test('CNavLink customize', async () => {
  const { container } = render(
    <CNavLink active={true} className="bazinga" as="h3" disabled={true} href="/bazinga">
      Test
    </CNavLink>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('nav-link')
  expect(container.firstChild).toHaveClass('bazinga')
})

test('CNavLink witch "to" prop', async () => {
  const { container } = render(<CNavLink to="/bazinga">Test</CNavLink>)
  expect(container).toMatchSnapshot()
})
