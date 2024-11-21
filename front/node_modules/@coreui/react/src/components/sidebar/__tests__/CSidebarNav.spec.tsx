import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CSidebarNav } from '../../../index'

test('loads and displays CSidebarNav component', async () => {
  const { container } = render(<CSidebarNav>Test</CSidebarNav>)
  expect(container).toMatchSnapshot()
})

test('CSidebarNav customize', async () => {
  const { container } = render(<CSidebarNav className="bazinga">Test</CSidebarNav>)
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('sidebar-nav')
})
