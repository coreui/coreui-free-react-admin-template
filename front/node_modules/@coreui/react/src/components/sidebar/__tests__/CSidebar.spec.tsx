import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
  CSidebar /* , CSidebarNav, CNavLink, CNavGroup, CNavGroupItems, CNavItem */,
} from '../../../index'

test('loads and displays CSidebar component', async () => {
  const { container } = render(<CSidebar>Test</CSidebar>)
  expect(container).toMatchSnapshot()
})

test('CSidebar customize show', async () => {
  const { container } = render(
    <CSidebar
      className="bazinga"
      narrow={true}
      position="fixed"
      visible={true}
      unfoldable={true}
      overlaid={true}
    >
      Test
    </CSidebar>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('sidebar')
  expect(container.firstChild).toHaveClass('sidebar-narrow')
  expect(container.firstChild).toHaveClass('sidebar-overlaid')
  expect(container.firstChild).toHaveClass('sidebar-fixed')
  expect(container.firstChild).toHaveClass('sidebar-narrow-unfoldable')
  // expect(container.firstChild).toHaveClass('show')
})

test('CSidebar customize hide', async () => {
  const { container } = render(
    <CSidebar className="bazinga" position="sticky" visible={false} overlaid={false}>
      Test
    </CSidebar>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('sidebar')
  expect(container.firstChild).toHaveClass('sidebar-sticky')
})
