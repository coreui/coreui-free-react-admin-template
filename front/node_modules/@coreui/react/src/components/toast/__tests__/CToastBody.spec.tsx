import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CToastBody } from '../../../index'

test('loads and displays CToastBody component', async () => {
  const { container } = render(<CToastBody>Test</CToastBody>)
  expect(container).toMatchSnapshot()
})

test('CToastBody customize', async () => {
  const { container } = render(<CToastBody className="bazinga">Test</CToastBody>)
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('toast-body')
})
