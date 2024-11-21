import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CFormLabel } from '../../../index'

test('loads and displays CFormLabel component', async () => {
  const { container } = render(<CFormLabel>Test</CFormLabel>)
  expect(container).toMatchSnapshot()
})

test('CFormLabel customize className', async () => {
  const { container } = render(<CFormLabel className="bazinga">Test</CFormLabel>)
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('form-label')
  expect(container.firstChild).toHaveTextContent('Test')
})

test('CFormLabel customize htmlFor', async () => {
  const { container } = render(<CFormLabel htmlFor="bazinga">Test</CFormLabel>)
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveAttribute('for', 'bazinga')
  expect(container.firstChild).toHaveClass('form-label')
  expect(container.firstChild).toHaveTextContent('Test')
})
