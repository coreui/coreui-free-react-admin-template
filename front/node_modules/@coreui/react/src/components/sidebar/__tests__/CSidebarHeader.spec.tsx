import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CSidebarHeader } from '../../../index'

test('loads and displays CSidebarHeader component', async () => {
  const { container } = render(<CSidebarHeader>Test</CSidebarHeader>)
  expect(container).toMatchSnapshot()
})

test('CSidebarHeader customize', async () => {
  const { container } = render(<CSidebarHeader className="bazinga">Test</CSidebarHeader>)
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('sidebar-header')
})
