import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CToastHeader } from '../../../index'

test('loads and displays CToastHeader component', async () => {
  const { container } = render(<CToastHeader>Test</CToastHeader>)
  expect(container).toMatchSnapshot()
})

test('CToastHeader customize', async () => {
  const { container } = render(<CToastHeader className="bazinga">Test</CToastHeader>)
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('toast-header')
})
