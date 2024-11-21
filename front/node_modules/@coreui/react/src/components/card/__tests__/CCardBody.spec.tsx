import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CCardBody } from '../../../index'

test('loads and displays CCardBody component', async () => {
  const { container } = render(<CCardBody>Test</CCardBody>)
  expect(container).toMatchSnapshot()
})

test('CCardBody customize', async () => {
  const { container } = render(<CCardBody className="bazinga">Test</CCardBody>)
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('card-body')
})
