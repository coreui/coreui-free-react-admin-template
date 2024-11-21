import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CNavbarBrand } from '../../../index'

test('loads and displays CNavbarBrand component', async () => {
  const { container } = render(<CNavbarBrand>Test</CNavbarBrand>)
  expect(container).toMatchSnapshot()
})

test('CNavbarBrand witch href', async () => {
  const { container } = render(<CNavbarBrand href="/bazinga">Test</CNavbarBrand>)
  expect(container).toMatchSnapshot()
})

test('CNavbarBrand customize', async () => {
  const { container } = render(
    <CNavbarBrand className="bazinga" as="h3" href="/bazinga">
      Test
    </CNavbarBrand>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('navbar-brand')
  expect(container.firstChild).toHaveClass('bazinga')
})
