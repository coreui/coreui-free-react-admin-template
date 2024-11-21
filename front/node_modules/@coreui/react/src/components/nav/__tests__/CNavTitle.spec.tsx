import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CNavTitle } from '../../../index'

test('loads and displays CNavTitle component', async () => {
  const { container } = render(<CNavTitle>Test</CNavTitle>)
  expect(container).toMatchSnapshot()
})

test('CNavTitle customize', async () => {
  const { container } = render(<CNavTitle className="bazinga">Test</CNavTitle>)
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('nav-title')
  expect(container.firstChild).toHaveClass('bazinga')
})
