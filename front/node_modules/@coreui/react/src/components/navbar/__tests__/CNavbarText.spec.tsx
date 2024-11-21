import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CNavbarText } from '../../../index'

test('loads and displays CNavbarText component', async () => {
  const { container } = render(<CNavbarText>Test</CNavbarText>)
  expect(container).toMatchSnapshot()
})

test('CNavbarText customize', async () => {
  const { container } = render(<CNavbarText className="bazinga">Test</CNavbarText>)
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('navbar-text')
  expect(container.firstChild).toHaveClass('bazinga')
})
