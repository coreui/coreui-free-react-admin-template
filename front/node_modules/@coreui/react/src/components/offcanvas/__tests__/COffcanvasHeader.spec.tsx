import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { COffcanvasHeader } from '../../../index'

test('loads and displays COffcanvasHeader component', async () => {
  const { container } = render(<COffcanvasHeader />)
  expect(container).toMatchSnapshot()
})

test('COffcanvasHeader customize', async () => {
  const { container } = render(<COffcanvasHeader className="bazinga">Test</COffcanvasHeader>)
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('offcanvas-header')
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveTextContent('Test')
})
