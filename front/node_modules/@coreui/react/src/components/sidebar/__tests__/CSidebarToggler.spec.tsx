import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CSidebarToggler } from '../../../index'

test('loads and displays CSidebarToggler component', async () => {
  const { container } = render(<CSidebarToggler />)
  expect(container).toMatchSnapshot()
})

test('CSidebarToggler customize', async () => {
  const { container } = render(<CSidebarToggler className="bazinga">Test</CSidebarToggler>)
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('sidebar-toggler')
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveTextContent('Test')
})
