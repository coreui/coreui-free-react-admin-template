import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CModalBody } from '../../../index'

test('loads and displays CModalBody component', async () => {
  const { container } = render(<CModalBody>Test</CModalBody>)
  expect(container).toMatchSnapshot()
})

test('CModalBody customize', async () => {
  const { container } = render(<CModalBody className="bazinga">Test</CModalBody>)
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('modal-body')
})
