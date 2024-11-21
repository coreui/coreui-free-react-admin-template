import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CNavGroupItems } from '../../../index'

test('loads and displays CNavGroupItems component', async () => {
  const { container } = render(<CNavGroupItems>Test</CNavGroupItems>)
  expect(container).toMatchSnapshot()
})

test('CNavGroupItems customize', async () => {
  const { container } = render(<CNavGroupItems className="bazinga">Test</CNavGroupItems>)
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('nav-group-items')
  expect(container.firstChild).toHaveClass('bazinga')
})
