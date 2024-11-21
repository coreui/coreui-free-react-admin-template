import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CSidebarBrand } from '../../../index'

test('loads and displays CSidebarBrand component', async () => {
  const { container } = render(<CSidebarBrand color="primary">Test</CSidebarBrand>)
  expect(container).toMatchSnapshot()
})

test('CSidebarBrand customize', async () => {
  const { container } = render(<CSidebarBrand className="bazinga">Test</CSidebarBrand>)
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('sidebar-brand')
})
