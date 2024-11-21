import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CSidebarFooter } from '../../../index'

test('loads and displays CSidebarFooter component', async () => {
  const { container } = render(<CSidebarFooter>Test</CSidebarFooter>)
  expect(container).toMatchSnapshot()
})

test('CSidebarFooter customize', async () => {
  const { container } = render(<CSidebarFooter className="bazinga">Test</CSidebarFooter>)
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('sidebar-footer')
})
